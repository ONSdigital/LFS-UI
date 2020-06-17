import React from "react";
import {BATCH_HEADERS} from "../../utilities/Headers";
import {ONSAccordionTable} from "../../components/ONS_DesignSystem/ONSAccordionTable";
import {getUploadStatusStyle, monthNumberToString} from "../../utilities/Common_Functions";
import {ONSStatus} from "../../components/ONS_DesignSystem/ONSStatus";
import {Link} from "react-router-dom";

interface Props {
    batchData: [] | null
    batchType: string
    year: string
    period: string
}

export function MonthlyProcessingUploadTable(props: Props) {
    // I've added mock upload data so we can see all the statuses :)
    let mockUploadData: any[] = [
        {
            "id": 2,
            "month": 2,
            "status": 0,
            "type": "GB",
            "week": 5,
            "year": 2013
        },
        {
            "id": 2,
            "month": 2,
            "status": 1,
            "type": "GB",
            "week": 6,
            "year": 2013,
        },
        {
            "id": 2,
            "month": 2,
            "status": 2,
            "type": "GB",
            "week": 7,
            "year": 2013,
        },
        {
            "id": 2,
            "month": 2,
            "status": 3,
            "type": "GB",
            "week": 8,
            "year": 2013,
        },
        {
            "id": 2,
            "month": 2,
            "status": 4,
            "type": "GB",
            "week": 9,
            "year": 2013,
        },
        {
            "id": 2,
            "month": 2,
            "status": 5,
            "type": "NI",
            "week": 0,
            "year": 2013,
        }
    ]
    
    function statusLink(status: number) {
        switch(status) {
            case 0: return "Import"
            case 1: return "View Processing"
            default: return "Re-import"
          } 
    }

    let BatchUploadTableRow = (rowData: any) => {
        let row = rowData.row;
        return (
            <>
                <td className="table__cell ">
                    {row.type}
                </td>
                <td className="table__cell ">
                    {row.type === "NI" ?
                        monthNumberToString(+row.month)
                        :
                        "Week " + row.week
                    }
                </td>
                <td className="table__cell ">
                    <ONSStatus label={getUploadStatusStyle(+row.status).text} small={false}
                               status={getUploadStatusStyle(+row.status).colour}/>
                </td>
                <td className="table__cell ">
                    <Link
                        className={"breadcrumb__linkbreadcrumb__link"}
                        to={"/survey-import/" + row.type.toLowerCase() + "/" + row.week + "/" + row.month + "/" + row.year}>
                        {statusLink(row.status)}
                    </Link>
                </td>
                {
                    row.status === 0 ?
                        <td className="table__cell "/>
                        :
                        <td className="table__cell ">
                            {/* This link goes nowhere atm */}
                            <Link to="">Summary</Link>
                        </td>
                }
            </>
        );
    };

    return (
        <ONSAccordionTable Headers={BATCH_HEADERS}
                           data={props.batchData}
                           Row={BatchUploadTableRow}
                           expandedRowEnabled={false}
                           noDataMessage={"No Data"}
        />
    );
}