import React, {Component} from "react";
import {ONSUpload} from "../components/ONSUpload";
import {ONSButton} from "../components/ONSButton";
import {postFile} from "../utilities/http";
import {ONSPanel} from "../components/ONSPanel";

interface Props{
}

interface State{
    fileOne: any,
    errorPanelHidden: boolean,
    errorPanelMessage: string,
    uploading: boolean
}

export class File_Upload extends Component <Props, State> {
    displayName = File_Upload.name;

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
        // TODO: Send correct data for each file type
        postFile(this.state.fileOne, 'lfsFile','Survey','GB', "1")
            .then(response => {
                console.log(response);
                if (response.status === 'ERROR'){
                    this.setErrorMessage(response.errorMessage.toString());
                }
                this.setState({
                    uploading: false,
                });
            })
            .catch(err => {
                console.log(err)
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
                <ONSPanel status={"error"}  label={"error"} hidden={this.state.errorPanelHidden}>
                    <p>{this.state.errorPanelMessage}</p>
                </ONSPanel>
                <form>
                    <ONSUpload label={"SAV File 1"} description={"Only .sav accepted"} fileName={"Upload 1"} fileID={"U1"}
                               accept=".sav" onChange={(e) => this.handleFileOneChange(e.target.files)}/>
                    <ONSUpload label={"File 2"} description={"Only .csv accepted"} fileName={"Upload 2"} fileID={"U2"}
                               accept=".csv"/>
                    <ONSUpload label={"File 3"} description={"Only .csv accepted"} fileName={"Upload 3"} fileID={"U3"}
                               accept=".csv"/>
                    <ONSButton label={"Submit"} onClick={this.upload} primary={true} small={false} loading={this.state.uploading}/>
                </form>
            </div>
        )
    }
}