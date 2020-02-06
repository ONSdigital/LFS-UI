import React from "react";
import {REFERENCE_FILE_IMPORT_HEADERS} from "../../utilities/Headers";
import {ONSAccordionTable} from "../../components/ONS_DesignSystem/ONSAccordionTable";
import {ONSStatus} from "../../components/ONS_DesignSystem/ONSStatus";
import {Link} from "react-router-dom";
import dateFormatter from "dayjs";

export function ImportFileTable() {
    let imports = [
        {id: 1, name: "APS Design Weights", "status": "Imported"},
        {id: 2, name: "Bulk Amendments", "status": "Not Imported"},
        {id: 3, name: "Geographical Classifications", "status": "File Older than One year"},
        {id: 4, name: "Output Specification", "status": "Not Imported"},
        {id: 5, name: "Population Estimates", "status": "Not Imported"},
        {id: 6, name: "Value Labels", "status": "Imported"},
        {id: 7, name: "Variable Definitions", "status": "Imported"}
    ];

    let BatchUploadTableRow = (rowData: any) => {
        let row = rowData.row;
        let link = "/import/" + row.name;
        if (row.name === "Output Specification") link = "/import/Output";
        return (
            <>
                <td className="table__cell ">
                    {row.name}
                </td>
                <td className="table__cell ">
                    {dateFormatter(new Date()).format("DD/MM/YYYY")}
                </td>
                <td className="table__cell ">
                    <ONSStatus label={row.status} small={false} status={"info"}/>
                </td>
                <td className="table__cell ">
                    <Link
                        className={"breadcrumb__link"}
                        to={link}>
                        Import
                    </Link>
                </td>
            </>
        );
    };

    return (
        <ONSAccordionTable Headers={REFERENCE_FILE_IMPORT_HEADERS}
                           data={imports}
                           Row={BatchUploadTableRow}
                           expandedRowEnabled={false}
                           noDataMessage={"No Data"}/>
    );
}