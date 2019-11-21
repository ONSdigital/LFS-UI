import React, {Component} from 'react';
import {ONSAccordionTable} from "./ONS_DesignSystem/ONSAccordionTable";
import {getStatusStyle, monthNumberToString} from "../utilities/Common_Functions";
import {ONSStatus} from "./ONS_DesignSystem/ONSStatus";
import {ONSButton} from "./ONS_DesignSystem/ONSButton";
import {DASHBOARD_HEADERS} from "../utilities/Headers";
import {Link} from "react-router-dom";

interface Props {
    Headers?: string[],
    data: [] | null
}

interface State {
    data: []
}

interface DashboardTableRow {
    id: number
    type: string
    period: string
    status: string
    year: number,
    expanded: boolean
}

export class DashboardTable extends Component <Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {data: []};
    }

    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        if (nextProps.data !== prevState.data) {
            return {data: nextProps.data};
        } else return null;
    }

    noDataMessage = "No Batches matching this criteria";

    render() {
        return (
            <ONSAccordionTable data={this.state.data} Row={DashboardTableRow} expandedRowEnabled={true} expandedRow={DashboardExpandedRow} noDataMessage={this.noDataMessage} Headers={DASHBOARD_HEADERS}/>
        );
    }
}

const DashboardTableRow = (rowData: any) => {
    let row: DashboardTableRow = rowData.row;
    return (
        <>
            <td className="table__cell ">
                {row.id}
            </td>
            <td className="table__cell ">
                {row.type}
            </td>
            <td className="table__cell ">
                {row.type === "Monthly" ?
                    monthNumberToString(+row.period)
                    :
                    row.period
                }
            </td>
            <td className="table__cell ">
                {row.year}
            </td>
            <td className="table__cell ">

                <ONSStatus label={getStatusStyle(+row.status).text} small={false}
                           status={getStatusStyle(+row.status).colour}/>
            </td>
        </>
    )
};

const DashboardExpandedRow = (rowData: any) => {
    let row: DashboardTableRow = rowData.row;
    return (
        <>
            <Link to={"/manage-batch/" + row.type.toLowerCase() + "/" + row.year + "/" + row.period} >
                <ONSButton label={"Manage Batch"} primary={true} small={false} field={true} />
            </Link>
        </>
    )
};

