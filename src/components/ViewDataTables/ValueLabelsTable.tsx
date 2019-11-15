import React, {Component} from 'react';
import {ONSAccordionTable} from "../ONS_DesignSystem/ONSAccordionTable";
import {VALUE_LABELS_HEADERS} from "../../utilities/Headers";
import DocumentTitle from "react-document-title";
import moment from "moment";
import {getValueLables} from "../../utilities/http";

interface Props {
}

interface State {
    data: []
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
        this.state = {data: []};
        this.getVariableDefinitionData();
    }

    getVariableDefinitionData = () => {
        getValueLables()
            .then(r => {
                console.log(r);
                this.setState({data: r});
            })
            .catch(error => {
                console.log(error);
            });
    };

    noDataMessage = "No Value Labels matching this criteria";

    render() {
        return (
            <DocumentTitle title={"LFS View Value Labels"}>
                <ONSAccordionTable data={this.state.data} Row={ValueLabelTableRow}
                                   expandedRowEnabled={false}
                                   noDataMessage={this.noDataMessage}
                                   Headers={VALUE_LABELS_HEADERS}
                                   pagination={true}
                                   paginationSize={20}
                                   scrollable={true}/>
            </DocumentTitle>
        );
    }
}

const ValueLabelTableRow = (rowData: any) => {
    let row: ValueLabelTableRow = rowData.row;
    return (
        <>
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
                {row.source}
            </td>
            <td className="table__cell ">
                {row.type}
            </td>
            <td className="table__cell ">
                {moment(row.last_updated).format('L')}
                {}
            </td>

        </>
    )
};

