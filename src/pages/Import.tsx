import React, {ChangeEvent, Component} from "react";
import {ONSUpload} from "../components/ONS_DesignSystem/ONSUpload";
import {ONSButton} from "../components/ONS_DesignSystem/ONSButton";
import {postImportFile} from "../utilities/http";
import {ONSPanel} from "../components/ONS_DesignSystem/ONSPanel";
import {ONSSelect} from "../components/ONS_DesignSystem/ONSSelect";
import {FileUploadProgress} from "./FileUploadProgress";
import {toUpperCaseFirstChar} from "../utilities/Common_Functions";
import DocumentTitle from "react-document-title";

interface Props {
}


interface State {
    uploadFile: any
    uploading: boolean
    importName: string
    importHidden: boolean
    uploadProgressHidden: boolean
    fileType: string
    uploadLink: string
    //check to see if functionality is built and whether to send the request
    built: boolean
    fileName: string
    panel: Panel
}

interface Panel {
    label: string,
    visible: boolean
    status: string
}

export class Import extends Component <Props, State> {
    displayName = Import.name;

    constructor(props: Props) {
        super(props);
        this.state = {
            uploadFile: "",
            uploading: false,
            importName: "",
            importHidden: true,
            uploadProgressHidden: true,
            fileType: "",
            uploadLink: "",
            built: false,
            fileName: "string",
            panel: {
                label: '',
                visible: false,
                status: 'info'
            }
        };
        this.setPanel.bind(this);
        this.setFileUploading.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    upload = () => {
        console.log('Uploading File');
        this.hidePanel();
        this.setState({
            uploading: true,
        });
        // TODO: Send correct data for each file type
        if (this.state.built) {
            postImportFile(this.state.uploadFile, this.state.uploadLink, this.state.fileName)
                .then(response => {
                    console.log(response);
                    if (response.status === 'ERROR') {
                        console.log("window no change");
                        this.setPanel(response.errorMessage.toString(), 'error');
                        this.setState({importHidden: true, uploadProgressHidden: true})
                    } else {
                        if (response.status === "OK") {
                            this.setPanel(toUpperCaseFirstChar(this.state.importName) + ': File Uploaded Successfully', 'success');
                        }
                        console.log("window change")
                    }
                    this.setState({
                        uploading: false,
                    });
                })
                .catch(err => {
                    console.log(err);
                    this.setPanel(err.toString(), 'error');
                    this.setState({
                        uploading: false,
                        uploadProgressHidden: false
                    });
                });
        }
    };

    hidePanel = () => {
        this.setState({
            panel: {
                label: "",
                visible: false,
                status: "info"
            }
        });
    };

    setPanel = (message: string, status: string) => {
        this.setState({
            panel: {
                label: message,
                visible: true,
                status: status
            }
        });
    };

    handleFileChange = (selectorFiles: FileList | null) => {
        console.log(selectorFiles);
        this.setState({uploadFile: selectorFiles});
    };

    handleImportChange = (e: ChangeEvent<HTMLSelectElement>) => {
        let hidden = (e.target.value !== "address");
        this.setState({
            importName: e.target.value,
            importHidden: false,
            fileType: this.fileType(e.target.value),
            uploadProgressHidden: hidden,
        });
        this.hidePanel()
    };

    setFileUploading = (bool: boolean) => {
        this.setState({importHidden: !bool})
    };

    fileType = (file: string) => {
        let type = "";
        switch (file) {
            case "Geographical Classifications":
                type = '.csv';
                this.setState({built: true, fileName: "address", uploadLink: 'address'});
                break;
            case "Bulk Amendments":
                type = '';
                this.setState({});
                break;
            case "Design Weights":
                type = '';
                this.setState({});
                break;
            case "Population Estimates":
                type = '';
                this.setState({});
                break;
            case "Value Label":
                type = '.csv';
                this.setState({});
                break;
            case "Variable Definitions":
                type = '.csv';
                this.setState({
                    built: true,
                    fileName: "variable_definitions",
                    uploadLink: 'variable/definitions'
                });
                break;
        }
        return type
    };

    fileSelection = [
        //  {"label":"Bulk Amendments", "value":"Bulk Amendments"},
        //  {"label":"Design Weights", "value":"Design Weights"},
        {"label": "Geographical Classifications", "value": "Geographical Classifications"},
        // {"label": "Value Label", "value": "Value Label"},
        //  {"label":"Population Estimates", "value":"Population Estimates"},
        {"label": "Variable Definitions", "value": "Variable Definitions"}
    ];

    render() {
        return (
            <DocumentTitle title='LFS: Import'>
                <div className="container">
                    <form>
                        <ONSPanel status={this.state.panel.status} label={this.state.panel.label}
                                  hidden={!this.state.panel.visible}>
                            <p>{this.state.panel.label}</p>
                        </ONSPanel>
                        <ONSSelect label="Select Import" value="select value" options={this.fileSelection}
                                   onChange={this.handleImportChange}/>
                        <br/>
                        <div hidden={this.state.importHidden}>
                            <ONSUpload label={"Import " + toUpperCaseFirstChar(this.state.importName)}
                                       description={"Only " + this.state.fileType + " accepted"} fileName={"Upload 1"}
                                       fileID={"U1"}
                                       accept={this.state.fileType}
                                       onChange={(e) => this.handleFileChange(e.target.files)}/>
                            <ONSButton label={"Submit"}
                                       field={true}
                                       onClick={this.upload}
                                       primary={true}
                                       small={false}
                                       loading={this.state.uploading}/>
                        </div>
                    </form>
                    <FileUploadProgress importName={this.state.importName}
                                        fileName={this.state.fileName}
                                        hidden={this.state.uploadProgressHidden}
                                        importOptionVisible={this.setFileUploading}
                                        setPanel={this.setPanel}/>
                </div>
            </DocumentTitle>
        )
    }
}