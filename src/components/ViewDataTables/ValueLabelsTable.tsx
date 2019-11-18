import React, {ChangeEvent, Component} from 'react';
import {ONSAccordionTable} from "../ONS_DesignSystem/ONSAccordionTable";
import {VALUE_LABELS_HEADERS} from "../../utilities/Headers";
import DocumentTitle from "react-document-title";
import moment from "moment";
import {getValueLabels} from "../../utilities/http";
import {ONSTextInput} from "../ONS_DesignSystem/ONSTextInput";
import {ONSButton} from "../ONS_DesignSystem/ONSButton";

interface Props {
}

interface State {
    data: ValueLabelTableRow[]
    filteredData: ValueLabelTableRow[]
    search: string
}

interface ValueLabelTableRow {
    name: string
    label: string
    value: string
    source: string
    type: string
    last_updated: Date
}

export class ValueLabelsTable extends Component <Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {data: [], filteredData: [], search: ""};
        this.getVariableDefinitionData();
    }

    getVariableDefinitionData = () => {
        getValueLabels()
            .then(r => {
                console.log(r);
                if (r.message !== "no data found") {
                    this.setState({data: r, filteredData: r});
                } else this.setState({filteredData: []});
            })
            .catch(error => {
                console.log(error);
            });
    };

    getSingleVariableDefinitionData = () => {
        getValueLabels(this.state.search.toUpperCase())
            .then(r => {
                console.log(r);
                if (r.message !== "no data found") {
                    this.setState({filteredData: r});
                } else this.setState({filteredData: []});
            })
            .catch(error => {
                console.log(error);
            });
    };

    noDataMessage = "No Value Labels matching this criteria";

    viewAll = () => {
        this.setState({filteredData: this.state.data, search: ""})
    };

    handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({search: e.target.value});
        if (e.target.value.length === 0) {
            this.setState({filteredData: this.state.data})
        }
    };

    render() {
        return (
            <DocumentTitle title={"LFS View Value Labels"}>
                <>
                    <ONSTextInput value={this.state.search} label={"Filter by Label Name"}
                                  onChange={this.handleSearch}/>
                    <ONSButton label={"Search"} primary={true} small={false} field={true}
                               onClick={this.getSingleVariableDefinitionData}/>
                    <ONSButton label={"View All"} primary={false} small={false} field={true}
                               onClick={this.viewAll}/>
                    <ONSAccordionTable data={this.state.filteredData} Row={ValueLabelTableRow}
                                       expandedRowEnabled={false}
                                       noDataMessage={this.noDataMessage}
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
                Unknown
            </td>
            <td className="table__cell ">
                {row.name}
            </td>
            <td className="table__cell ">
                {row.label}
            </td>
            <td className="table__cell ">
                {row.value}
            </td>
            <td className="table__cell ">
                {moment(row.last_updated).format('L')}
                {}
            </td>

        </>
    )
};

