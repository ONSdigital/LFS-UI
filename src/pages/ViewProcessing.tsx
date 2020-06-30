import React, {Component} from "react";
import {ProcessingProgressTable} from "../components/ProcessingProgressTable";
import {ONSButton} from "../components/ONS_DesignSystem/ONSButton";
import {Link} from "react-router-dom";
import {ONSAccordionTable} from "../components/ONS_DesignSystem/ONSAccordionTable";
import {PROCESSING_HEADERS} from "../utilities/Headers";
import {getStatusStyle, monthNumberToString, fullPeriodPlease} from "../utilities/Common_Functions";
import {ONSStatus} from "../components/ONS_DesignSystem/ONSStatus";

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
    fullPeriod: string
    // expanded: boolean
}

export class ViewProcessing extends Component <Props, State> {
    displayname = ViewProcessing.name;

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
        let fullPeriod = fullPeriodPlease(this.state.period, this.state.year)
        let table: any[] = [{id: 1, year: this.state.year, period: this.state.period, fullPeriod: fullPeriod, type: this.state.type, status:0}]
        let row: DashboardTableRow = table[0]
        let noDataMessage = "No processing matching this criteria";

        return (
            <div className="container">
                <br></br>
                <Link to={"/"}>Previous</Link>
                <br></br>
                <br></br>
                <h1>
                    Processing: <mark>{fullPeriod}</mark>
                </h1>
                <br></br>
                <ONSAccordionTable Headers={PROCESSING_HEADERS} data={table} 
                                expandedRowEnabled={false} Row={DashboardTableRow} 
                                noDataMessage={noDataMessage}/>
                <br></br>

                <ProcessingProgressTable/>
                <br></br>
                <Link to={"/manage-processing/" + row.type.toLowerCase() + "/" + row.year + "/" + this.state.period}>
                    <ONSButton label={"Manage Processing"} primary={true} small={false} field={true}/>
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
                {row.type === "Monthly" ?
                    monthNumberToString(+row.fullPeriod)
                    :
                    row.fullPeriod
                }
            </td>
            <td className="table__cell ">
                <ONSStatus label={getStatusStyle(+row.status).text} small={false}
                           status={getStatusStyle(+row.status).colour}/>
            </td>
            <td className="table__cell ">
                Username
            </td>
        </>
    );
}; 