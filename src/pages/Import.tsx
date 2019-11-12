import React, {ChangeEvent, Component} from "react";
import {ONSUpload} from "../components/ONS_DesignSystem/ONSUpload";
import {ONSButton} from "../components/ONS_DesignSystem/ONSButton";
import {postImportFile} from "../utilities/http";
import {ONSPanel} from "../components/ONS_DesignSystem/ONSPanel";
import {ONSSelect} from "../components/ONS_DesignSystem/ONSSelect";
import {FileUploadProgress} from "./FileUploadProgress";
import {toUpperCaseFirstChar} from "../utilities/Common_Functions";

interface Props {
}


interface State {
    fileOne: any
    uploading: boolean
    import: string
    importHidden: boolean
    uploadProgressHidden: boolean
    fileType: string
    redirect: string
    uploadLink: string
    //check to see if functionality is built and whether to send the request
    built: boolean
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
        this.state = {
            fileOne: "",
            uploading: false,
            import: "",
            importHidden: true,
            uploadProgressHidden: true,
            fileType: "",
            redirect: "",
            uploadLink: "",
            built: false,
            fileName: "string",
            panel: {
                label: '',
                visible: false,
                status: 'info'
            }
        };
        this.setPanel.bind(this);
        this.setAddressImporting.bind(this);
        this.handleFileOneChange = this.handleFileOneChange.bind(this);
    }


    upload = () => {
        console.log('Uploading File');
        this.hidePanel();
        // TODO: Send correct data for each file type
        if (this.state.built) {
            postImportFile(this.state.fileOne, this.state.uploadLink, this.state.fileName)
                .then(response => {
                    console.log(response);
                    if (response.status === 'ERROR') {
                        console.log("window no change");
                        this.setPanel(response.errorMessage.toString(), 'error');
                        this.setState({importHidden: true, uploadProgressHidden: true})
                    } else {
                        if (response.status === "OK") {
                            this.setPanel(toUpperCaseFirstChar(this.state.import) + ': File Uploaded Successfully', 'success');
                        }
                        console.log("window change")
                    }
                    this.setState({
                        uploading: false,
                    });
                })
                .catch(err => {
                    console.log(err);
                    this.setPanel(err.toString(), 'error');
                    this.setState({
                        uploading: false,
                        uploadProgressHidden: false
                    });
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

    setPanel = (message: string, status: string) => {
        this.setState({
            panel: {
                label: message,
                visible: true,
                status: status
            }
        });
    };

    handleFileOneChange = (selectorFiles: FileList | null) => {
        console.log(selectorFiles);
        this.setState({fileOne: selectorFiles});
    };

    handleImportChange = (e: ChangeEvent<HTMLSelectElement>) => {
        let hidden = (e.target.value !== "address");
        this.setState({
            import: e.target.value,
            importHidden: false,
            fileType: this.filetype(e.target.value),
            uploadProgressHidden: hidden,
        });
        this.hidePanel()
    };

    setAddressImporting = (bool: boolean) => {
        this.setState({importHidden: !bool})
    };

    filetype = (file: string) => {
        let type = "";
        switch (file) {
            case "address":
                type = '.csv';
                this.setState({redirect: "/Address", built: true, fileName: "address", uploadLink: 'address'});
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
                type = '.csv';
                this.setState({redirect: "", built: true, fileName: "variable_definitions", uploadLink: 'variable/definitions'});
                break;
        }
        return type
    };

    fileSelection = [
        //  {"label":"Bulk Ammendments", "value":"Bulk Ammendments"},
        //  {"label":"Design Weights", "value":"Design Weights"},
        //  {"label":"Geographical Classifications", "value":"Geographical Classifications"},
        {"label": "LFS Address File", "value": "address"},
        // {"label": "Value Label", "value": "Value Label"},
        //  {"label":"Population Estimates", "value":"Population Estimates"},
         {"label":"Variable Definitions", "value":"Variable Definitions"}
    ];


    render() {
        return (
            <div className="container">
                <form>
                    <ONSPanel status={this.state.panel.status} label={this.state.panel.label} hidden={!this.state.panel.visible}>
                        <p>{this.state.panel.label}</p>
                    </ONSPanel>
                    <ONSSelect label="Select Import" value="select value" options={this.fileSelection}
                               onChange={this.handleImportChange}/>
                    <br/>
                    <div hidden={this.state.importHidden}>
                        <ONSUpload label={"Import " + toUpperCaseFirstChar(this.state.import)}
                                   description={"Only " + this.state.fileType + " accepted"} fileName={"Upload 1"}
                                   fileID={"U1"}
                                   accept={this.state.fileType}
                                   onChange={(e) => this.handleFileOneChange(e.target.files)}/>
                        <ONSButton label={"Submit"} field={true} onClick={this.upload} primary={true} small={false}
                                   loading={this.state.uploading}/>
                    </div>
                </form>
                <FileUploadProgress import={this.state.import} hidden={this.state.uploadProgressHidden} importOptionVisible={this.setAddressImporting} setPanel={this.setPanel}/>
            </div>
        )
    }
}