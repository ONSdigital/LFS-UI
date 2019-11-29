import React from 'react';
import {BATCH_HEADERS} from "../../utilities/Headers";
import {ONSAccordionTable} from "../../components/ONS_DesignSystem/ONSAccordionTable";
import {getStatusStyle, monthNumberToString} from "../../utilities/Common_Functions";
import {ONSStatus} from "../../components/ONS_DesignSystem/ONSStatus";
import {Link} from "react-router-dom";
import {ONSButton} from "../../components/ONS_DesignSystem/ONSButton";

interface Props {
    batchData: [] | null
    openModel: Function
    batchType: string
    year: string
    period: string
}

export function MonthlyBatchUploadTable(props: Props) {

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
                    <ONSStatus label={getStatusStyle(+row.status).text} small={false}
                               status={getStatusStyle(+row.status).colour}/>
                </td>
                <td className="table__cell ">
                    <Link
                        to={"/surveyUpload/" + row.type.toLowerCase() + "/" + row.week + "/" + row.month + "/" + row.year}>
                        <ONSButton id={"import-" + row.week + "-" + row.month + "-" + row.year} label={"Import"} primary={false} small={true}/>
                    </Link>
                </td>
                {
                    row.status === 0 ?
                        <td className="table__cell "/>
                        :
                        <td className="table__cell ">
                            <ONSButton label={"Summary"} primary={true} small={true}
                                       onClick={(() => props.openModel(row))}/>
                        </td>
                }
            </>
        )
    };

    return (
        <ONSAccordionTable Headers={BATCH_HEADERS}
                           data={props.batchData}
                           Row={BatchUploadTableRow}
                           expandedRowEnabled={false}
                           noDataMessage={"No Data"}/>
    )
}