import React, {Component} from "react";
import {ONSAccordionTable} from "./ONS_DesignSystem/ONSAccordionTable";
import {getStatusStyle} from "../utilities/Common_Functions";
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
                               pagination={true} paginationSize={5}
                               Headers={DASHBOARD_HEADERS}/>
        );
    }
}

const DashboardTableRow = (rowData: any) => {
    let row: DashboardTableRow = rowData.row;
    let manageUrl: string = "/manage-batch/" + row.type.toLowerCase() + "/" + row.year + "/" + row.period
    let progressUrl: string = "/processing/" + row.type.toLowerCase() + "/" + row.year + "/" + row.period
    return (
        <>
            <td className="table__cell ">
                {row.type}
            </td>
            <td className="table__cell ">
                {row.fullPeriod.substring(0, 3) + row.fullPeriod.substring(row.fullPeriod.length - 5)}
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
                {progress(row.status, progressUrl)}
                
            </td>
            <td className="table__cell ">
                <Link to={manageUrl}>
                    Manage
                </Link>
            </td>
        </>
    );
};

function progress (status: string, url: string) {
    if(Number(status) === 1) return <Link to={url}>Progress</Link>
}