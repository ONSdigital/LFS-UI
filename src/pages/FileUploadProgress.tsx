import React, {Component} from "react";
import {ONSAccordionTable} from "../components/ONS_DesignSystem/ONSAccordionTable";
import {UPLOAD_HEADERS} from "../utilities/Headers";
import {ONSStatus} from "../components/ONS_DesignSystem/ONSStatus";
import {getFileImportStatusStyle, isDevEnv, toUpperCaseFirstChar} from "../utilities/Common_Functions";
import {ONSProgressBar} from "../components/ONS_DesignSystem/ONSProgressBar";

interface Props {
    importName: string
    fileName: string
    hidden: boolean
    fileUploading: Function
    setPanel: Function
    redirectOnComplete?: any
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
                    step: "Import",
                    status: ""
                }],
                uploadStatusCode: 0,
                uploadPercentage: 0,
                fileName: this.props.fileName,
                websocketActive: false,
                websocketID: 0
            });
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
        this.ws.onmessage = (evt => {
            console.log(evt)

            this.handleWSOnMessage(JSON.parse(evt.data))
        });
        this.ws.onclose = (evt => this.handleWSOnClose(evt));
        this.ws.onerror = (evt => this.handleWSOnError(evt));
    }

    componentWillUnmount(): void {
        this.ws.close(1000, "Upload Component Unmount");
        clearInterval(this.state.websocketID);
    }

    handleWSOnOpen = (evt: Event) => {
        console.log("WebSocket Open");
        (isDevEnv && console.log(evt));
        this.getFileUploadProgress();
    };

    handleWSOnClose = (evt: Event) => {
        console.log("WebSocket Closed");
        (isDevEnv && console.log(evt));
        clearInterval(this.state.websocketID);
    };

    handleWSOnError = (evt: Event) => {
        console.log("WebSocket Error");
        (isDevEnv && console.log(evt));
        clearInterval(this.state.websocketID);
    };

    handleWSOnMessage = (evt: any) => {
        (isDevEnv && console.log(evt));
        if (evt.status === 3 || evt.errorMessage.length > 0) {
            if (evt.errorMessage === "fileName not found") {
                this.setState({
                    websocketActive: false
                });
                return;
            }
            this.props.setPanel(evt.errorMessage, "error", true);
        }
        if (evt.status === 1) {
            this.props.setPanel("", "", false);
            this.props.fileUploading(true);
        }
        let percentage = Math.round(evt.percent * 10) / 10;
        if (evt.status === 2 && evt.errorMessage.length === 0) {
            this.props.setPanel(toUpperCaseFirstChar(this.props.importName) + " : File Imported Successfully", "success", true);
            this.props.fileUploading(false);
            if (this.props.redirectOnComplete !== undefined) {
                this.props.redirectOnComplete(true);
            }
        }
        this.setState({
            uploadStatusData: [{
                fileName: toUpperCaseFirstChar(this.props.importName),
                step: "Import",
                status: (evt.status === 2 ? "Import Complete" : evt.status === 3 ? "Failed" : "Importing: " + percentage + "%")
            }],
            uploadPercentage: percentage,
            uploadStatusCode: evt.status,
            websocketActive: true
        });
    };

    getFileUploadProgress = () => {
        // Send Initial Request to WS to get upload status immediately
        this.ws.send(JSON.stringify(
            {
                "fileName": this.props.fileName
            }
        ));
        // Set interval to get upload status every 3 seconds
        let id = setInterval(_ => {
            this.ws.send(JSON.stringify(
                {
                    "fileName": this.props.fileName
                }
            ));
        }, 3000);
        this.setState({websocketID: Number(id)});
    };

    FileImportTableRow = (rowData: any) => {
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
                    {
                        row.status.includes("Importing") ?
                            <>
                                <img
                                    className={"loadingIcon-svg "}
                                    src={"/img/icons--loader.svg"}
                                    alt="Loading Icon"/>
                                {row.status}
                            </>
                            :
                            <ONSStatus label={row.status}
                                       small={false}
                                       status={getFileImportStatusStyle(this.state.uploadStatusCode).colour}/>

                    }
                </td>
            </>
        );
    };

    render() {
        return (
            <div hidden={!this.state.websocketActive}>
                <h4>Import Progress</h4>
                <div style={{width: "60%"}}>
                    <ONSAccordionTable Headers={UPLOAD_HEADERS}
                                       data={this.state.uploadStatusData}
                                       Row={this.FileImportTableRow}
                                       expandedRowEnabled={false}
                                       noDataMessage={"No Data"}/>
                    <ONSProgressBar statusCode={this.state.uploadStatusCode} percentage={this.state.uploadPercentage}/>
                </div>
            </div>
        );
    }
}