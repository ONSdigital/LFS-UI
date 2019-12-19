import React, {Component} from "react";
import DocumentTitle from "react-document-title";
import {ImportOutputSpecTable} from "./ImportOutputSpecTable";
import {ONSBreadcrumbs} from "../../components/ONS_DesignSystem/ONSBreadcrumbs"

interface Props {
    match: any
}

export class ImportOutputSpec extends Component <Props, {}> {
    displayName = ImportOutputSpec.name;

    render() {
        return (
            <DocumentTitle title={"LFS Imports Overview"}>
                <div className="container">
                    <ONSBreadcrumbs List={[{name: "Import Overview", link: "import/overview"}]} Current="Output File Specification"></ONSBreadcrumbs>
                    <h3>Output File Specification</h3>
                    <ImportOutputSpecTable/>
                </div>
            </DocumentTitle>
        );
    }
}