import React, {Component, ChangeEvent} from "react";
import {ONSUpload} from "../components/ONSUpload";
import {ONSButton} from "../components/ONSButton";
import {postFile} from "../utilities/http";
import {ONSPanel} from "../components/ONSPanel";
import { ONSSelect } from "../components/ONSSelect";

interface Props{
}

interface State{
    fileOne: any,
    errorPanelHidden: boolean,
    errorPanelMessage: string,
    uploading: boolean
    import: string
    importHidden: boolean
    fileType: string
}

export class Import extends Component <Props, State> {
    displayName = Import.name;

    constructor(props : Props) {
        super(props);
        this.state = {
            fileOne: "",
            errorPanelHidden: true,
            errorPanelMessage: "",
            uploading: false,
            import: "",
            importHidden: true,
            fileType: ""
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

    handleImportChange = (e: ChangeEvent<HTMLSelectElement>) => {
        this.setState({import: e.target.value, importHidden: false, fileType: this.filetype(e.target.value)})
    }

    filetype = (file: string) => {
        let type = ""
        switch (file){
            case "Bulk Ammendments": type = ''; break;
            case "Design Weights": type = ''; break;
            case "Geographical Classifications": type = ''; break;
            case "LFS Address File": type = '.csv'; break;
            case "Survey Data Labels": type = ''; break;
            case "Value Label": type = '.csv'; break;
            case "Variable Definitions": type = ''; break;
        }
        return type
    }

    fileSelection = [
                //  {"label":"Bulk Ammendments", "value":"Bulk Ammendments"}, 
                //  {"label":"Design Weights", "value":"Design Weights"}, 
                //  {"label":"Geographical Classifications", "value":"Geographical Classifications"}, 
                //  {"label":"Survey Data Labels", "value":"Survey Data Labels"}, 
                {"label":"LFS Address File", "value":"LFS Address File"},
                {"label":"Value Label", "value":"Value Label"}
                //  , 
                //  {"label":"Variable Definitions", "value":"Variable Definitions"}
                ]


    render() {
        return (
            <div className="container">     
                <form>
                    <ONSPanel status={"error"}  label={"error"} hidden={this.state.errorPanelHidden}>
                            <p>{this.state.errorPanelMessage}</p>
                    </ONSPanel>
                    <ONSSelect label="Select Import" value="select value" options={this.fileSelection} onChange={this.handleImportChange}></ONSSelect>
                    <br></br>
                    <div hidden={this.state.importHidden}>
                        <ONSUpload label={"Import " + this.state.import} description={"Only " + this.state.fileType + " accepted"} fileName={"Upload 1"} fileID={"U1"}
                                accept={this.state.fileType} onChange={(e) => this.handleFileOneChange(e.target.files)}/>
                        <ONSButton label={"Submit"} field={true} onClick={this.upload} primary={true} small={false} loading={this.state.uploading}/>
                    </div>
                </form>
            </div>
        )
    }
}