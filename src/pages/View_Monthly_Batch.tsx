import React, {Component} from 'react';
import {ONSPanel} from '../components/ONSPanel';
import {ONSButton} from '../components/ONSButton';
import {getMonth, getStatusStyle, monthNumberToString, qList} from '../utilities/Common_Functions';
import {ONSMetadata} from '../components/ONSMetadata';
import {getBatchData} from "../utilities/http";
import {GenericNotFound} from "./GenericNotFound";
import {ONSStatus} from "../components/ONSStatus";
import {ONSAccordionTable} from "../components/ONSAccordionTable";
import {batchHeaders} from "../utilities/Headers";

interface State {
    UploadsData: Data | null
    batchType: string,
    year: string,
    period: string,
    returnedData: [] | null,
    metadata: Array<MetaDataListItem>,
    batchFound: boolean,
    summaryOpen: boolean
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
            summaryOpen: (props.match.params.summary)
        };
        this.getUploads();
        this.updateMetaDataList()
    }

    goToUploadPage = (row: any) => {
        window.location.href = "/surveyUpload/" + row.type.toLowerCase() + "/" + row.week + "/" + row.month + "/" + row.year
    };

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
                L: "Batch_ID",
                R: "This is no longer a thing ",
            }, {
                L: "Year",
                R: this.state.year.toString(),
            }, {
                L: "Period",
                R: (this.state.batchType === "monthly" ? monthNumberToString(Number(this.state.period)).toString() : this.state.period.toString()),
            }, {
                L: "Status",
                R: "",
            }, {
                L: "Description",
                R: "A Batch",
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
                    <ONSButton label={"Summary"} primary={false} small={true}/>
                </td>
                <td className="table__cell ">
                    <ONSButton label={"Upload"} primary={false} small={true} onClick={(() => this.goToUploadPage(row))}/>
                </td>
            </>
        )
    };

    render() {
        return (
            <div className="container">
                {
                    this.state.batchFound ?
                        <>
                            <div>
                                <header className="header header--internal">
                                    <text style={{fontWeight: "bold"}}> Manage Monthly Uploads</text>
                                </header>
                                <ONSMetadata List={this.state.metadata}/>
                            </div>
                            <div style={{width: "55%"}}>
                                <ONSAccordionTable Headers={batchHeaders} data={this.state.returnedData} Row={this.BatchUploadTableRow} expandedRowEnabled={false} noDataMessage={"No Data"}/>
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
                        <GenericNotFound label={this.state.batchType + " batch Not Found "}/>
                }
            </div>
        );
    }
}
