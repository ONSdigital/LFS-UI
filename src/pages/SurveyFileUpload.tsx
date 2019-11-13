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
import moment from "moment";
import DocumentTitle from "react-document-title";
import {FileUploadProgress} from "./FileUploadProgress";

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
    surveyType: string,
    year: string
    week: string
    month: string
    uploadHistory: []
    importHidden: boolean
    importFileName: string
}

export class SurveyFileUpload extends Component <Props, State> {
    displayName = SurveyFileUpload.name;

    constructor(props: Props) {
        super(props);
        this.state = {
            fileOne: "",
            uploading: false,
            surveyType: props.match.params.survey,
            year: props.match.params.year,
            week: props.match.params.week,
            month: props.match.params.month,
            panel: {
                label: '',
                visible: false,
                status: ''
            },
            uploadHistory: [],
            importHidden: false,
            importFileName: props.match.params.survey + (props.match.params.survey === 'gb' ? props.match.params.week : props.match.params.month) + props.match.params.year
        };
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    componentDidMount(): void {
        this.getUploadHistory()
    }

    getUploadHistory = () => {
        getSurveyAudit(this.state.surveyType, this.state.year, (this.state.surveyType === 'gb' ? this.state.week : this.state.month))
            .then(r => {
                if (r !== undefined) {
                    // Batch does not exist, load not found page
                    this.setState({uploadHistory: r})
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

        postSurveyFile(this.state.fileOne, this.state.importFileName, 'survey', this.state.surveyType, (this.state.surveyType === "gb" ? this.state.week : this.state.month), this.state.year)
            .then(response => {
                console.log(response);
                if (response.status === 'ERROR') {
                    this.setPanel("Error Occurred while Uploading File: " + response.errorMessage.toString(), 'error');
                } else {
                    this.setPanel(response.status, 'success');
                    // this.returnToManageBatch(true)
                }
                this.setState({
                    uploading: false,
                });
            })
            .catch(err => {
                console.log(err);
                if (err.toString() === "SyntaxError: Unexpected token P in JSON at position 0") {
                    this.setPanel("Error Occurred while Uploading File: Unable to Connect to Server", 'error');
                } else {
                    this.setPanel("Error Occurred while Uploading File: " + err.toString(), 'error');
                }
                this.setState({
                    uploading: false,
                });
            });
    };

    returnToManageBatch = (uploaded: boolean) => {
        window.location.href = "/View_Monthly_Batch/monthly/" + this.state.year + "/" + this.state.month + (!uploaded ? "/true" : "")
    };

    formatMetaData() {
        return (
            [{
                L: "Survey",
                R: this.state.surveyType.toUpperCase(),
            }, {
                L: "Year",
                R: this.state.year.toString(),
            }, {
                L: "Period",
                R: (this.state.surveyType === "gb" ? "Week " + this.state.week.toString() : monthNumberToString(Number(this.state.month)).toString()),
            }
            ]
        )
    }

    setPanel = (message: string, status: string) => {
        this.setState({
            panel: {
                label: message,
                visible: true,
                status: status
            }
        });
    };

    setFileUploading = (bool: boolean) => {
        this.setState({importHidden: !bool})
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
                    {moment(new Date(row.referenceDate)).format('L H:mm')}
                </td>
                <td className="table__cell ">
                    <ONSStatus label={row.message} small={false}
                               status={getStatusStyle(+row.status).colour}/>
                </td>
            </>
        )
    };

    render() {
        return (
            <DocumentTitle title='LFS: Survey File Upload'>
                <div className="container">
                    <h2>Import Survey</h2>
                    <ONSMetadata List={this.formatMetaData()}/>
                    <div style={{width: "55%"}}>
                        <h4>Previous imports </h4>
                        <ONSAccordionTable Headers={SURVEY_UPLOAD_HISTORY} data={this.state.uploadHistory}
                                           Row={this.UploadHistoryRow}
                                           expandedRowEnabled={false}
                                           noDataMessage={"Survey has not been previously imported"}/>
                    </div>
                    <form hidden={this.state.importHidden}>
                        <ONSPanel status={this.state.panel.status} label={this.state.panel.label}
                                  hidden={!this.state.panel.visible}>
                            <p>{this.state.panel.label}</p>
                        </ONSPanel>
                        <ONSUpload label={"Import " + this.state.surveyType.toUpperCase() + " File"}
                                   description={"Only .sav accepted"} fileName={"Upload 1"}
                                   fileID={"U1"}
                                   accept=".sav" onChange={(e) => this.handleFileChange(e.target.files)}/>
                        <ONSButton label={"Submit"} field={true} onClick={this.uploadFile} primary={true} small={false}
                                   loading={this.state.uploading}/>
                        <ONSButton label={"Cancel"} field={true} onClick={this.returnToManageBatch} primary={false}
                                   small={false}/>
                    </form>
                    <br/>
                    <FileUploadProgress importName={this.state.surveyType.toUpperCase() +  " Survey File"} fileName={this.state.importFileName} hidden={false} importOptionVisible={this.setFileUploading} setPanel={this.setPanel}/>
                    <br/>
                </div>
            </DocumentTitle>
        )
    }
}