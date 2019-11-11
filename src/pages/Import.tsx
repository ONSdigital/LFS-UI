import React, {ChangeEvent, Component} from "react";
import {ONSUpload} from "../components/ONS_DesignSystem/ONSUpload";
import {ONSButton} from "../components/ONS_DesignSystem/ONSButton";
import {postImportFile} from "../utilities/http";
import {ONSPanel} from "../components/ONS_DesignSystem/ONSPanel";
import {ONSSelect} from "../components/ONS_DesignSystem/ONSSelect";
import {Address} from "./Address";

interface Props {
}

interface State {
    fileOne: any,
    errorPanelHidden: boolean,
    errorPanelMessage: string,
    uploading: boolean
    import: string
    importHidden: boolean
    statusHidden: boolean
    fileType: string
    redirect: string
    //check to see if functionality is built and whether to send the request
    built: boolean
}

export class Import extends Component <Props, State> {
    displayName = Import.name;

    constructor(props: Props) {
        super(props);
        this.state = {
            fileOne: "",
            errorPanelHidden: true,
            errorPanelMessage: "",
            uploading: false,
            import: "",
            importHidden: true,
            statusHidden: true,
            fileType: "",
            redirect: "",
            built: false
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
        if (this.state.built) {
            postImportFile(this.state.fileOne, this.state.import, this.state.fileType)
                .then(response => {
                    console.log(response);
                    console.log(response.status);
                    if (response.status === '') {
                        console.log("window no change");

                        this.setErrorMessage(response.errorMessage.toString());
                    } else {
                        console.log("window change")
                        this.setState({importHidden: true, statusHidden: false})
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
        }
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
        this.setState({
            import: e.target.value,
            importHidden: false,
            fileType: this.filetype(e.target.value),
            statusHidden: false
        })
    };

    filetype = (file: string) => {
        let type = ""
        switch (file) {
            case "address":
                type = '.csv';
                this.setState({redirect: "/Address", built: true});
                break;
            case "Bulk Ammendments":
                type = '';
                this.setState({redirect: ""});
                break;
            case "Design Weights":
                type = '';
                this.setState({redirect: ""});
                break;
            case "Geographical Classifications":
                this.setState({redirect: ""});
                type = '';
                break;
            case "Population Estimates":
                type = '';
                this.setState({redirect: "/"});
                break;
            case "Value Label":
                type = '.csv';
                this.setState({redirect: ""});
                break;
            case "Variable Definitions":
                type = '';
                this.setState({redirect: ""});
                break;
        }
        return type
    };

    fileSelection = [
        //  {"label":"Bulk Ammendments", "value":"Bulk Ammendments"},
        //  {"label":"Design Weights", "value":"Design Weights"},
        //  {"label":"Geographical Classifications", "value":"Geographical Classifications"},
        {"label": "LFS Address File", "value": "address"},
        {"label": "Value Label", "value": "Value Label"}
        //  ,
        //  {"label":"Population Estimates", "value":"Population Estimates"},
        //  {"label":"Variable Definitions", "value":"Variable Definitions"}
    ];


    render() {
        return (
            <div className="container">
                <form>
                    <ONSPanel status={"error"} label={"error"} hidden={this.state.errorPanelHidden}>
                        <p>{this.state.errorPanelMessage}</p>
                    </ONSPanel>
                    <ONSSelect label="Select Import" value="select value" options={this.fileSelection}
                               onChange={this.handleImportChange}/>
                    <br/>
                    <div hidden={this.state.importHidden}>
                        <ONSUpload label={"Import " + this.state.import}
                                   description={"Only " + this.state.fileType + " accepted"} fileName={"Upload 1"}
                                   fileID={"U1"}
                                   accept={this.state.fileType}
                                   onChange={(e) => this.handleFileOneChange(e.target.files)}/>
                        <ONSButton label={"Submit"} field={true} onClick={this.upload} primary={true} small={false}
                                   loading={this.state.uploading}/>
                    </div>
                </form>
                <Address import={this.state.import} hidden={this.state.statusHidden}/>
            </div>
        )
    }
}