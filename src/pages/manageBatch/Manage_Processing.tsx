import React, {Component} from "react";
import {ONSPanel} from "../../components/ONS_DesignSystem/ONSPanel";
import {ONSButton} from "../../components/ONS_DesignSystem/ONSButton";
import {isDevEnv, monthNumberToString, toUpperCaseFirstChar, fullPeriodPlease, currentDateAsString} from "../../utilities/Common_Functions";
import {GenericNotFound} from "../GenericNotFound";
import DocumentTitle from "react-document-title";
import {MonthlyProcessingUploadTable} from "./MonthlyProcessingUploadTable";
import {getBatchData, getReferenceData} from "../../utilities/http";
import {ReferenceFileImportTable} from "./ReferenceFileImportTable";
import {Link} from "react-router-dom";

interface State {
    processingType: string
    year: string
    period: string
    batchData: [] | null
    referenceData: [] | null
    batchFound: boolean,
    referenceFound: boolean
    summaryRedirect: string
    summaryOpen: boolean
    surveyAuditWeek: string
    surveyAuditMonth: string
    importAudit: any
    surveyAuditUploadType: string
    surveyAuditStatus: number
    pathName: string
    breadcrumbList: any[]
    uploadsAccepted: boolean
    referenceRejected: string[] | null
}

interface MetaDataListItem {
    R: any
    L: any
}

interface Data {
    Rows: Row
    Count: number
}

interface Row {
    [key: number]: Cell
}

interface Cell {
    [key: string]: object
}

interface Props {
    match: any
    location?: any
}

export class Manage_Processing extends Component <Props, State> {
    displayName = Manage_Processing.name;

    constructor(props: any) {
        super(props);

        this.state = {
            processingType: props.match.params.type,
            year: props.match.params.year,
            period: props.match.params.period,
            batchData: null,
            referenceData: null,
            batchFound: true,
            referenceFound: true,
            summaryRedirect: (props.match.params.summary),
            summaryOpen: false,
            surveyAuditWeek: "",
            surveyAuditMonth: "",
            surveyAuditUploadType: "",
            surveyAuditStatus: 0,
            importAudit: null,
            pathName: "/manage-batch/" + props.match.params.type + "/" + props.match.params.year + "/" + props.match.params.period,
            breadcrumbList: [{name: "Home", link: ""}],
            uploadsAccepted: false,
            referenceRejected: null
        };
    }

    componentDidMount(): void {
        this.batchData();
        this.referenceData();
    }

    referenceData () {
        // this function doesnt yet exist will make dw (will always error and hit the catch to be mocked)
        getReferenceData()
            .then(r => r.json())
            .then(r => {
                let mock = r.Rows
                let rejected = this.referencesRejected(mock)
                this.setState({referenceData: mock, referenceRejected: rejected, referenceFound: false});
            })
            .catch(error => {
                this.getMockReferenceData();
                (isDevEnv() && console.log(error));
            });
    }

    getMockReferenceData = () => {
        let url
        if(this.state.processingType === "monthly") url = '/jsons/MOCK_MONTHLY_REFERENCE_FILES.json' 
        else url = '/jsons/MOCK_QUARTERLY_REFERENCE_FILES.json'
        fetch(url)
            .then(response => response.json())
            .then(response => {
                let mock = response.Rows
                let rejected = this.referencesRejected(mock)
                this.setState({referenceData: mock, referenceRejected: rejected, referenceFound: false});
            })
    };

    referencesRejected = (mock: []) => {
        let rejected: string[] = []
        mock.forEach((element: any) => {
            let importName = String(element.name); 
            // we add a year to the import date to easily check if its over a year old 
            let importDate = this.stringDateToDatePlusOneYear(element.date);
            if(this.isDateBeforeToday(importDate)){
                rejected.push(importName)
            }
        });
        return rejected
    }

    isDateBeforeToday(date: Date) {
        return new Date(date.toDateString()) < new Date(new Date().toDateString());
    }
    
    dateParamsToString (date: number, month: number, year: number) {
        return `${String(date)}/${String(month)}/${String(year)} `
    }

    stringDateToDatePlusOneYear (fullDate: string) {
        let date = Number(fullDate.substring(0,2))
        let month = Number(fullDate.substring(3,5))
        let year = Number(fullDate.substring(6,10))
        return new Date(year + 1, month, date)
    }

    batchData = () => {
        getBatchData(this.state.processingType, this.state.year, this.state.period)
            .then(r => {
                if (r[0] === undefined) {
                    // Batch does not exist, load not found page
                    this.setState({batchFound: false});
                }
                var uploadsAccepted = true
                r.forEach((element: any) => {
                    // currently this status is a not set and will be the upload accepted status
                    if(element.status !== 3) uploadsAccepted = false
                });
                this.setState({batchData: r, uploadsAccepted: uploadsAccepted});
            })
            .catch(error => {
                (isDevEnv() && console.log(error));
                this.setState({batchFound: false});
            });
    };

    referenceWarnings (warnings: string[]) {
        let x: JSX.Element[] = []
        warnings.forEach((element: any) => {
            x.push(<p>{element} file is older than one year. You may want to <Link to ={"/import/" + {element}}>re-import</Link> a new file.</p>)
        });

        return x
    }
 
    render() {
        // TODO: Temporary way to check if imports are complete, should eventually be able to get this from batch status
        let importComplete = true;
        let fullPeriod = fullPeriodPlease(this.state.period, this.state.year)
        if (this.state.batchFound) {
            if (this.state.batchData !== null) {
                this.state.batchData.forEach(row => {
                    // @ts-ignore
                    if (row.status !== 4) {
                        importComplete = false;
                    }
                });
            }
        }

        return (
            <DocumentTitle
                title={"LFS Manage Batch " + monthNumberToString(+this.state.period) + " " + this.state.year}>
                <div className="container">
                    {
                        this.state.batchFound ?
                            <>
                                <br/>
                                <Link to={"/"}>Previous</Link>
                                <br/>
                                <br/>
                                <h1>
                                    Processing: <mark>{fullPeriod}</mark>
                                </h1>
                                <br/>
                                {
                                    !this.state.uploadsAccepted && 
                                        <ONSPanel>
                                            <p>Every survey file must be uploaded with status "Upload Accepted" to run processing.</p>
                                        </ONSPanel>
                                }
                                <br/>
                                <h1>Survey Files:</h1>
                                <MonthlyProcessingUploadTable batchData={this.state.batchData}
                                                            batchType={this.state.processingType}
                                                            year={this.state.year}
                                                            period={this.state.period}/>
                                    {/* {this.summaryModal()} */}
                                <h1>Reference Files:</h1>
                                {
                                    !this.state.referenceFound &&
                                        <ONSPanel status="info">Reference data has been mocked :)</ONSPanel>

                                }
                                {
                                    this.state.referenceRejected &&
                                        <ONSPanel status="error">{this.referenceWarnings(this.state.referenceRejected)}</ONSPanel>

                                }
                                
                                <ReferenceFileImportTable data={this.state.referenceData}/>
                                <ONSButton label="Run Processing Steps"
                                           small={false}
                                           primary={true}
                                           marginRight={10}
                                           disabled={!importComplete}/>
                                <br/>
                                <br/>
                            </>
                            :
                            <GenericNotFound label={toUpperCaseFirstChar(this.state.processingType) + " Processing for " + monthNumberToString(+this.state.period) + " " + this.state.year + ", Not Found "}/>
                    }
                </div>
            </DocumentTitle>
        );
    }
}
