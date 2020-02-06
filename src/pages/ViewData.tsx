import React, {Component} from "react";
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
        this.handleTableChange("Variable Definitions");
    }

    handleTableChange = (tableName: string) => {
        let table = null;

        switch (tableName) {
            case "Value Labels":
                table = <ValueLabelsTable/>;
                break;
            case "Variable Definitions":
                table = <VariableDefinitionTable/>;
                break;
        }
        this.setState({table: table});

        // Set Previous active tab as not active
        let items = this.state.tabItems;
        let item = items.find(x => x.active);
        if (item !== undefined) {
            item.active = false;
        }

        // Find new selected tab and set as active
        item = items.find(x => x.name === tableName);
        if (item !== undefined) {
            item.active = true;
        }
    };

    tabsSelection = [
        {name: "Variable Definitions", active: true},
        {name: "Value Labels", active: false}
    ];

    render() {
        return (
            <DocumentTitle title={"LFS View Data"}>
                <div className={"container"}>
                    <br/>
                    <ONSTabs label={"Select Table"} items={this.state.tabItems} onClick={this.handleTableChange}/>
                    {this.state.table}
                </div>
            </DocumentTitle>
        );
    }
}
