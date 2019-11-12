import React, {Component} from "react";
import {ONSAccordionTable} from "../components/ONS_DesignSystem/ONSAccordionTable";
import {uploadHeaders} from "../utilities/Headers"
import {ONSStatus} from "../components/ONS_DesignSystem/ONSStatus";
import {getUploadStatusStyle, toUpperCaseFirstChar} from '../utilities/Common_Functions';
import {ONSProgressBar} from "../components/ONS_DesignSystem/ONSProgressBar";

interface Props {
    import: string
    hidden: boolean
    importOptionVisible: Function
    setPanel: Function
}

interface State {
    uploadStatusData: UploadStatusData[] | null
    uploadStatusCode: number
    uploadPercentage: number
    fileName: string
    websocketActive: boolean
    websocketID: number
}

interface UploadStatusData {
    fileName: string
    step: string
    date: string
    status: string
}

export class FileUploadProgress extends Component <Props, State> {
    ws = new WebSocket("ws://127.0.0.1:8000/ws");

    constructor(props: Props) {
        super(props);
        this.state = (
            {
                uploadStatusData: [{
                    fileName: "",
                    step: 'Import',
                    date: new Date().toDateString(),
                    status: ""
                }],
                uploadStatusCode: 0,
                uploadPercentage: 0,
                fileName: this.props.import,
                websocketActive: false,
                websocketID: 0
            })
    }

    componentDidUpdate(nextProps: Props) {
        if (nextProps.hidden) {
            return {websocketActive: false};
        } else {
            return {websocketActive: true};
        }
    }

    // --------------- WebSockets ---------------

    componentDidMount(): void {
        this.ws.onopen = (evt => this.handleWSOnOpen(evt));
        this.ws.onmessage = (evt => this.handleWSOnMessage(JSON.parse(evt.data)));
        this.ws.onclose = (evt => this.handleWSOnClose(evt));
        this.ws.onerror = (evt => this.handleWSOnError(evt));
    }

    componentWillUnmount(): void {
        this.ws.close(1000, 'componentWillUnmount');
        clearInterval(this.state.websocketID);
    }

    handleWSOnOpen = (evt: Event) => {
        console.log("WebSocket Open");
        console.log(evt);
        this.getFileUploadProgress();
    };

    handleWSOnClose = (evt: Event) => {
        console.log("WebSocket Closed");
        console.log(evt);
    };

    handleWSOnError = (evt: Event) => {
        console.log("WebSocket Error");
        console.log(evt);
    };

    handleWSOnMessage = (evt: any) => {
        console.log(evt);
        if (evt.status === 3) {
            if (evt.errorMessage === "fileName not found") {
                this.setState({
                    websocketActive: false
                });
                return;
            }
            this.props.setPanel(evt.errorMessage, 'error');
        }
        if (evt.status === 1) {
            this.props.importOptionVisible(false);
        }
        let percentage = Math.round(evt.percent * 10) / 10;
        this.setState({
            uploadStatusData: [{
                fileName: toUpperCaseFirstChar(evt.fileName),
                step: 'Import',
                date: new Date().toDateString(),
                status: (this.state.uploadStatusCode === 2 ? "Import Complete" : this.state.uploadStatusCode === 3 ? "Failed" : "Importing: " + percentage + "%")
            }],
            uploadPercentage: percentage,
            uploadStatusCode: evt.status,
            websocketActive: true
        })
    };

    getFileUploadProgress = () => {
        let id = setInterval(_ => {
            this.ws.send(JSON.stringify(
                {
                    "fileName": this.props.import,
                }
            ));
        }, 3000);
        this.setState({websocketID: Number(id)});
    };

    BatchUploadTableRow = (rowData: any) => {
        let row = rowData.row;
        return (
            <>
                <td className="table__cell ">
                    {row.fileName}
                </td>
                <td className="table__cell ">
                    {row.step}
                </td>
                <td className="table__cell ">
                    {row.date}
                </td>
                <td className="table__cell ">
                    <ONSStatus label={row.status} small={false}
                               status={getUploadStatusStyle(this.state.uploadStatusCode).colour}/>
                </td>
            </>
        )
    };

    render() {
        return (
            <div hidden={!this.state.websocketActive}>
                {/* <br></br> */}
                {/* <h3>Address Upload</h3> */}
                <div style={{width: "55%"}}>
                    <table>
                        <ONSAccordionTable Headers={uploadHeaders} data={this.state.uploadStatusData}
                                           Row={this.BatchUploadTableRow} expandedRowEnabled={false}
                                           noDataMessage={"No Data"}/>
                    </table>
                    <ONSProgressBar statusCode={this.state.uploadStatusCode} percentage={this.state.uploadPercentage}/>
                </div>
            </div>
        )
    }
}