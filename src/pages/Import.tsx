import React, {ChangeEvent, Component} from "react";
import {ONSUpload} from "../components/ONS_DesignSystem/ONSUpload";
import {ONSButton} from "../components/ONS_DesignSystem/ONSButton";
import {postImportFile} from "../utilities/http";
import {ONSPanel} from "../components/ONS_DesignSystem/ONSPanel";
import {ONSSelect} from "../components/ONS_DesignSystem/ONSSelect";
import {FileUploadProgress} from "./FileUploadProgress";
import {isDevEnv, toUpperCaseFirstChar} from "../utilities/Common_Functions";
import DocumentTitle from "react-document-title";
import {ONSDateInput} from "../components/ONS_DesignSystem/ONSDateInput";

interface Props {
}

interface State {
    uploadFile: any
    uploading: boolean
    validFromDate: Date | null
    importName: string
    importHidden: boolean
    uploadProgressHidden: boolean
    validFromDateHidden: boolean
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
            validFromDate: null,
            importName: "",
            importHidden: true,
            uploadProgressHidden: true,
            validFromDateHidden: true,
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
                    (isDevEnv && console.log(response));
                    if (response.status === 'ERROR') {
                        this.setPanel(response.errorMessage.toString(), 'error');
                        this.setState({importHidden: true, uploadProgressHidden: true})
                    } else {
                        if (response.status === "OK") {
                            this.setPanel(toUpperCaseFirstChar(this.state.importName) + ': File Uploaded Successfully', 'success');
                        } else if (response.status === "INFO" && response.filename === "design_weights") {
                            this.setPanel(toUpperCaseFirstChar(this.state.importName) + ": File Uploaded Successfully, " + response.message, 'info');
                        }
                    }
                    this.setState({
                        uploading: false,
                    });
                })
                .catch(err => {
                    console.log(err);
                    this.setPanel(err.toString(), 'error', );
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

    setPanel = (message: string, status: string, visible: boolean = true) => {
        this.setState({
            panel: {
                label: message,
                visible: visible,
                status: status
            }
        });
    };

    handleFileChange = (selectorFiles: FileList | null) => {
        console.log(selectorFiles);
        this.setState({uploadFile: selectorFiles});
    };

    handleDateChange = (date: Date) => {
        this.setState({validFromDate: date});
    };

    handleImportChange = (e: ChangeEvent<HTMLSelectElement>) => {
        let hidden = (e.target.value !== "address");
        this.setState({
            importName: e.target.value,
            importHidden: false,
            fileType: this.fileType(e.target.value),
            uploadProgressHidden: hidden,
            validFromDate: null
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
                this.setState({
                    built: true,
                    fileName: "address",
                    uploadLink: 'address',
                    validFromDateHidden: true
                });
                break;
            case "Bulk Amendments":
                type = '';
                this.setState({});
                break;
            case "Design Weights":
                type = '.csv';
                this.setState({
                    built: true,
                    fileName: "design_weights",
                    uploadLink: 'design/weights',
                    validFromDateHidden: true
                });
                break;
            case "Population Estimates":
                type = '.xlsx';
                this.setState({
                    built: true,
                    fileName: "population",
                    uploadLink: 'population',
                    validFromDateHidden: true
                });
                break;
            case "Value Labels GB":
                type = '.csv';
                this.setState({
                    built: true,
                    fileName: "value_labels",
                    uploadLink: 'value/labels/gb',
                    validFromDateHidden: false
                });
                break;
            case "Value Labels NI":
                type = '.csv';
                this.setState({
                    built: true,
                    fileName: "value_labels",
                    uploadLink: 'value/labels/ni',
                    validFromDateHidden: false
                });
                break;
            case "Variable Definitions":
                type = '.csv';
                this.setState({
                    built: true,
                    fileName: "variable_definitions",
                    uploadLink: 'variable/definitions',
                    validFromDateHidden: false
                });
                break;
        }
        return type
    };

    fileSelection = [
        //  {"label":"Bulk Amendments", "value":"Bulk Amendments"},
         {"label":"APS Design Weights", "value":"Design Weights"},
        {"label": "Geographical Classifications", "value": "Geographical Classifications"},
        {"label": "Value Labels GB", "value": "Value Labels GB"},
        {"label": "Value Labels NI", "value": "Value Labels NI"},
        {"label": "Population Estimates", "value": "Population Estimates"},
        {"label": "Variable Definitions", "value": "Variable Definitions"}
    ];

    render() {
        return (
            <DocumentTitle title='LFS Import'>
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
                            <div hidden={this.state.validFromDateHidden}>
                                <ONSDateInput label="Select Valid From Date" onChange={this.handleDateChange}
                                              date={this.state.validFromDate}/>
                                <br/><br/>
                            </div>
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