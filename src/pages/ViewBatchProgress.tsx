import React, {Component} from "react";
import {BatchProgressTable} from "../components/BatchProgressTable";
import {ONSButton} from "../components/ONS_DesignSystem/ONSButton";
import {Link} from "react-router-dom";
import {ONSAccordionTable} from "../components/ONS_DesignSystem/ONSAccordionTable";
import {DASHBOARD_HEADERS} from "../utilities/Headers";
import {getStatusStyle, monthNumberToString, toUpperCaseFirstChar} from "../utilities/Common_Functions";
import {ONSStatus} from "../components/ONS_DesignSystem/ONSStatus";
import {getBatchData, getAllBatches} from "../utilities/http";

interface Props {
    match: any
}

interface State {
    data: []
    year: string
    period: string
    type: string
}

interface DashboardTableRow {
    id: number
    type: string
    period: string
    status: string
    year: number,
    // expanded: boolean
}

export class ViewBatchProgress extends Component <Props, State> {
    displayname = ViewBatchProgress.name;

    constructor(props: any) {
        super(props)

        // let type = toUpperCaseFirstChar(props.match.params.type)
        let type = (props.match.params.type)

        this.state = {
            year: props.match.params.year,
            period: props.match.params.period,
            type: type,

            data: []};
        
    }

    render() {
        let table: any[] = [{id: 1, year: this.state.year, period: monthNumberToString(Number(this.state.period)), type: this.state.type, status:0}]
        let row: DashboardTableRow = table[0]
        let noDataMessage = "No Batches matching this criteria";

        return (
            <div className="container">
                <br></br>
                <Link to={"/"}>Previous</Link>
                <br></br>
                <br></br>
                <h1>Batch ID: {[this.state.type, this.state.year, this.state.period]}</h1>
                {console.log(getBatchData(this.state.type, this.state.year, this.state.period))}
                {/* <h1>Batch ID: {getBatchData(this.state.type, this.state.year, this.state.period)}</h1> */}
                <br></br>
                <ONSAccordionTable Headers={DASHBOARD_HEADERS} data={table} 
                                expandedRowEnabled={false} Row={DashboardTableRow} 
                                noDataMessage={noDataMessage}/>
                <br></br>

                <BatchProgressTable/>
                <br></br>
                <Link to={"/manage-batch/" + row.type.toLowerCase() + "/" + row.year + "/" + row.period}>
                    <ONSButton label={"Manage Batch"} primary={true} small={false} field={true}/>
                </Link>
            </div>
        );
    }
};    

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
    );
};