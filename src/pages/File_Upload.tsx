import React, {ChangeEvent, Component} from "react";
import {ONSUpload} from "../components/ONSUpload";
import {ONSButton} from "../components/ONSButton";
import {postFile} from "../utilities/http";

interface Props{
}

interface State{
    fileOne: string,
}

export class File_Upload extends Component <Props, State> {
    displayName = File_Upload.name;

    constructor(props : Props) {
        super(props);
        this.state = {fileOne: ""};
    }


    upload = () => {
        console.log('Uploading File')
        postFile(this.state.fileOne, 'FileOne','.csv','GB')
    };

    handleFileOneChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        this.setState({fileOne: e.target.value})
    };


    render() {
        return (
            <div className="container">
                <form>
                    <ONSUpload label={"File 1"} description={"Only .csv accepted"} fileName={"Upload 1"} fileID={"U1"}
                               accept=".csv" onChange={this.handleFileOneChange}/>
                    <ONSUpload label={"File 2"} description={"Only .csv accepted"} fileName={"Upload 2"} fileID={"U2"}
                               accept=".csv"/>
                    <ONSUpload label={"File 3"} description={"Only .csv accepted"} fileName={"Upload 3"} fileID={"U3"}
                               accept=".csv"/>
                    <ONSButton label={"Submit"} onClick={this.upload} primary={true} small={false}/>
                </form>
            </div>
        )
    }
}