import React, {ChangeEvent, Component} from "react";
import {ONSUpload} from "../../components/ONS_DesignSystem/ONSUpload";
import {ONSButton} from "../../components/ONS_DesignSystem/ONSButton";
import {postImportFile} from "../../utilities/http";
import {ONSPanel} from "../../components/ONS_DesignSystem/ONSPanel";
import {FileUploadProgress} from "../FileUploadProgress";
import {isDevEnv, quarters, toUpperCaseFirstChar, years} from "../../utilities/Common_Functions";
import DocumentTitle from "react-document-title";
import {ONSDateInput} from "../../components/ONS_DesignSystem/ONSDateInput";
import {ReportExport} from "../../components/ReportExport";
import {ONSSelect} from "../../components/ONS_DesignSystem/ONSSelect";
import {BulkAmendmentsModel} from "./BulkAmendmentsModel";
import * as XLSX from "xlsx";

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
    importReport: importReport
    fileName: string
    panel: Panel
    year: string
    period: string
    inputError: boolean
    errorGone: boolean
    outputSpec: boolean
    linkUrl: string
    summaryModelOpen: boolean
}

interface Panel {
    label: string,
    visible: boolean
    status: string
}

interface importReport {
    hasImportReport: boolean
    reportFileType: string

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
            importReport: {
                hasImportReport: false,
                reportFileType: ""
            },
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
            linkUrl: "",
            summaryModelOpen: false
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
        if (!this.state.outputSpec || (this.state.period !== "" && this.state.year !== "")) {
            console.log("Uploading File");
            this.hidePanel();
            this.setState({
                uploading: true
            });

            if (!this.state.built) {
                this.setPanel(this.state.importName + ": Import Not Implemented Yet", "error");
                this.setState({
                    uploading: false
                });
                return;
            }

            let uploadLink = this.state.uploadLink;
            if (this.state.validFromDate !== null) {
                uploadLink = uploadLink + "/" + this.state.validFromDate.toISOString();
            }
            if (this.state.outputSpec) {
                uploadLink = "output/specification/" + uploadLink + "/variable/" + this.state.year + "/" + this.state.period.slice(1);

                postImportFile(this.state.uploadFile, uploadLink, this.state.fileName)
                    .then(response => {
                        (isDevEnv && console.log(response));

                        response.clone().arrayBuffer().then((array: any) => {
                            // Read array into Uint8Array
                            let data = new Uint8Array(array);
                            // Get workbook
                            let workbook = XLSX.read(data, {type: "array"});
                            // Get the first worksheet
                            let worksheet = workbook.Sheets[workbook.SheetNames[0]];

                            // Read cells in File
                            let fileName = worksheet["A2"].v;
                            let status = worksheet["B2"].v.toLowerCase();
                            let message = worksheet["C2"].v;

                            if (status === "error") {
                                this.setPanel(fileName + ": File Import Failed, " + message, "error");
                            } else {
                                this.setPanel(fileName + ": File Uploaded Successfully, " + message, "success");
                            }
                        });

                        this.setState({
                            uploading: false
                        });

                        //Create Download for File
                        response.blob().then((blob: any) => {
                            let url = window.URL.createObjectURL(blob);
                            this.setState({linkUrl: url, reportExportHidden: false});
                        }).catch((err: Error) => {
                            this.setPanel("File Import Failed, Error while creating download report: " + err, "error");
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
                return;
            }

            postImportFile(this.state.uploadFile, uploadLink, this.state.fileName)
                .then(response => {
                    (isDevEnv && console.log(response));
                    if (response.status === 400) {
                        this.setPanel("Error Occurred when uploading files: " + response.errorMessage.toString(), "error");
                        this.setState({importHidden: false, uploadProgressHidden: true});
                    } else {
                        if (response.status === 200) {
                            this.setPanel(toUpperCaseFirstChar(this.state.importName) + ": File Uploaded Successfully", "success");
                            if (response.filename === "design_weights") {
                                this.setPanel(toUpperCaseFirstChar(this.state.importName) + ": File Uploaded Successfully, " + response.message, "info");
                            }

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

        } else if (!this.state.errorGone) this.setState({inputError: true});
        else this.setState({inputError: false});
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
        if (this.state.importReport.hasImportReport) {
            this.setState({reportExportHidden: false});
        }
    };

    handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
        this.setState({year: e.target.value});
        this.errorGone("year");
    };

    handlePeriodChange = (e: ChangeEvent<HTMLSelectElement>) => {
        this.setState({period: e.target.value});
        this.errorGone("period");
    };

    errorGone = (value: string) => {
        if (value === "year" && this.state.period !== "") this.setState({inputError: false, errorGone: true});
        if (this.state.year !== "" && value === "period") this.setState({inputError: false, errorGone: true});
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
                    importReport: {
                        hasImportReport: false,
                        reportFileType: ""
                    }
                });
                break;
            case "Bulk Amendments":
                this.setState({
                    fileType: ".sav",
                    built: false,
                    fileName: "bulk_amendments",
                    uploadLink: "bulk/amendments",
                    validFromDateHidden: true,
                    importReport: {
                        hasImportReport: true,
                        reportFileType: ".csv"
                    }
                });
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
                    importReport: {
                        hasImportReport: false,
                        reportFileType: ""
                    }
                });
                break;
            case "Population Estimates":
                this.setState({
                    fileType: ".xlsx",
                    built: true,
                    fileName: "population",
                    uploadLink: "population",
                    validFromDateHidden: true,
                    importReport: {
                        hasImportReport: true,
                        reportFileType: ".xlsx"
                    }
                });
                break;
            case "Value Labels":
                this.setState({
                    fileType: ".csv",
                    built: true,
                    fileName: "value_labels",
                    uploadLink: "value/labels",
                    validFromDateHidden: false,
                    importReport: {
                        hasImportReport: false,
                        reportFileType: ""
                    }
                });
                break;
            case "Variable Definitions":
                this.setState({
                    fileType: ".csv",
                    built: true,
                    fileName: "variable_definitions",
                    uploadLink: "variable/definitions",
                    validFromDateHidden: false,
                    importReport: {
                        hasImportReport: false,
                        reportFileType: ""
                    }
                });
                break;
            case "APS Person Variable Specification":
                this.setState({
                    fileType: ".csv",
                    built: true,
                    fileName: "APS_Person",
                    uploadLink: "aps/person",
                    validFromDateHidden: true,
                    importReport: {
                        hasImportReport: true,
                        reportFileType: ""
                    },
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
                    importReport: {
                        hasImportReport: true,
                        reportFileType: ""
                    },
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
                    importReport: {
                        hasImportReport: true,
                        reportFileType: ""
                    },
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
                    importReport: {
                        hasImportReport: true,
                        reportFileType: ""
                    },
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
                    importReport: {
                        hasImportReport: true,
                        reportFileType: ""
                    },
                    quarterPeriodInputHidden: false,
                    outputSpec: true
                });
                break;
        }
    };

    openSummaryModal = (row: any) => {
        if (this.state.importName === "Bulk Amendments") {
            // window.history.pushState({}, document.title, this.state.pathName);
            this.setState({
                summaryModelOpen: true
            });
        }

    };

    closeSummaryModal = () => this.setState({summaryModelOpen: false});


    summaryModal = () => {
        if (this.state.summaryModelOpen)
            return (
                <BulkAmendmentsModel modelOpen={this.state.summaryModelOpen}
                                     importName={this.state.importName}
                                     fileName={this.state.fileName}
                                     uploadLink={this.state.uploadLink}
                                     reportFileType={this.state.importReport.reportFileType}
                                     closeSummaryModal={this.closeSummaryModal}
                                     reloadBatchData={this.closeSummaryModal}/>
            );
    };

    render() {
        return (
            <DocumentTitle title={"LFS Import " + this.state.importName}>
                <div className="container">
                    <h3>Import {this.state.importName}</h3>
                    <br/>
                    {
                        this.state.panel.visible &&
                        <>
                            <ONSPanel status={this.state.panel.status} label={this.state.panel.label}>
                                <p>{this.state.panel.label}</p>
                            </ONSPanel>
                            <br/>
                        </>
                    }
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
                        <br/>
                    </div>
                    }
                    <form>


                        <div hidden={this.state.importHidden}>
                            <div hidden={this.state.quarterPeriodInputHidden}>
                                <ONSSelect id="year" label="Year" value="year" options={years()}
                                           onChange={this.handleYearChange}/>
                                <ONSSelect id="quarter" label="Quarter" value="quarter" options={quarters}
                                           onChange={this.handlePeriodChange}/>
                                <br/>
                            </div>
                            {
                                !this.state.validFromDateHidden &&
                                <>
                                    <ONSDateInput label="Select Valid From Date" onChange={this.handleDateChange}
                                                  date={this.state.validFromDate}/>
                                    <br/>
                                    <br/>
                                </>
                            }
                            <ONSUpload label={"Import File"}
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
                            <ReportExport hidden={this.state.reportExportHidden}
                                          setPanel={this.setPanel}
                                          importName={this.state.uploadLink}
                                          reportFileType={this.state.importReport.reportFileType}
                                          url={this.state.linkUrl}/>
                        </div>
                    </form>
                    <br/>
                    <FileUploadProgress importName={this.state.importName}
                                        fileName={this.state.fileName}
                                        hidden={this.state.uploadProgressHidden}
                                        fileUploading={this.setFileUploading}
                                        setPanel={this.setPanel}
                                        redirectOnComplete={this.openSummaryModal}/>
                </div>
            </DocumentTitle>
        );
    }
}