import React, {Component} from "react";
import {ONSAccordionTable} from "../../components/ONS_DesignSystem/ONSAccordionTable";
import {REFERENCE_FILE_IMPORT_HEADERS} from "../../utilities/Headers";
import {ONSStatus} from "../../components/ONS_DesignSystem/ONSStatus";
import {Link} from "react-router-dom";
import dateFormatter from "dayjs";

interface Props {

}

export class ImportOutputSpecTable extends Component <{}, {}> {
    displayName = ImportOutputSpecTable.name;

    imports = [
        {name: "APS Person Variable Specification", "status": "Imported"},
        {name: "APS Household Variable Specification", "status": "Imported"},
        {name: "Eurostat Variable Specification", "status": "Not Imported"},
        {name: "LFS Household Variable Specification", "status": "File Older than One year"},
        {name: "LFS Person Variable Specification", "status": "Imported"}

    ];

    outputSpecTableRow = (rowData: any) => {
        let row = rowData.row;
        let link = "/import/" + row.name;
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

    render() {
        return (
            <div>
                <ONSAccordionTable Headers={REFERENCE_FILE_IMPORT_HEADERS}
                                   data={this.imports}
                                   Row={this.outputSpecTableRow}
                                   expandedRowEnabled={false}
                                   noDataMessage={"No Data"}/>
            </div>
        );
    }
}