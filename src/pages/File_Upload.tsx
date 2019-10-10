import React, {Component} from "react";
import {ONSUpload} from "../components/ONSUpload";
import {ONSButton} from "../components/ONSButton";

export class File_Upload extends Component{
    displayName = File_Upload.name
    constructor(props: any) {
        super(props);
  }

    render() {
        return (
            <div className="container">
                <form>
                    <ONSUpload label={"File 1"} description={"Only .csv accepted"} fileName={"Upload 1"} fileID={"U1"} accept=".csv"/>
                    <ONSUpload label={"File 2"} description={"Only .csv accepted"} fileName={"Upload 2"} fileID={"U2"} accept=".csv"/>
                    <ONSUpload label={"File 3"} description={"Only .csv accepted"} fileName={"Upload 3"} fileID={"U3"} accept=".csv"/>
                    <ONSButton label={"Submit"} primary={true} small={false}/>
                </form>
            </div>
            )
    }
}
