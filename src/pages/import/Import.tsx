import React, {ChangeEvent, Component} from "react";
import {ONSUpload} from "../../components/ONS_DesignSystem/ONSUpload";
import {ONSButton} from "../../components/ONS_DesignSystem/ONSButton";
import {postImportFile} from "../../utilities/http";
import {ONSPanel} from "../../components/ONS_DesignSystem/ONSPanel";
import {FileUploadProgress} from "../FileUploadProgress";
import {isDevEnv, toUpperCaseFirstChar} from "../../utilities/Common_Functions";
import DocumentTitle from "react-document-title";
import {ONSDateInput} from "../../components/ONS_DesignSystem/ONSDateInput";
import {ReportExport} from "../../components/ReportExport";
import {ONSSelect} from "../../components/ONS_DesignSystem/ONSSelect";
import {quarters, years} from "../../utilities/Common_Functions";

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
    importSelectHidden: boolean
    quarterPeriodInputHidden: boolean
    fileType: string
    uploadLink: string
    //check to see if functionality is built and whether to send the request
    built: boolean
    hasImportReport: boolean
    fileName: string
    panel: Panel
    year: string
    period: string
    inputError: boolean
    errorGone: boolean
    outputSpec: boolean
    linkUrl: string
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
            importSelectHidden: false,
            quarterPeriodInputHidden: true,
            fileType: "",
            uploadLink: "",
            built: false,
            fileName: "",
            hasImportReport: false,
            panel: {
                label: "",
                visible: false,
                status: "info"
            },
            year: "",
            period: "",
            inputError: false,
            errorGone: false,
            outputSpec: false,
            linkUrl: ""
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
                    importSelectHidden: true
                    });
                }               
    }

    upload = () => {
        if(this.state.outputSpec === false || (this.state.period !== "" && this.state.year !== "")) {
            console.log("Uploading File");
            this.hidePanel();
            this.setState({
                uploading: true
            });
            if (this.state.built) {
                let uploadLink = this.state.uploadLink;
                if (this.state.validFromDate !== null) {
                    uploadLink = uploadLink + "/" + this.state.validFromDate.toISOString();
                } if (this.state.outputSpec) {
                    uploadLink = "output/specification/" + uploadLink + "/variable/" + this.state.year + "/" + this.state.period.slice(1)
                }
                postImportFile(this.state.uploadFile, uploadLink, this.state.fileName)
                    .then(response => {
                        (isDevEnv && console.log(response));
                        if (response.status === "ERROR") {
                            this.setPanel("Error Occurred when uploading files: " + response.errorMessage.toString(), "error");
                            this.setState({importHidden: false, uploadProgressHidden: true});
                        } else {
                            if (response.status === "OK") {
                                this.setPanel(toUpperCaseFirstChar(this.state.importName) + ": File Uploaded Successfully", "success");
                            } else if (response.status === "SUCCESS" && response.filename === "design_weights") {
                                this.setPanel(toUpperCaseFirstChar(this.state.importName) + ": File Uploaded Successfully, " + response.message, "info");
                            } else if (response.status === 200 && this.state.outputSpec) {
                                this.setPanel(toUpperCaseFirstChar(this.state.importName) + ": File Uploaded Successfully, ", "success");
                                
                                response.blob().then((blob: any) => {
                                    let url = window.URL.createObjectURL(blob);
                                    this.setState({linkUrl: url, reportExportHidden: false}) 
                                });
                            } 
                        }
                        this.setState({
                            uploading: false
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        this.setPanel("Error Occurred when uploading files: " + err.toString(), "error");
                        this.setState({
                            uploading: false,
                            uploadProgressHidden: false
                        });
                    });
            } else {
                this.setPanel(this.state.importName + ": Import Not Implemented Yet", "error");
                this.setState({
                    uploading: false
                });
            }
        }else if(this.state.errorGone === false) this.setState({inputError: true})
        else this.setState({inputError: false})
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

        handleImportChange = (e: ChangeEvent<HTMLSelectElement>) => {
            this.setState({
                importName: e.target.value,
                importHidden: false,
                uploadProgressHidden: false,
                validFromDate: null
            });
            this.fileType(e.target.value);
            this.hidePanel();
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
            this.setState({reportExportHidden: false});
        }
    };

    handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
        this.setState({year: e.target.value});
        this.errorGone("year")
    };

    handlePeriodChange = (e: ChangeEvent<HTMLSelectElement>) => {
        this.setState({period: e.target.value});
        this.errorGone("period")
    };

    errorGone = (value: string) => {
        if(value === "year" && this.state.period !== "") this.setState({inputError: false, errorGone: true})
        if(this.state.year !== "" && value === "period") this.setState({inputError: false, errorGone: true})
    };

    fileType = (file: string) => {
        switch (file) {
            case "Geographical Classifications":
                this.setState({
                    fileType: ".csv",
                    built: true,
                    fileName: "address",
                    uploadLink: "address",
                    validFromDateHidden: true,
                    hasImportReport: false
                });
                break;
            case "Bulk Amendments":
                this.setState({});
                break;
            case "Output Specification":
                this.setState({outputSpec: true});
                break;
            case "APS Design Weights":
                this.setState({
                    fileType: ".csv",
                    built: true,
                    fileName: "design_weights",
                    uploadLink: "design/weights",
                    validFromDateHidden: true,
                    hasImportReport: false
                });
                break;
            case "Population Estimates":
                this.setState({
                    fileType: ".xlsx",
                    built: true,
                    fileName: "population",
                    uploadLink: "population",
                    validFromDateHidden: true,
                    hasImportReport: true
                });
                break;
            case "Value Labels":
                this.setState({
                    fileType: ".csv",
                    built: true,
                    fileName: "value_labels",
                    uploadLink: "value/labels",
                    validFromDateHidden: false,
                    hasImportReport: false
                });
                break;
            case "Variable Definitions":
                this.setState({
                    fileType: ".csv",
                    built: true,
                    fileName: "variable_definitions",
                    uploadLink: "variable/definitions",
                    validFromDateHidden: false,
                    hasImportReport: false
                });
                break;
           case "APS Person Variable Specification":
                this.setState({
                    fileType: ".csv",
                    built: true,
                    fileName: "APS_Person",
                    uploadLink: "aps/person",
                    validFromDateHidden: true,
                    hasImportReport: true,
                    quarterPeriodInputHidden: false,
                    outputSpec: true
                });
                break;
            case "APS Household Variable Specification":
                this.setState({
                    fileType: ".csv",
                    built: true,
                    fileName: "APS_Household",
                    uploadLink: "aps/household",
                    validFromDateHidden: true,
                    hasImportReport: true,
                    quarterPeriodInputHidden: false,
                    outputSpec: true
                });
                break; 
            case "Eurostat Variable Specification":
                this.setState({
                    fileType: ".csv",
                    built: true,
                    fileName: "eurostat",
                    uploadLink: "eurostat",
                    validFromDateHidden: true,
                    hasImportReport: true,
                    quarterPeriodInputHidden: false,
                    outputSpec: true
                });
                break;
            case "LFS Person Variable Specification":
                this.setState({
                    fileType: ".csv",
                    built: true,
                    fileName: "LFS_Person",
                    uploadLink: "lfs/person",
                    validFromDateHidden: true,
                    hasImportReport: true,
                    quarterPeriodInputHidden: false,
                    outputSpec: true
                });
                break;
            case "LFS Household Variable Specification":
                this.setState({
                    fileType: ".csv",
                    built: true,
                    fileName: "LFS_Household",
                    uploadLink: "lfs/household",
                    validFromDateHidden: true,
                    hasImportReport: true,
                    quarterPeriodInputHidden: false,
                    outputSpec: true
                });
                break;   
        }
    };

    fileSelection = [
        //  {"label":"Bulk Amendments", "value":"Bulk Amendments"},
        {label: "APS Design Weights", value: "APS Design Weights"},
        {label: "Geographical Classifications", value: "Geographical Classifications"},
        {label: "Output Specification", value: "Output Specification"},
        {label: "Population Estimates", value: "Population Estimates"},
        {label: "Value Labels", value: "Value Labels"},
        {label: "Variable Definitions", value: "Variable Definitions"},

        {label: "APS Person Variable Specification", value: "Imported"},
        {label: "APS Household Variable Specification", value: "Imported"},    
        {label: "Eurostat Variable Specification", value: "Not Imported"},
        {label: "LFS Person Variable Specification", value: "Imported"},
        {label: "LFS Household Variable Specification", value: "File Older than One year"},
    ];

    render() {
        return (
            <DocumentTitle title={"LFS Import " + this.state.importName}>
                    <div className="container">
                        <ONSPanel status={this.state.panel.status} label={this.state.panel.label}
                                  hidden={!this.state.panel.visible}>
                            <p>{this.state.panel.label}</p>
                        </ONSPanel>
                        <br/>
                        {(this.state.inputError) &&
                            <div>
                                <div className="panel panel--error">
                                    <div className="panel__header">
                                        <h1 className="panel__title u-fs-r--b">This page has errors</h1>
                                    </div>
                                    <div className="panel__body">
                                        <ul className="list list--bare">
                                            {(this.state.year === "") &&
                                                <li className="list__item ">
                                                    <p className="list__link js-inpagelink">
                                                    Please select a Year.
                                                    </p>
                                                </li>  
                                            }
                                            {(this.state.period === "") &&
                                                <li className="list__item ">
                                                    <p className="list__link js-inpagelink">
                                                    Please select a Quarter. {this.state.period}
                                                    </p>
                                                </li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <br></br>
                            </div>
                        }
                    <form>
                        <div hidden={this.state.importSelectHidden}>
                            <ONSSelect label="Select Import" value="select value" options={this.fileSelection}
                                       onChange={this.handleImportChange}/>
                        </div>
                        <div hidden={this.state.quarterPeriodInputHidden}>
                            <ONSSelect id="year" label="Year" value="year" options={years()} onChange={this.handleYearChange} />
                            <ONSSelect id="quarter" label="Quarter" value="quarter" options={quarters} onChange={this.handlePeriodChange} />

                        </div>
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
                            <ONSButton label={"Return to Import Overview"}
                                       primary={false}
                                       field={true}
                                       onClick={() => window.history.back()}/>
                            <ReportExport hidden={this.state.reportExportHidden} setPanel={this.setPanel}
                                          importName={this.state.uploadLink} url={this.state.linkUrl}/>
                        </div>
                    </form>
                    <FileUploadProgress importName={this.state.importName}
                                        fileName={this.state.fileName}
                                        hidden={this.state.uploadProgressHidden}
                                        fileUploading={this.setFileUploading}
                                        setPanel={this.setPanel}/>
                </div>
            </DocumentTitle>
        );
    }
}