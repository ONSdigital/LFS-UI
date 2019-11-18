import React, {Component} from 'react';
import ReactModal from 'react-modal';
import {getSurveyAudit} from "../utilities/http";
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
import { is } from '@babel/types';

interface State {
    UploadsData: Data | null
    batchType: string,
    year: string,
    period: string,
    returnedData: [] | null,
    metadata: Array<MetaDataListItem> ,
    batchFound: boolean,
    summaryOpen: boolean
    metaData: any[]
    week: string
    month: string
    uploadHistory: any
    uploadType: string
    
}

interface MetaDataListItem {
    R: string,
    L: string
}

interface Data {
    Rows: Row,
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
            summaryOpen: (props.match.params.summary),
            week: "",
            month: "",
            uploadType: "",
            uploadHistory: [],
            metaData: []
        };
        this.getUploads();
        this.updateMetaDataList()
    }

    getUploadHistory = (week: string, month: string, type: string) => {
        getSurveyAudit(type, this.state.year, (type === 'gb' ? week : month))
            .then(r => {
                if (r !== undefined) {
                    
                    console.log(r)
                    // Batch does not exist, load not found page
                    this.setState({uploadHistory: r[0]})
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    goToUploadPage = (row: any) => {
        window.location.href = "/surveyUpload/" + row.type.toLowerCase() + "/" + row.week + "/" + row.month + "/" + row.year
    };

    openSummaryModal = (row: any) => {
        this.getUploadHistory(row.week, row.month, row.type.toLowerCase())
        

        this.setState({summaryOpen:true, week: row.week, month: row.month, uploadType: row.type});
    }

    
    closeSummaryModal = () => this.setState({summaryOpen:false});

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

    summaryMetaData() {
        console.log(this.state.uploadHistory)
        return (
            [{
                L: "num_var_file",
                R: this.state.uploadHistory.numVarFile,
            }
            ,{
                L: "num_var_loaded",
                R: this.state.uploadHistory.numVarLoaded,
            },{
                L: "num_ob_file",
                R: this.state.uploadHistory.numObFile,
            },{
                L: "num_ob_uploaded",
                R: this.state.uploadHistory.numObLoaded,
            },
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
                    <ONSButton label={"Summary"} primary={false} small={true} onClick={(() => this.openSummaryModal(row))}/>
                </td>
                <td className="table__cell ">
                    <ONSButton label={"Upload"} primary={false} small={true} onClick={(() => this.goToUploadPage(row))}/>
                </td>
            </>
        )
    };

    acceptLoad = () => {
        console.log("Load Accepted");
        this.closeSummaryModal()
    };
    
    rejectLoad = () => {
        console.log("Load Rejected");
        this.closeSummaryModal()
    };

    summaryTitle = () => {
        let type = "Month "
        let period = this.state.month
        if(this.state.uploadType === "GB") type = "Week "; period = this.state.week
        
        return "Summary " + type + period
    }
    
    summaryModal = () => {
        if(this.state.summaryOpen)
            return(<ReactModal
                    isOpen={this.state.summaryOpen}
                    contentLabel="Minimal Modal Example"
                    className='Modal'
                    shouldFocusAfterRender={true}
                    shouldReturnFocusAfterClose={true}
                    ariaHideApp={false}>
                        <h1>{this.summaryTitle()}</h1>
                    <div>
                        <ONSMetadata List={this.summaryMetaData()} LSpacing="5" RSpacing="6"/>
                        <ONSButton label="Export / View Report" primary={false} small={false}/>
                    </div>
                    <br/>
                    <div>
                        <ONSButton label="Accept" primary={true} small={false} onClick={this.acceptLoad}/>
                        <ONSButton label="Reject" primary={false} small={false} onClick={this.rejectLoad} marginRight={155}/>
                        <ONSButton label="Close" primary={false} small={false} onClick={this.closeSummaryModal}/>
                    </div>
                </ReactModal>
            )
    };



    render() {
        return (
            <DocumentTitle title={'LFS Manage Batch ' + monthNumberToString(+this.state.period) + " " + this.state.year}>
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
                                    {this.summaryModal()}
                                    <ONSAccordionTable Headers={BATCH_HEADERS} data={this.state.returnedData} Row={this.BatchUploadTableRow} expandedRowEnabled={false} noDataMessage={"No Data"}/>
                                    <ONSPanel label="This is the Dashboard" status="info" spacious={false}>
                                        <p>Every File Must be Uploaded to Run Process</p>
                                    </ONSPanel>
                                    <br/>
                                </div>
                                <div>
                                    <ONSButton label="Run Monthly Process" small={false} primary={true} marginRight={10}/>
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
