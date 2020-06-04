import React, {Component} from "react";
import {ONSAccordionTable} from "./ONS_DesignSystem/ONSAccordionTable";
import {getStatusStyle, monthNumberToString} from "../utilities/Common_Functions";
import {ONSStatus} from "./ONS_DesignSystem/ONSStatus";
import {DASHBOARD_HEADERS} from "../utilities/Headers";
import {Link} from "react-router-dom";

interface Props {
    Headers?: string[],
    data: any[] | null
}

interface State {
    data: []
}

interface DashboardTableRow {
    type: string
    fullPeriod: string
    status: string
    user: number
    year: number
    period: number
}

export class HomeBatchTable extends Component <Props, State> {

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
            <ONSAccordionTable data={this.state.data} Row={DashboardTableRow} 
                               expandedRowEnabled={false}
                               noDataMessage={this.noDataMessage}
                               Headers={DASHBOARD_HEADERS}/>
        );
    }
}

const DashboardTableRow = (rowData: any) => {
    let row: DashboardTableRow = rowData.row;
    return (
        <>
            <td className="table__cell ">
                {row.type}
            </td>
            <td className="table__cell ">
                {row.fullPeriod}
            </td>
            <td className="table__cell ">
                <ONSStatus label={getStatusStyle(+row.status).text} small={false}
                           status={getStatusStyle(+row.status).colour}/>
            </td>
            <td className="table__cell ">
                {/* Users don't exist currently */}
                username
            </td>
            <td className="table__cell ">
                {/* Progress Page does not exist yet also*/}
                <Link to={"/"}>
                    Progress
                </Link>
            </td>
            <td className="table__cell ">
                <Link to={"/manage-batch/" + row.type.toLowerCase() + "/" + row.year + "/" + row.period}>
                    Manage
                </Link>
            </td>
        </>
    );
};