import React from "react";
import {REFERENCE_FILE_HEADERS} from "../../utilities/Headers";
import {ONSAccordionTable} from "../../components/ONS_DesignSystem/ONSAccordionTable";
import {ONSStatus} from "../../components/ONS_DesignSystem/ONSStatus";
import { Link } from "react-router-dom";
import { getReferenceStatusStyle } from "../../utilities/Common_Functions";

interface Props {
    data: [] | null
}

export function ReferenceFileImportTable(props: Props) {

    let imports = props.data

    let BatchUploadTableRow = (rowData: any) => {
        let row = rowData.row;
        return (
            <>
                <td className="table__cell ">
                    {row.name}
                </td>
                <td className="table__cell ">
                    {row.date}
                </td>
                <td className="table__cell ">
                    <ONSStatus label={getReferenceStatusStyle(+row.status).text} small={false}
                               status={getReferenceStatusStyle(+row.status).colour}/>
                </td>
                <td className="table__cell ">
                    <Link to="/">Re-import</Link>
                </td>
            </>
        );
    };

    return (
        <ONSAccordionTable Headers={REFERENCE_FILE_HEADERS}
                           data={imports}
                           Row={BatchUploadTableRow}
                           expandedRowEnabled={false}
                           noDataMessage={"No Data"}/>
    );
}