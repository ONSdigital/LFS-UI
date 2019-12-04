import React, {Component} from "react";
import DocumentTitle from "react-document-title";
import {ReferenceFileImportTable} from "./manageBatch/ReferenceFileImportTable";

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
                    <ReferenceFileImportTable/>
                </div>
            </DocumentTitle>
        );
    }
}