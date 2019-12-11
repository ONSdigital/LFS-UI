import React, {ChangeEvent, Component} from "react";
import {ONSAccordionTable} from "../ONS_DesignSystem/ONSAccordionTable";
import {VALUE_LABELS_HEADERS} from "../../utilities/Headers";
import DocumentTitle from "react-document-title";
import {getValueLabels} from "../../utilities/http";
import {ONSTextInput} from "../ONS_DesignSystem/ONSTextInput";
import {ONSButton} from "../ONS_DesignSystem/ONSButton";
import dateFormatter from "dayjs";

interface Props {
}

interface State {
    data: ValueLabelTableRow[]
    filteredData: ValueLabelTableRow[]
    search: string
    noDataMessage: string
}

interface ValueLabelTableRow {
    label_name: string
    label_value: string
    description: string
    source: string
    variable: string
    last_updated: Date
    valid_from: Date
}


export class ValueLabelsTable extends Component <Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            data: [],
            filteredData: [],
            search: "",
            noDataMessage: this.noDataMessage
        };
        this.getVariableDefinitionData();
    }

    getVariableDefinitionData = () => {
        getValueLabels()
            .then(r => {
                console.log(r);
                if (r.message !== "no data found") {
                    this.setState({data: r, filteredData: r});
                } else this.setState({filteredData: [], noDataMessage: "No Value Labels found"});
            })
            .catch(error => {
                console.log(error);
                this.setState({filteredData: [], noDataMessage: "Error occurred while getting Value Labels"});
            });
    };

    getSingleVariableDefinitionData = () => {
        if (this.state.search.length === 0) {
            return;
        }
        getValueLabels(this.state.search.toUpperCase())
            .then(r => {
                console.log(r);
                if (r.message !== "no data found") {
                    this.setState({filteredData: r});
                } else this.setState({
                    filteredData: [],
                    noDataMessage: "Variable: " + this.state.search + ", could not be found"
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({filteredData: [], noDataMessage: "Error occurred while searching for Variable"});
            });
    };

    noDataMessage = "No Value Labels matching this criteria";

    viewAll = () => {
        this.setState({filteredData: this.state.data, search: "", noDataMessage: "No Value Labels found"});
    };

    handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({search: e.target.value});
        if (e.target.value.length === 0) {
            this.setState({filteredData: this.state.data});
        }
    };

    render() {
        return (
            <DocumentTitle title={"LFS View Value Labels"}>
                <>
                    <ONSTextInput value={this.state.search} label={"Filter by Variable Name"}
                                  onChange={this.handleSearch}/>
                    <ONSButton label={"Search"} primary={true} small={false} field={true}
                               onClick={this.getSingleVariableDefinitionData}/>
                    <ONSButton label={"View All"} primary={false} small={false} field={true}
                               onClick={this.viewAll}/>
                    <ONSAccordionTable data={this.state.filteredData} Row={ValueLabelTableRow}
                                       expandedRowEnabled={false}
                                       noDataMessage={this.state.noDataMessage}
                                       Headers={VALUE_LABELS_HEADERS}
                                       pagination={true}
                                       paginationSize={20}
                                       scrollable={true}/>
                </>
            </DocumentTitle>
        );
    }
}


const ValueLabelTableRow = (rowData: any) => {
    let row: ValueLabelTableRow = rowData.row;
    return (
        <>
            <td className="table__cell ">
                {row.variable}
            </td>
            <td className="table__cell ">
                {row.label_name}
            </td>
            <td className="table__cell ">
                {row.label_value}
            </td>
            <td className="table__cell ">
                {row.description}
            </td>
            <td className="table__cell ">
                {dateFormatter(row.valid_from).format("DD/MM/YYYY")}
                {}
            </td>

        </>
    );
};

