import React, {Component} from 'react';
import {ONSPanel} from '../components/ONS_DesignSystem/ONSPanel';
import {ONSButton} from '../components/ONS_DesignSystem/ONSButton';
import {
    getMonth,
    getStatusStyle,
    monthNumberToString,
    qList,
    toUpperCaseFirstChar
} from '../utilities/Common_Functions';
import {ONSMetadata} from '../components/ONS_DesignSystem/ONSMetadata';
import {getBatchData} from "../utilities/http";
import {GenericNotFound} from "./GenericNotFound";
import {ONSStatus} from "../components/ONS_DesignSystem/ONSStatus";
import {ONSAccordionTable} from "../components/ONS_DesignSystem/ONSAccordionTable";
import {BATCH_HEADERS} from "../utilities/Headers";
import DocumentTitle from "react-document-title";
import {SurveyAuditModal} from "../components/SurveyAuditModal";
import {Link} from "react-router-dom";

interface State {
    UploadsData: Data | null
    batchType: string
    year: string
    period: string
    returnedData: [] | null
    metadata: Array<MetaDataListItem>
    batchFound: boolean,
    summaryRedirect: string
    summaryOpen: boolean
    metaData: any[] | null
    week: string
    month: string
    importAudit: any
    uploadType: string

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

export class View_Monthly_Batch extends Component <{}, State> {
    displayName = View_Monthly_Batch.name;

    constructor(props: any) {
        super(props);

        this.state = {
            UploadsData: null,
            batchType: props.match.params.batchtype,
            year: props.match.params.year,
            period: props.match.params.period,
            returnedData: null,
            metadata: [],
            batchFound: true,
            summaryRedirect: (props.match.params.summary),
            summaryOpen: false,
            week: "",
            month: "",
            uploadType: "",
            importAudit: null,
            metaData: []
        };
    }

    componentDidMount(): void {
        if (this.state.summaryRedirect !== undefined && this.state.summaryRedirect.length > 0) {
            this.openSummaryModalFromRedirect();
        }
        this.getUploads();
        this.updateMetaDataList();
    }

    getUploads = () => {
        getBatchData(this.state.batchType, this.state.year, this.state.period)
            .then(r => {
                if (r[0] === undefined) {
                    // Batch does not exist, load not found page
                    this.setState({batchFound: false})
                }
                this.setState({returnedData: r});
                this.updateMetaDataList()
            })
            .catch(error => {
                console.log(error);
                this.setState({batchFound: false});
            });
    };

    openSummaryModalFromRedirect = () => {
        let list = this.state.summaryRedirect.split('-');
        this.openSummaryModal({
            type: list[0].toUpperCase(),
            week: +list[1],
            month: +list[2],
            year: +list[3],
        })
    };

    openSummaryModal = (row: any) => {
        this.setState({summaryOpen: true, week: row.week, month: row.month, uploadType: row.type});
    };

    closeSummaryModal = () => this.setState({summaryOpen: false});

    formatMetaData() {
        return (
            [{
                L: "Year",
                R: this.state.year.toString(),
            }, {
                L: "Period",
                R: (this.state.batchType === "monthly" ? monthNumberToString(Number(this.state.period)).toString() : this.state.period.toString()),
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

    BatchUploadTableRow = (rowData: any) => {
        let row = rowData.row;
        return (
            <>
                <td className="table__cell ">
                    {row.type}
                </td>
                <td className="table__cell ">
                    {row.type === "NI" ?
                        monthNumberToString(+row.month)
                        :
                        "Week " + row.week
                    }
                </td>
                <td className="table__cell ">
                    <ONSStatus label={getStatusStyle(+row.status).text} small={false}
                               status={getStatusStyle(+row.status).colour}/>
                </td>

                <td className="table__cell ">
                    <Link
                        to={"/surveyUpload/" + row.type.toLowerCase() + "/" + row.week + "/" + row.month + "/" + row.year}>
                        <ONSButton label={"Import"} primary={false} small={true}/>
                    </Link>
                </td>
                {
                    row.status === 0 ?
                        <td className="table__cell "/>
                        :
                        <td className="table__cell ">
                            <ONSButton label={"Summary"} primary={true} small={true}
                                       onClick={(() => this.openSummaryModal(row))}/>
                        </td>
                }
            </>
        )
    };

    summaryModal = () => {
        if (this.state.summaryOpen)
            return (
                <SurveyAuditModal modelOpen={this.state.summaryOpen}
                                  week={this.state.week}
                                  month={this.state.month}
                                  year={this.state.year}
                                  surveyType={this.state.uploadType}
                                  closeSummaryModal={this.closeSummaryModal}/>
            )
    };


    render() {
        return (
            <DocumentTitle
                title={'LFS Manage Batch ' + monthNumberToString(+this.state.period) + " " + this.state.year}>
                <div className="container">
                    {
                        this.state.batchFound ?
                            <>
                                <div>
                                    <header className="header header--internal">
                                        <p style={{fontWeight: "bold"}}> Manage Monthly Uploads</p>
                                    </header>
                                    <ONSMetadata List={this.state.metadata}/>
                                </div>
                                <div style={{width: "55%"}}>
                                    <ONSAccordionTable Headers={BATCH_HEADERS} data={this.state.returnedData}
                                                       Row={this.BatchUploadTableRow} expandedRowEnabled={false}
                                                       noDataMessage={"No Data"}/>
                                    {this.summaryModal()}
                                    <ONSPanel label="This is the Dashboard" status="info" spacious={false}>
                                        <p>Every File Must be Uploaded to Run Process</p>
                                    </ONSPanel>
                                    <br/>
                                </div>
                                <div>
                                    <ONSButton label="Run Monthly Process" small={false} primary={true}
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
                            <GenericNotFound label={toUpperCaseFirstChar(this.state.batchType) + " batch Not Found "}/>
                    }
                </div>
            </DocumentTitle>
        );
    }
}
