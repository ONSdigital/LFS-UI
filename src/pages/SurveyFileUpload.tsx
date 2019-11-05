import React, {Component} from "react";
import {ONSUpload} from "../components/ONSUpload";
import {ONSButton} from "../components/ONSButton";
import {postSurveyFile} from "../utilities/http";
import {ONSPanel} from "../components/ONSPanel";

interface Props{
    period: string,
    year: string,
    surveyType: string
}

interface State{
    fileOne: any,
    errorPanelHidden: boolean,
    errorPanelMessage: string,
    uploading: boolean
}

export class SurveyFileUpload extends Component <Props, State> {
    displayName = SurveyFileUpload.name;

    constructor(props : Props) {
        super(props);
        this.state = {
            fileOne: "",
            errorPanelHidden: true,
            errorPanelMessage: "",
            uploading: false
        };
        this.handleFileOneChange = this.handleFileOneChange.bind(this);
    }


    upload = () => {
        console.log('Uploading File');
        this.setState({
            errorPanelHidden: true,
            uploading: true
        });
        postSurveyFile(this.state.fileOne, 'lfsFile','survey', this.props.surveyType, this.props.period, this.props.year)
            .then(response => {
                console.log(response);
                if (response.status === 'ERROR'){
                    this.setErrorMessage(response.errorMessage.toString());
                }
                this.setState({
                    uploading: false,
                });
                this.setErrorMessage(response.status);
            })
            .catch(err => {
                console.log(err);
                this.setErrorMessage(err.toString());
                this.setState({
                    uploading: false,
                });
            });
    };

    setErrorMessage = (message: string) => {
        this.setState({
            errorPanelHidden: false,
            errorPanelMessage: "Error Occurred while Uploading Files: " + message,
        });
    };


    handleFileOneChange = (selectorFiles: FileList | null) => {
        console.log(selectorFiles);
        this.setState({fileOne: selectorFiles})
    };

    render() {
        return (
            <div className="container">     
                <form>
                    <ONSPanel status={"error"}  label={"error"} hidden={this.state.errorPanelHidden}>
                            <p>{this.state.errorPanelMessage}</p>
                    </ONSPanel>
                    <ONSUpload label={"SAV File 1"} description={"Only .sav accepted"} fileName={"Upload 1"} fileID={"U1"}
                               accept=".sav" onChange={(e) => this.handleFileOneChange(e.target.files)}/>
                    <ONSButton label={"Submit"} field={true} onClick={this.upload} primary={true} small={false} loading={this.state.uploading}/>
                </form>
            </div>
        )
    }
}