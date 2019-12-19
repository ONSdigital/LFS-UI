import React, {Component} from "react";
import {ONSUpload} from "../components/ONS_DesignSystem/ONSUpload";
import {ONSButton} from "../components/ONS_DesignSystem/ONSButton";
import {getSurveyAudit, postSurveyFile} from "../utilities/http";
import {ONSPanel} from "../components/ONS_DesignSystem/ONSPanel";
import {ONSMetadata} from "../components/ONS_DesignSystem/ONSMetadata";
import {getStatusStyle, monthNumberToString} from "../utilities/Common_Functions";
import {ONSAccordionTable} from "../components/ONS_DesignSystem/ONSAccordionTable";
import {ONSStatus} from "../components/ONS_DesignSystem/ONSStatus";
import {SURVEY_UPLOAD_HISTORY} from "../utilities/Headers";
import DocumentTitle from "react-document-title";
import {FileUploadProgress} from "./FileUploadProgress";
import {Link} from "react-router-dom";
import dateFormatter from "dayjs";
import {ONSBreadcrumbs} from "../components/ONS_DesignSystem/ONSBreadcrumbs";

interface Props {
    period: string,
    year: string,
    surveyType: string
    match: any
}

interface Panel {
    label: string,
    visible: boolean
    status: string
}

interface State {
    fileOne: any,
    panel: Panel
    uploading: boolean,
    importStarted: boolean
    surveyType: string,
    year: string
    week: string
    month: string
    period: string
    uploadHistory: []
    importHidden: boolean
    importFileName: string
    metaData: any[]
}

export class SurveyFileUpload extends Component <Props, State> {
    displayName = SurveyFileUpload.name;

    constructor(props: Props) {
        super(props);
        let period = (props.match.params.survey === "gb" ? "Week " + props.match.params.week.toString() : monthNumberToString(Number(props.match.params.month)).toString());
        this.state = {
            fileOne: "",
            uploading: false,
            importStarted: false,
            surveyType: (props.match.params.survey).toUpperCase(),
            year: props.match.params.year,
            week: props.match.params.week,
            month: props.match.params.month,
            period: period,
            panel: {
                label: '',
                visible: false,
                status: ''
            },
            uploadHistory: [],
            importHidden: false,
            importFileName: props.match.params.survey + (props.match.params.survey === 'gb' ? props.match.params.week : props.match.params.month) + props.match.params.year,
            metaData:
                [
                    {
                        L: "Survey",
                        R: props.match.params.survey.toUpperCase(),
                    },
                    {
                        L: "Year",
                        R: props.match.params.year.toString(),
                    },
                    {
                        L: "Period",
                        R: period,
                    }
                ]
        };

        this.handleFileChange = this.handleFileChange.bind(this);
    }

    componentDidMount(): void {
        this.getUploadHistory()
    }

    getUploadHistory = () => {
        getSurveyAudit(this.state.surveyType, this.state.year, (this.state.surveyType === 'GB' ? this.state.week : this.state.month))
            .then(r => {
                if (r !== undefined) {
                    // Batch does not exist, load not found page
                    this.setState({uploadHistory: r});
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    uploadFile = () => {
        console.log('Uploading File');
        this.setState({
            uploading: true,
            importStarted: true,
            panel: {
                label: '',
                visible: false,
                status: ''
            }
        });

        if (this.state.fileOne.length === 0) {
            this.setState({
                uploading: false,
                panel: {
                    label: 'No File Selected',
                    visible: true,
                    status: 'info'
                }
            });
            return
        }

        postSurveyFile(this.state.fileOne, this.state.importFileName, 'survey', this.state.surveyType.toLowerCase(), (this.state.surveyType === "GB" ? this.state.week : this.state.month), this.state.year)
            .then(response => {
                console.log(response);
                if (response.status === 'ERROR') {
                    this.setPanel("Error Occurred while Uploading File: " + response.errorMessage.toString(), 'error', true);
                } else {
                    this.setPanel(this.state.surveyType.toUpperCase() + " Survey Uploaded, Starting Import", 'success', true);
                }
                this.setState({
                    uploading: false,
                });
            })
            .catch(err => {
                console.log(err);
                if (err.toString() === "SyntaxError: Unexpected token P in JSON at position 0") {
                    this.setPanel("Error Occurred while Uploading File: Unable to Connect to Server", 'error', true);
                } else {
                    this.setPanel("Error Occurred while Uploading File: " + err.toString(), 'error', true);
                }
                this.setState({
                    uploading: false,
                });
            });
    };

    returnToManageBatch = (notImported: boolean) => {
        let redirectURL = '';
        if (!notImported) {
            redirectURL = "/" + this.state.surveyType + '-' + this.state.week + '-' + this.state.month + '-' + this.state.year;
            if (!this.state.importStarted) {
                return
            }
        }
        window.location.href = "/manage-batch/monthly/" + this.state.year + "/" + this.state.month + redirectURL
    };

    setPanel = (message: string, status: string, visible: boolean) => {
        this.setState({
            panel: {
                label: message,
                visible: visible,
                status: status
            }
        });
        // if (message.indexOf("File Imported Successfully")) {
        //     this.returnToManageBatch(false)
        // }
    };

    setFileUploading = (bool: boolean) => {
        this.setState({importHidden: bool})
    };

    handleFileChange = (selectorFiles: FileList | null) => {
        console.log(selectorFiles);
        this.setState({fileOne: selectorFiles})
    };

    UploadHistoryRow = (rowData: any) => {
        let row = rowData.row;
        return (
            <>
                <td className="table__cell ">
                    {dateFormatter(row.uploadDate).format("DD/MM/YYYY HH:mm")}
                </td>
                <td className="table__cell ">
                    <ONSStatus label={row.message} small={false}
                               status={getStatusStyle(+row.status).colour}/>
                </td>
            </>
        )
    };

    render() {
        let batchLink = "manage-batch/monthly/" + this.state.year + "/" + this.state.month

        return (
            <DocumentTitle
                title={'LFS Survey Import ' + this.state.period + ' ' + this.state.year + ' ' + this.state.surveyType.toUpperCase()}>
                <div className="container">
                    <ONSBreadcrumbs List={[{name: "Home", link: ""}, {name: "Manage Batch " + monthNumberToString(Number(this.state.month)) + " " + this.state.year, link: batchLink}]}
                                    Current={"Import Survey - " + this.state.period} />
                    <h2>Import Survey</h2>
                    <ONSMetadata List={this.state.metaData}/>
                    <div style={{width: "55%"}}>
                        <h4>Previous imports </h4>
                        <ONSAccordionTable Headers={SURVEY_UPLOAD_HISTORY} data={this.state.uploadHistory}
                                           Row={this.UploadHistoryRow}
                                           expandedRowEnabled={false}
                                           noDataMessage={"Survey has not been previously imported"}/>
                    </div>
                    <ONSPanel status={this.state.panel.status} label={this.state.panel.label}
                              hidden={!this.state.panel.visible}>
                        <p>{this.state.panel.label}</p>
                    </ONSPanel>
                    <br/>
                    <form hidden={this.state.importHidden}>
                        <ONSUpload label={"Import " + this.state.surveyType.toUpperCase() + " File"}
                                   description={"Only .sav accepted"} fileName={"Upload 1"}
                                   fileID={"U1"}
                                   accept=".sav" onChange={(e) => this.handleFileChange(e.target.files)}/>
                        <br/>
                        <ONSButton id={'import-btn'} label={"Import"} field={true} onClick={this.uploadFile} primary={true} small={false}
                                   loading={this.state.uploading}/>
                        <Link className={'field'} style={{marginLeft: "15px"}}
                              to={"/manage-batch/monthly/" + this.state.year + "/" + this.state.month}>
                            <ONSButton label={"Return to Manage Batch"} field={true} primary={false}
                                       small={false}/>
                        </Link>
                    </form>
                    <br/>
                    <FileUploadProgress importName={this.state.surveyType.toUpperCase() + " Survey File"}
                                        fileName={this.state.importFileName} hidden={false}
                                        fileUploading={this.setFileUploading} setPanel={this.setPanel}
                                        redirectOnComplete={this.returnToManageBatch}/>
                    <br/>
                </div>
            </DocumentTitle>
        )
    }
}