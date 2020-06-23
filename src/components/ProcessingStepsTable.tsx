import React, {Component} from "react";
import {ONSAccordionTable} from "./ONS_DesignSystem/ONSAccordionTable";
import {PROCESSING_STEP_HEADERS} from "../utilities/Headers";

interface DashboardTableRow {
    step: number
    stepName: string
}

export class ProcessingStepsTable extends Component {
    noDataMessage = "No data matching this criteria";

    render() {
        return (
            <ONSAccordionTable data={stepsData} Row={StepsTableRow} 
                               expandedRowEnabled={false}
                               noDataMessage={this.noDataMessage}
                               pagination={false}
                               Headers={PROCESSING_STEP_HEADERS}/>
        );
    }
}

const StepsTableRow = (rowData: any) => {
    let row: DashboardTableRow = rowData.row;
    return (
        <>
            <td className="table__cell ">
                {row.step}
            </td>
            <td className="table__cell ">
                {row.stepName}
            </td>
        </>
    );
};

const stepsData =  [
        {"step": 1, "stepName": "Validate postcode"},
        {"step": 2, "stepName": "Calculate derived variables (block 1)"},
        {"step": 3, "stepName": "SOC Probabablistic Mapping (new to old)"},
        {"step": 4, "stepName": "ISOC Probabablistic Mapping (new to old)"},
        {"step": 5, "stepName": "Calculate eurostat and ad-hoc DV's (block 1)"},
    ]