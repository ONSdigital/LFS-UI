import React, {Component} from "react";
import {ONSPanel} from "../../components/ONS_DesignSystem/ONSPanel";
import {ONSButton} from "../../components/ONS_DesignSystem/ONSButton";
import {isDevEnv, monthNumberToString, toUpperCaseFirstChar} from "../../utilities/Common_Functions";
import {ONSMetadata} from "../../components/ONS_DesignSystem/ONSMetadata";
import {GenericNotFound} from "../GenericNotFound";
import DocumentTitle from "react-document-title";
import {SurveyAuditModal} from "../../components/SurveyAuditModal";
import {MonthlyBatchUploadTable} from "./MonthlyBatchUploadTable";
import {getBatchData} from "../../utilities/http";
import {ReferenceFileImportTable} from "./ReferenceFileImportTable";

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
}

interface MetaDataListItem {
    R: string
    L: string
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
            pathName: "/manage-batch/monthly/" + props.match.params.year + "/" + props.match.params.period
        };
    }

    componentDidMount(): void {
        this.batchData();
        let summaryRedirect = (this.props.match.params.summary);
        if (summaryRedirect !== undefined && summaryRedirect.length > 0) {
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
                L: "Batch Type",
                R: "Monthly"
            }, {
                L: "Year",
                R: this.state.year.toString()
            }, {
                L: "Period",
                R: (this.state.batchType === "monthly" ? monthNumberToString(Number(this.state.period)).toString() : this.state.period.toString())
            }, {
                L: "Status",
                R: ""
            }]
        );
    }

    updateMetaDataList = () => {
        this.setState({metadata: this.formatMetaData()});
    };

    summaryModal = () => {
        if (this.state.summaryOpen)
            return (
                <SurveyAuditModal modelOpen={this.state.summaryOpen}
                                  week={this.state.surveyAuditWeek}
                                  month={this.state.surveyAuditMonth}
                                  year={this.state.year}
                                  surveyType={this.state.surveyAuditUploadType}
                                  status={this.state.surveyAuditStatus}
                                  closeSummaryModal={this.closeSummaryModal}
                                  reloadBatchData={this.batchData}/>
            );
    };

    render() {
        return (
            <DocumentTitle
                title={"LFS Manage Batch " + monthNumberToString(+this.state.period) + " " + this.state.year}>
                <div className="container">
                    {
                        this.state.batchFound ?
                            <>
                                <ONSMetadata List={this.state.metadata}/>

                                <div className={"grid__col col-6@m "}>
                                    <MonthlyBatchUploadTable batchData={this.state.batchData}
                                                             openModel={this.openSummaryModal}
                                                             batchType={this.state.batchType}
                                                             year={this.state.year}
                                                             period={this.state.period}/>
                                    {this.summaryModal()}

                                </div>
                                <div className={"grid__col col-6@m "}>
                                    <ReferenceFileImportTable/>
                                </div>
                                <br/>
                                <div className={"grid__col col-6@m "}>
                                    <ONSPanel label="Monthly Batch" status="info" spacious={false}>
                                        <p>Every Survey File Must be Uploaded to Run Process</p>
                                    </ONSPanel>
                                    <br/>
                                    <ONSButton label="Run Monthly Process" small={false} primary={true}
                                               marginRight={10}/>
                                    <ONSButton label="Run Interim Weighting" small={false} primary={false}/>

                                </div>
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
