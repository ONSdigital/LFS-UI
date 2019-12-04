import React, {Component} from "react";
import DocumentTitle from "react-document-title";
import {ImportFileTable} from "./ImportFileTable";

interface Props {
    match: any
}

interface State {

}

export class ImportOverview extends Component <Props, State> {
    displayName = ImportOverview.name;

    render() {
        return (
            <DocumentTitle title={"LFS Imports Overview"}>
                <div className="container">
                    <h3>Import Overview</h3>
                    <ImportFileTable/>
                </div>
            </DocumentTitle>
        );
    }
}