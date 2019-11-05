import React, {Component} from 'react';
import {ONSPanel} from '../components/ONSPanel';
import {ONSButton} from '../components/ONSButton';
import {getMonth, monthNumberToString, qList} from '../utilities/Common_Functions';
import {TableWithModal} from '../components/TableWithModal'
import {ONSMetadata} from '../components/ONSMetadata';
import {getBatchData} from "../utilities/http";
import {GenericNotFound} from "./GenericNotFound";

interface State {
    UploadsData: Data | null
    Batch_ID: string,
    batchType: string,
    year: string,
    period: string,
    returnedData: Data | null,
    metadata: Array<MetaDataListItem>,
    batchFound: boolean
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
            Batch_ID: "Dec2019",
            batchType: props.match.params.batchtype,
            year: props.match.params.year,
            period: props.match.params.period,
            returnedData: null,
            metadata: [],
            batchFound: true
        };
        this.getUploads();
        this.updateMetaDataList()
    }

    getUploads = () => {
        getBatchData(this.state.batchType, this.state.year, this.state.period)
            .then(r => {
                if (r[0] === undefined) {
                    // Batch does not exist, load not found page
                    this.setState({batchFound: false})
                }
                this.setState({returnedData: {Rows: r, Count: r.length}});
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
                                <br/>
                                <ONSMetadata List={this.state.metadata}/>
                            </div>
                            <br/>
                            <table>
                                <TableWithModal table="batch" returnedData={this.state.returnedData}/>
                                <ONSPanel label="This is the Dashboard" status="info" spacious={false}>
                                    <p>Every File Must be Uploaded to Run Process</p>
                                </ONSPanel>
                                <br/>
                            </table>
                            <div>
                                <ONSButton label="Run Monthly Process" small={false} primary={true} marginRight={10}/>
                                {(() => {
                                    if (qList.some(item => String(getMonth(this.state.Batch_ID)) === String(item))) {
                                        return (
                                            <ONSButton label="Run Inetrim Weighting" small={false} primary={false}/>
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
