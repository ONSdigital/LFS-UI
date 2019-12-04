import React, {Component} from "react";
import {ONSAccordionTable} from "../components/ONS_DesignSystem/ONSAccordionTable";
import {BATCH_PROGRESS_TABLE} from "../utilities/Headers"
import {ONSStatus} from "../components/ONS_DesignSystem/ONSStatus";
import {getBatchProgressStatusStyle} from '../utilities/Common_Functions';

interface Props {

}

interface State {
    data: []

}


export class BatchProgressTable extends Component <Props, State> {

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



    BatchProgressRow = (rowData: any) => {
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
                <h4>Batch Progress</h4>
                <div style={{width: "60%"}}>
                    <ONSAccordionTable Headers={BATCH_PROGRESS_TABLE}
                                       data={this.state.data}
                                       Row={this.BatchProgressRow}
                                       expandedRowEnabled={false}
                                       noDataMessage={"No Data"}/>
                </div>
            </>
        )
    }
}