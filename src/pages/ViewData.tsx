import React, {ChangeEvent, Component} from "react";
import {GenericNotFound} from "./GenericNotFound";
import DocumentTitle from "react-document-title";
import {VariableDefinitionTable} from "../components/ViewDataTables/VariableDefinitionTable";
import {ValueLabelsTable} from "../components/ViewDataTables/ValueLabelsTable";
import {ONSTabs} from "../components/ONS_DesignSystem/ONSTabs";

interface State {
    VarDefData: [] | null,
    table: any | null
    tabItems: any[]
}

export class ViewData extends Component <{}, State> {
    displayName = ViewData.name;

    constructor(props: any) {
        super(props);
        this.state = {
            VarDefData: [],
            table: null,
            tabItems: this.tabsSelection
        };
    }

    componentDidMount(): void {
        this.handleImportChange("Variable Definitions")
    }

    handleImportChange = (e: ChangeEvent<HTMLSelectElement> | string) => {
        console.log(e)
        let table = null;
        let name = e;
        if (typeof e !== "string") {
            name = e.target.value;
        }

        switch (name) {
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
        this.setState({table: table});
        let items = this.state.tabItems;
        let item = items.find(x => x.active);
        if (item !== undefined) {
            item.active = false;
        }

        item = items.find(x => x.name === name);
        if (item !== undefined) {
            item.active = true;
        }
    };

    tabsSelection = [
        {name: "Variable Definitions", active: true},
        {name: "Value Labels", active: false}
    ];

    tableSelection = [
        // {"label": "Geographical Classifications", "value": "Geographical Classifications"},
        // {"label":"Design Weights", "value":"Design Weights"},
        // {"label":"Population Estimates", "value":"Population Estimates"},
        {"label": "Value Labels", "value": "Value Labels"},
        {"label": "Variable Definitions", "value": "Variable Definitions"}
    ];

    render() {
        return (
            <DocumentTitle title={"LFS View Data"}>
                <div className={"container"}>
                    <ONSTabs label={"Select Table"} items={this.state.tabItems} onClick={this.handleImportChange}/>
                    {/*<ONSSelect label="Select Table" value="select value" options={this.tableSelection}*/}
                    {/*           onChange={this.handleImportChange}/>*/}
                    {this.state.table}
                </div>
            </DocumentTitle>
        );
    }
}
