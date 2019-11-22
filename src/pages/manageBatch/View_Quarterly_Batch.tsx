import React, {Component} from 'react';
import {ONSPanel} from '../../components/ONS_DesignSystem/ONSPanel';
import {ONSButton} from '../../components/ONS_DesignSystem/ONSButton';
import {getMonth, qList,} from '../../utilities/Common_Functions';
import {ONSMetadata} from '../../components/ONS_DesignSystem/ONSMetadata';
import {GenericNotFound} from "../GenericNotFound";
import DocumentTitle from "react-document-title";
import {SurveyAuditModal} from "../../components/SurveyAuditModal";
import {QuarterlyBatchUploadTable} from "./QuarterlyBatchUploadTable";

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
}

export class View_Quarterly_Batch extends Component <Props, State> {
    displayName = View_Quarterly_Batch.name;

    constructor(props: any) {
        super(props);

        this.state = {
            UploadsData: null,
            batchType: 'quarterly',
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
            importAudit: null,
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
        // getBatchData(this.state.batchType, this.state.year, this.state.period)
        //     .then(r => {
        //         if (r[0] === undefined) {
        //             // Batch does not exist, load not found page
        //             this.setState({batchFound: false})
        //         }
        //         this.setState({batchData: r});
        //         this.updateMetaDataList()
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({batchFound: false});
        //     });
    };

    openSummaryModalFromRedirect = (summaryRedirect: string) => {
        let [type, week, month, year] = summaryRedirect.split('-');
        this.openSummaryModal({
            type: type.toUpperCase(),
            week: +week,
            month: +month,
            year: +year,
        })
    };

    openSummaryModal = (row: any) => {
        this.setState({summaryOpen: true, surveyAuditWeek: row.week, surveyAuditMonth: row.month, surveyAuditUploadType: row.type});
    };

    closeSummaryModal = () => this.setState({summaryOpen: false});

    formatMetaData() {
        return (
            [{
                L: "Batch Type",
                R: 'Quarterly',
            }, {
                L: "Year",
                R: this.state.year.toString(),
            }, {
                L: "Period",
                R: this.state.period.toString(),
            }, {
                L: "Status",
                R: "",
            }
            ]
        )
    }

    updateMetaDataList = () => {
        this.setState({metadata: this.formatMetaData()})
    };

    summaryModal = () => {
        if (this.state.summaryOpen)
            return (
                <SurveyAuditModal modelOpen={this.state.summaryOpen}
                                  week={this.state.surveyAuditWeek}
                                  month={this.state.surveyAuditMonth}
                                  year={this.state.year}
                                  surveyType={this.state.surveyAuditUploadType}
                                  closeSummaryModal={this.closeSummaryModal}/>
            )
    };

    render() {
        return (
            <DocumentTitle
                title={'LFS Manage Batch ' + this.state.period + " " + this.state.year}>
                <div className="container">
                    {
                        this.state.batchFound ?
                            <>
                                <ONSMetadata List={this.state.metadata}/>
                                <div style={{width: "55%"}}>
                                    <QuarterlyBatchUploadTable batchData={this.state.batchData}
                                                               openModel={this.openSummaryModal}
                                                               batchType={this.state.batchType} year={this.state.year}
                                                               period={this.state.period}/>
                                    {this.summaryModal()}
                                    <ONSPanel label="Quarterly Batch" status="info" spacious={false}>
                                        <p>Design Weights Must be Imported to Run Process</p>
                                    </ONSPanel>
                                    <br/>
                                </div>
                                <div>
                                    <ONSButton label="Run Quarterly Process" small={false} primary={true}
                                               marginRight={10}/>
                                    {(() => {
                                        if (qList.some(item => String(getMonth(this.state.period)) === String(item))) {
                                            return (
                                                <ONSButton label="Run Interim Weighting" small={false} primary={false}/>
                                            )
                                        }
                                    })()}
                                </div>
                            </>
                            :
                            <GenericNotFound label={"Quarterly batch Not Found "}/>
                    }
                </div>
            </DocumentTitle>
        );
    }
}