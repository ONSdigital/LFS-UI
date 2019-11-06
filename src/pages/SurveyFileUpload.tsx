import React, {Component} from "react";
import {ONSUpload} from "../components/ONSUpload";
import {ONSButton} from "../components/ONSButton";
import {postSurveyFile} from "../utilities/http";
import {ONSPanel} from "../components/ONSPanel";
import {ONSMetadata} from "../components/ONSMetadata";
import {monthNumberToString} from "../utilities/Common_Functions";

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
            }
        };
        this.handleFileChange = this.handleFileChange.bind(this);
    }


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

        postSurveyFile(this.state.fileOne, 'lfsFile', 'survey', this.state.surveyType, (this.state.surveyType === "gb" ? this.state.week : this.state.month), this.state.year)
            .then(response => {
                console.log(response);
                if (response.status === 'ERROR') {
                    this.setPanel("Error Occurred while Uploading File: " + response.errorMessage.toString(), 'error');
                } else {
                    this.setPanel(response.status, 'success');
                    this.returnToManageBatch(true)
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
        window.location.href = "/View_Monthly_Batch/monthly/" + this.state.year + "/" + this.state.month + (!uploaded ?  "/true" : "")
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

    handleFileChange = (selectorFiles: FileList | null) => {
        console.log(selectorFiles);
        this.setState({fileOne: selectorFiles})
    };

    render() {
        return (
            <div className="container">
                <h2>Import Survey</h2>
                <ONSMetadata List={this.formatMetaData()}/>
                <form>
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
            </div>
        )
    }
}