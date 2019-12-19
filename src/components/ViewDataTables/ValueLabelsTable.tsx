import React, {ChangeEvent, Component} from "react";
import {ONSAccordionTable} from "../ONS_DesignSystem/ONSAccordionTable";
import {VALUE_LABELS_HEADERS} from "../../utilities/Headers";
import DocumentTitle from "react-document-title";
import {getValueLabels} from "../../utilities/http";
import {ONSTextInput} from "../ONS_DesignSystem/ONSTextInput";
import {ONSButton} from "../ONS_DesignSystem/ONSButton";
import dateFormatter from "dayjs";
import lodash from "lodash";

interface Props {
}

interface State {
    data: any[]
    filteredData: any[]
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

    noDataMessage = "No Value Labels matching this criteria";

    viewAll = () => {
        this.setState({filteredData: this.state.data, search: "", noDataMessage: "No Value Labels found"});
    };

    handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        let newFilteredList = lodash.filter(this.state.data, (variableRow) => variableRow.variable.includes(e.target.value.toUpperCase()));
        this.setState({search: e.target.value, filteredData: newFilteredList});
    };

    render() {
        return (
            <DocumentTitle title={"LFS View Value Labels"}>
                <>
                    <ONSTextInput value={this.state.search} label={"Filter by Variable Name"}
                                  onChange={this.handleSearch}/>
                    <ONSButton label={"View All"} primary={false} small={false} field={true}
                               onClick={this.viewAll}/>
                    <br/>
                    <ONSAccordionTable data={this.state.filteredData} Row={ValueLabelTableRow}
                                       expandedRowEnabled={false}
                                       noDataMessage={this.state.noDataMessage}
                                       Headers={VALUE_LABELS_HEADERS}
                                       pagination={true}
                                       paginationSize={20}
                                       scrollable={false}/>
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

