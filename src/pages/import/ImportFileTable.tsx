import React from "react";
import {REFERENCE_FILE_IMPORT_HEADERS} from "../../utilities/Headers";
import {ONSAccordionTable} from "../../components/ONS_DesignSystem/ONSAccordionTable";
import {ONSStatus} from "../../components/ONS_DesignSystem/ONSStatus";
import {Link} from "react-router-dom";
import {ONSButton} from "../../components/ONS_DesignSystem/ONSButton";
import dateFormatter from "dayjs";

interface Props {

}

export function ImportFileTable() {
    let imports = [
        {name: "APS Design Weights", "status": "Imported"},
        {name: "Geographical Classifications", "status": "File Older than One year"},
        {name: "Variable Definitions", "status": "Imported"},
        {name: "Value Labels", "status": "Imported"},
        {name: "Output Specification", "status": "Not Imported"},
        {name: "Population Estimates", "status": "Not Imported"},
    ];


    let BatchUploadTableRow = (rowData: any) => {
        let row = rowData.row;
        return (
            <>
                <td className="table__cell ">
                    {row.name}
                </td>
                <td className="table__cell ">
                    {dateFormatter(new Date()).format("DD/MM/YYYY")}
                </td>
                <td className="table__cell ">
                    <ONSStatus label={row.status} small={false} status={'info'}/>
                </td>
                <td className="table__cell ">
                    <Link
                        to={"/import/" + row.name}>
                        <ONSButton label={"Import"} primary={false} small={true}/>
                    </Link>
                </td>
            </>
        )
    };

    return (
        <ONSAccordionTable Headers={REFERENCE_FILE_IMPORT_HEADERS}
                           data={imports}
                           Row={BatchUploadTableRow}
                           expandedRowEnabled={false}
                           noDataMessage={"No Data"}/>
    )
}