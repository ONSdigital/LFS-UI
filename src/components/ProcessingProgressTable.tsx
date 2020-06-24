import React, {Component} from "react";
import {ONSAccordionTable} from "./ONS_DesignSystem/ONSAccordionTable";
import {PROCESSING_PROGRESS_TABLE} from "../utilities/Headers"
import {ONSStatus} from "./ONS_DesignSystem/ONSStatus";
import {getBatchProgressStatusStyle} from '../utilities/Common_Functions';

interface Props {
    width?: number
}

interface State {
    data: []
}

export class ProcessingProgressTable extends Component <Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = (
            {
                data: []
            })
    }

    componentDidMount(): void {
        this.getBatchProgressData()
    }

    getBatchProgressData = () => {
        this.getMockBatchProgressData()
    };

    getMockBatchProgressData = () => {
        fetch('/jsons/MOCK_BATCH_PROGRESS.json')
            .then(response => response.json())
            .then(response => {
                this.setState({data: response.Rows});
            })
    };

    ProcessingProgressRow = (rowData: any) => {
        let row = rowData.row;
        return (
            <>
                <td className="table__cell ">
                    {row.step}
                </td>
                <td className="table__cell ">
                    <ONSStatus label={row.status} small={false}
                               status={getBatchProgressStatusStyle(row.status).colour}/>
                </td>
            </>
        )
    };

    render() {
        return (
            <>
                <h2>Processing Progress</h2>
                <div>
                    <ONSAccordionTable Headers={PROCESSING_PROGRESS_TABLE}
                                       data={this.state.data}
                                       Row={this.ProcessingProgressRow}
                                       expandedRowEnabled={false}
                                       noDataMessage={"No Data"}/>
                </div>
            </>
        )
    }
}