import React, {Component} from 'react';
import {ONSAccordionTable} from "./ONS_DesignSystem/ONSAccordionTable";
import {getStatusStyle, monthNumberToString} from "../utilities/Common_Functions";
import {ONSStatus} from "./ONS_DesignSystem/ONSStatus";
import {ONSButton} from "./ONS_DesignSystem/ONSButton";
import {VARIABLE_DEFINITION_HEADERS} from "../utilities/Headers";

interface Props {
    Headers?: string[],
    data: [] | null
}

interface State {
    data: []
}

interface VarDefTableRow {
    id: number
    variable: string
    description: string
    type: string
    // TODO: Check date types for React
    valid_from: string
    length: number
    precision: number
    alias: string
    editable: string
    imputation: string
}

export class VariableDefinitionTable extends Component <Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {data: []};
    }

    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        if (nextProps.data !== prevState.data) {
            return {data: nextProps.data};
        } else return null;
    }

    noDataMessage = "No Variable Definitions matching this criteria";

    render() {
        return (
            <ONSAccordionTable data={this.state.data} Row={VarDefTableRow} expandedRowEnabled={false} noDataMessage={this.noDataMessage} Headers={VARIABLE_DEFINITION_HEADERS}/>
        );
    }
}

const VarDefTableRow = (rowData: any) => {
    let row: VarDefTableRow = rowData.row;
    return (
        <>
            <td className="table__cell ">
                {row.id}
            </td>
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
                {row.valid_from}
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
                {row.editable}
            </td>
            <td className="table__cell ">
                {row.imputation}
            </td>

                {/*<ONSStatus label={getStatusStyle(+row.status).text} small={false}*/}
                {/*           status={getStatusStyle(+row.status).colour}/>*/}
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

