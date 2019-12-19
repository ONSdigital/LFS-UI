import React, {Component} from "react";
import DocumentTitle from "react-document-title";
import {ImportFileTable} from "./ImportFileTable";
import { ONSBreadcrumbs } from "../../components/ONS_DesignSystem/ONSBreadcrumbs";

interface Props {
    match: any
}

interface State {

}

export class ImportOverview extends Component <Props, State> {
    displayName = ImportOverview.name;

    List = [{name: "Import Overview", link: "import/overview"}]
    render() {
        return (
            <DocumentTitle title={"LFS Imports Overview"}>
                <div className="container">
                    <ONSBreadcrumbs List={[]} Current="Import Overview"></ONSBreadcrumbs>
                    <h3>Import Overview</h3>
                    <ImportFileTable/>
                </div>
            </DocumentTitle>
        );
    }
}