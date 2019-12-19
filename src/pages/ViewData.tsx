import React, {ChangeEvent, Component} from 'react';
import {ONSSelect} from "../components/ONS_DesignSystem/ONSSelect";
import {GenericNotFound} from "./GenericNotFound";
import DocumentTitle from "react-document-title";
import {VariableDefinitionTable} from "../components/ViewDataTables/VariableDefinitionTable";
import {ValueLabelsTable} from "../components/ViewDataTables/ValueLabelsTable";

interface State {
    VarDefData: [] | null,
    table: any | null
}

export class ViewData extends Component <{}, State> {
    displayName = ViewData.name;

    constructor(props: any) {
        super(props);
        this.state = {
            VarDefData: [],
            table: null
        };
    }

    handleImportChange = (e: ChangeEvent<HTMLSelectElement>) => {
        let table = null;
        switch (e.target.value) {
            case "Geographical Classifications":
                table = <GenericNotFound/>;
                break;
            case "Design Weights":
                table = <GenericNotFound/>;
                break;
            case "Population Estimates":
                table = <GenericNotFound/>;
                break;
            case "Value Labels":
                table = <ValueLabelsTable/>;
                break;
            case "Variable Definitions":
                table = <VariableDefinitionTable/>;
                break;
        }
        this.setState({table: table})

    };

    tableSelection = [
        // {"label": "Geographical Classifications", "value": "Geographical Classifications"},
        // {"label":"Design Weights", "value":"Design Weights"},
        // {"label":"Population Estimates", "value":"Population Estimates"},
        {"label": "Value Labels", "value": "Value Labels"},
        {"label": "Variable Definitions", "value": "Variable Definitions"}
    ];

    render() {
        return (
            <DocumentTitle title={'LFS View Data'}>
                <>
                    <div className={'container'}>
                        <br/>
                        <ONSSelect label="Select Table" value="select value" options={this.tableSelection}
                                   onChange={this.handleImportChange}/>
                        {this.state.table}
                    </div>
                </>
            </DocumentTitle>
        );
    }
}
