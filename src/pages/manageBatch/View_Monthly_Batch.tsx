import React, {Component} from "react";
import {ONSPanel} from "../../components/ONS_DesignSystem/ONSPanel";
import {ONSButton} from "../../components/ONS_DesignSystem/ONSButton";
import {isDevEnv, monthNumberToString, toUpperCaseFirstChar} from "../../utilities/Common_Functions";
import {GenericNotFound} from "../GenericNotFound";
import DocumentTitle from "react-document-title";
import {SurveyAuditModal} from "../../components/SurveyAuditModal";
import {MonthlyBatchUploadTable} from "./MonthlyBatchUploadTable";
import {getBatchData} from "../../utilities/http";
import {ReferenceFileImportTable} from "./ReferenceFileImportTable";
import {AccordionDropDown} from "../../components/AccordionDropDown";
import {ONSStatus} from "../../components/ONS_DesignSystem/ONSStatus";
import {ONSMetadata} from "../../components/ONS_DesignSystem/ONSMetadata";
import {ONSBreadcrumbs} from "../../components/ONS_DesignSystem/ONSBreadcrumbs";

interface State {
    UploadsData: Data | null
    batchType: string
    year: string
    period: string
    batchData: [] | null
    metadata: Array<MetaDataListItem>
    batchFound: boolean,
    summaryRedirect: string
    summaryOpen: boolean
    surveyAuditWeek: string
    surveyAuditMonth: string
    importAudit: any
    surveyAuditUploadType: string
    surveyAuditStatus: number
    pathName: string
    breadcrumbList: any[]
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

export class View_Monthly_Batch extends Component <Props, State> {
    displayName = View_Monthly_Batch.name;

    constructor(props: any) {
        super(props);

        this.state = {
            UploadsData: null,
            batchType: "monthly",
            year: props.match.params.year,
            period: props.match.params.period,
            batchData: null,
            metadata: [],
            batchFound: true,
            summaryRedirect: (props.match.params.summary),
            summaryOpen: false,
            surveyAuditWeek: "",
            surveyAuditMonth: "",
            surveyAuditUploadType: "",
            surveyAuditStatus: 0,
            importAudit: null,
            pathName: "/manage-batch/monthly/" + props.match.params.year + "/" + props.match.params.period,
            breadcrumbList: [{name: "Home", link: ""}]
        };
    }

    componentDidMount(): void {
        this.batchData();
        let summaryRedirect = (this.props.match.params.summary);
        if (summaryRedirect !== undefined && summaryRedirect === "new") {
            window.history.pushState({}, document.title, this.state.pathName);
            this.state.breadcrumbList.push({name: "Create New Batch", link: "new-batch"});
        }

        if (summaryRedirect !== undefined && summaryRedirect.length > 0 && summaryRedirect !== "new") {
            this.openSummaryModalFromRedirect(summaryRedirect);
        }
        this.updateMetaDataList();
    }

    batchData = () => {
        getBatchData(this.state.batchType, this.state.year, this.state.period)
            .then(r => {
                if (r[0] === undefined) {
                    // Batch does not exist, load not found page
                    this.setState({batchFound: false});
                }
                this.setState({batchData: r});
                this.updateMetaDataList();
            })
            .catch(error => {
                (isDevEnv() && console.log(error));
                this.setState({batchFound: false});
            });
    };

    openSummaryModalFromRedirect = (summaryRedirect: string) => {
        let [type, week, month, year] = summaryRedirect.split("-");
        this.openSummaryModal({
            type: type.toUpperCase(),
            week: +week,
            month: +month,
            year: +year,
            status: 1
        });
    };

    openSummaryModal = (row: any) => {
        window.history.pushState({}, document.title, this.state.pathName);
        this.setState({
            summaryOpen: true,
            surveyAuditWeek: row.week,
            surveyAuditMonth: row.month,
            surveyAuditUploadType: row.type,
            surveyAuditStatus: row.status
        });
    };

    closeSummaryModal = () => this.setState({summaryOpen: false});


    formatMetaData() {
        return (
            [{
                L: "Year",
                R: this.state.year.toString()
            }, {
                L: "Period",
                R: monthNumberToString(Number(this.state.period)).toString()
            }, {
                L: "Status",
                R: <ONSStatus label={"Survey Imports Incomplete"} small={false} status={"info"}/>
            }]
        );
    }

    updateMetaDataList = () => {
        this.setState({metadata: this.formatMetaData()});
    };

    summaryModal = () => {
        if (this.state.summaryOpen)
            return (
                <SurveyAuditModal modalOpen={this.state.summaryOpen}
                                  week={this.state.surveyAuditWeek}
                                  month={this.state.surveyAuditMonth}
                                  year={this.state.year}
                                  surveyType={this.state.surveyAuditUploadType}
                                  status={this.state.surveyAuditStatus}
                                  closeSummaryModal={this.closeSummaryModal}
                                  reloadBatchData={this.batchData}/>
            );
    };

    accordionDropDownHeader = () => {
        return (
            <ONSStatus status={"success"} label={"All Survey files have been Imported"} small={false}/>
        );
    };

    render() {
        // TODO: Temporary way to check if imports are complete, should eventually be able to get this from batch status
        let importComplete = true;
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
                    <ONSBreadcrumbs List={this.state.breadcrumbList}
                                    Current={"Manage Batch " + monthNumberToString(+this.state.period) + " " + this.state.year}/>
                    {
                        this.state.batchFound ?
                            <>
                                <h3> Manage Monthly Batch</h3>
                                <ONSMetadata List={this.state.metadata}/>
                                <div style={{width: "35rem"}}>
                                    {
                                        importComplete ?
                                            <AccordionDropDown caption={"Survey Files"}
                                                               expandableHeader={this.accordionDropDownHeader}>
                                                <MonthlyBatchUploadTable batchData={this.state.batchData}
                                                                         openModal={this.openSummaryModal}
                                                                         batchType={this.state.batchType}
                                                                         year={this.state.year}
                                                                         period={this.state.period}
                                                                         caption={false}/>
                                            </AccordionDropDown>
                                            :
                                            <>
                                                <MonthlyBatchUploadTable batchData={this.state.batchData}
                                                                         openModal={this.openSummaryModal}
                                                                         batchType={this.state.batchType}
                                                                         year={this.state.year}
                                                                         period={this.state.period}
                                                                         caption={true}/>
                                                <ONSPanel label="Monthly Batch" status="info" spacious={false}>
                                                    <p>Every Survey File Must be Uploaded to Run Process</p>
                                                </ONSPanel>
                                                <br/>
                                            </>
                                    }
                                    {this.summaryModal()}
                                    <ReferenceFileImportTable/>
                                </div>
                                <ONSButton label="Run Monthly Process"
                                           small={false}
                                           primary={true}
                                           marginRight={10}
                                           disabled={!importComplete}/>
                                <ONSButton label="Run Interim Weighting"
                                           small={false}
                                           primary={false}
                                           disabled={!importComplete}/>
                                <br/>
                                <br/>
                            </>
                            :
                            <GenericNotFound label={toUpperCaseFirstChar(this.state.batchType) + " batch Not Found "}/>
                    }
                </div>
            </DocumentTitle>
        );
    }
}
