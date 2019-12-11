import React, {Component} from "react";
import DocumentTitle from "react-document-title";
import {ImportOutputSpecTable} from "./ImportOutputSpecTable";

interface Props {
    match: any
}

export class ImportOutputSpec extends Component <Props, {}> {
    displayName = ImportOutputSpec.name;

    render() {
        return (
            <DocumentTitle title={"LFS Imports Overview"}>
                <div className="container">
                    <h3>Output File Specification</h3>
                    <ImportOutputSpecTable/>
                </div>
            </DocumentTitle>
        );
    }
}