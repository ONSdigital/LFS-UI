import React, {Component} from 'react';
import {ONSAccordionTable} from "../ONS_DesignSystem/ONSAccordionTable";
import {VARIABLE_DEFINITION_HEADERS} from "../../utilities/Headers";
import {ONSCheckbox} from "../ONS_DesignSystem/ONSCheckbox";
import DocumentTitle from "react-document-title";
import moment from "moment";
import {getAllVarDefs} from "../../utilities/http";

interface Props {
}

interface State {
    data: []
}

interface VarDefTableRow {
    variable: string
    description: string
    type: string
    validFrom: Date
    length: number
    precision: number
    alias: string
    editable: boolean
    expanded: boolean
    imputation: boolean
    dv: boolean
}

export class VariableDefinitionTable extends Component <Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {data: []};
        this.getVariableDefinitionData();
    }

    getVariableDefinitionData = () => {
        getAllVarDefs()
            .then(r => {
                console.log(r);
                this.setState({data: r});
            })
            .catch(error => {
                console.log(error);
                if (process.env.NODE_ENV === 'development') {
                    this.getMockVarDefData()
                }
            });
    };

    getMockVarDefData = () => {
        fetch('/jsons/MOCK_VAR_DEFS.json')
            .then(response => response.json())
            .then(response => {
                this.setState({data: response.Rows});
            })
    };

    noDataMessage = "No Variable Definitions matching this criteria";

    render() {
        return (
            <DocumentTitle title={"LFS View Variable Definitions"}>
                <ONSAccordionTable data={this.state.data} Row={VarDefTableRow}
                                   expandedRowEnabled={false}
                                   noDataMessage={this.noDataMessage}
                                   Headers={VARIABLE_DEFINITION_HEADERS}
                                   pagination={true}
                                   paginationSize={20}/>
            </DocumentTitle>
        );
    }
}

const VarDefTableRow = (rowData: any) => {
    let row: VarDefTableRow = rowData.row;
    return (
        <>
            <td className="table__cell ">
                {row.variable}
            </td>
            <td className="table__cell ">
                {row.description}
            </td>
            <td className="table__cell ">
                {row.type}
            </td>
            <td className="table__cell ">
                {moment(row.validFrom).format('L')}
                {}
            </td>
            <td className="table__cell ">
                {row.length}
            </td>
            <td className="table__cell ">
                {row.precision}
            </td>
            <td className="table__cell ">
                {row.alias}
            </td>
            <td className="table__cell ">
                <ONSCheckbox id={"editable"} checked={row.editable} disabled={true}/>
            </td>
            <td className="table__cell ">
                <ONSCheckbox id={"expanded"} checked={row.expanded} disabled={true}/>
            </td>
            <td className="table__cell ">
                <ONSCheckbox id={"imputation"} checked={row.imputation} disabled={true}/>
            </td>
            <td className="table__cell ">
                <ONSCheckbox id={"dv"} checked={row.dv} disabled={true}/>
            </td>
        </>
    )
};

// const VarDefExpandedRow = (rowData: any) => {
//     let row: VarDefTableRow = rowData.row;
//     return (
//         <>
//             <ONSButton label={"Manage Batch"} primary={true} small={false} onClick={() => {
//                 window.location.href = "/View_Monthly_Batch/" + row.type.toLowerCase() + "/" + row.year + "/" + row.period
//             }}/>
//         </>
//     )
//
// };

