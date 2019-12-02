import React, {Component} from "react";
import {ONSUpload} from "../components/ONS_DesignSystem/ONSUpload";
import {ONSButton} from "../components/ONS_DesignSystem/ONSButton";
import {postImportFile} from "../utilities/http";
import {ONSPanel} from "../components/ONS_DesignSystem/ONSPanel";
import {FileUploadProgress} from "./FileUploadProgress";
import {isDevEnv, toUpperCaseFirstChar} from "../utilities/Common_Functions";
import DocumentTitle from "react-document-title";
import {ONSDateInput} from "../components/ONS_DesignSystem/ONSDateInput";
import {ReportExport} from "../components/ReportExport";

interface Props {
    match: any
}

interface State {
    uploadFile: any
    uploading: boolean
    validFromDate: Date | null
    importName: string
    importHidden: boolean
    uploadProgressHidden: boolean
    validFromDateHidden: boolean
    reportExportHidden: boolean
    fileType: string
    uploadLink: string
    //check to see if functionality is built and whether to send the request
    built: boolean
    hasImportReport: boolean
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

        let importName = (props.match.params.file !== undefined ? props.match.params.file : "");
        this.state = {
            uploadFile: "",
            uploading: false,
            validFromDate: null,
            importName: importName,
            importHidden: true,
            uploadProgressHidden: true,
            validFromDateHidden: true,
            reportExportHidden: true,
            fileType: "",
            uploadLink: "",
            built: false,
            fileName: "string",
            hasImportReport: false,
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

    componentDidMount(): void {
        console.log(this.state.importName);
        if (this.state.importName.length > 0) {
            this.fileType(this.state.importName);
            this.setState({
                importHidden: false,
                uploadProgressHidden: true,
            });
        }
    }

    upload = () => {
        console.log('Uploading File');
        this.hidePanel();
        this.setState({
            uploading: true,
        });
        // TODO: Send correct data for each file type
        if (this.state.built) {
            let uploadLink = this.state.uploadLink;
            if (this.state.validFromDate !== null) {
                uploadLink = uploadLink + "/" + this.state.validFromDate.toISOString()
            }
            postImportFile(this.state.uploadFile, uploadLink, this.state.fileName)
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
                    this.setPanel(err.toString(), 'error',);
                    this.setState({
                        uploading: false,
                        uploadProgressHidden: false
                    });
                });
        } else {
            this.setPanel(this.state.importName + ': Import Not Implemented Yet', 'error');
            this.setState({
                uploading: false,
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

    setFileUploading = (bool: boolean) => {
        this.setState({importHidden: bool});
        if (this.state.hasImportReport) {
            this.setState({reportExportHidden: false})
        }
    };

    fileType = (file: string) => {
        switch (file) {
            case "Geographical Classifications":
                this.setState({
                    fileType: '.csv',
                    built: true,
                    fileName: "address",
                    uploadLink: 'address',
                    validFromDateHidden: true,
                    hasImportReport: false
                });
                break;
            case "Bulk Amendments":
                this.setState({});
                break;
            case "Design Weights":
                this.setState({
                    fileType: '.csv',
                    built: true,
                    fileName: "design_weights",
                    uploadLink: 'design/weights',
                    validFromDateHidden: true,
                    hasImportReport: false
                });
                break;
            case "Population Estimates":
                this.setState({
                    fileType: '.xlsx',
                    built: true,
                    fileName: "population",
                    uploadLink: 'population',
                    validFromDateHidden: true,
                    hasImportReport: true
                });
                break;
            case "Value Labels":
                this.setState({
                    fileType: '.csv',
                    built: true,
                    fileName: "value_labels",
                    uploadLink: 'value/labels',
                    validFromDateHidden: false,
                    hasImportReport: false
                });
                break;
            case "Variable Definitions":
                this.setState({
                    fileType: '.csv',
                    built: true,
                    fileName: "variable_definitions",
                    uploadLink: 'variable/definitions',
                    validFromDateHidden: false,
                    hasImportReport: false
                });
                break;
        }
    };

    render() {
        return (
            <DocumentTitle title={'LFS Import ' + this.state.importName}>
                <div className="container">
                    <form>
                        <ONSPanel status={this.state.panel.status} label={this.state.panel.label}
                                  hidden={!this.state.panel.visible}>
                            <p>{this.state.panel.label}</p>
                        </ONSPanel>
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
                                       loading={this.state.uploading}/>
                            <ONSButton label={'Return to Manage Batch'}
                                       primary={false}
                                       field={true}
                                       onClick={() => window.history.back()}/>
                            <ReportExport hidden={this.state.reportExportHidden} setPanel={this.setPanel}
                                          importName={this.state.uploadLink}/>
                        </div>
                    </form>
                    <FileUploadProgress importName={this.state.importName}
                                        fileName={this.state.fileName}
                                        hidden={this.state.uploadProgressHidden}
                                        fileUploading={this.setFileUploading}
                                        setPanel={this.setPanel}/>
                </div>
            </
                DocumentTitle>
        )
    }
}