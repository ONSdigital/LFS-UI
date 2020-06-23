import React from "react";
import {ONSAccordionTable} from "./ONS_DesignSystem/ONSAccordionTable";
import {RUNNING_STEP_HEADERS} from "../utilities/Headers";
import { Link } from "react-router-dom";
import { ONSStatus } from "./ONS_DesignSystem/ONSStatus";
import {getBatchProgressStatusStyle} from '../utilities/Common_Functions';

interface Props {
    running: boolean
}

interface Header {
    label: string
    column_name: string
    filter: boolean
    order: boolean
    descending?: boolean | undefined
}

interface DashboardTableRow {
    step: number
    stepName: string
    status: string
}

export function RunningStepsTable () {
    let noDataMessage = "No data matching this criteria";
    

    let StepsTableRow = (rowData: any) => {
        let row: DashboardTableRow = rowData.row;
        return (
            <>
                <td className="table__cell ">
                    {row.step}
                </td>
                <td className="table__cell ">
                    {row.stepName}
                </td>
                <td className="table__cell ">
                    <ONSStatus label={row.status} status={getBatchProgressStatusStyle(row.status).colour} small={true}></ONSStatus>
                </td>
                <td className="table__cell ">
                    {/* This would come from the api */}
                    Time Started
                </td>
                <td className="table__cell ">
                    {/* This would also have to come from the api */}
                    Time Ended
                </td>
                <td className="table__cell ">
                    {/* This doesnt go anywhere until the next story is complete */}
                    <Link to="">View Report</Link>
                </td>
            </>
        )
    };

    return (
        <ONSAccordionTable data={runStepsData} Row={StepsTableRow} 
                            expandedRowEnabled={false}
                            noDataMessage={noDataMessage}
                            pagination={false}
                            Headers={RUNNING_STEP_HEADERS}/>
        );
    
}

const runStepsData =  [
    {"step": 1, "stepName": "Validate postcode", "status": "Completed", "Start Time": "", "End Time": ""},
    {"step": 2, "stepName": "Calculate derived variables (block 1)", "status": "Running", "Start Time": "", "End Time": ""},
    {"step": 3, "stepName": "SOC Probabablistic Mapping (new to old)", "status": "Failed", "Start Time": "", "End Time": ""},
    {"step": 4, "stepName": "ISOC Probabablistic Mapping (new to old)", "status": "Not Run", "Start Time": "", "End Time": ""},
    {"step": 5, "stepName": "Calculate eurostat and ad-hoc DV's (block 1)", "status": "Not Run", "Start Time": "", "End Time": ""},
]