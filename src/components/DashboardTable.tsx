import React, {Component, Fragment} from 'react';
import {ONSStatus} from "./ONSStatus";
import {ONSPanel} from "./ONSPanel";
import update from 'immutability-helper';
import {getStatusStyle, monthNumberToString} from "../utilities/Common_Functions";
import {ONSButton} from "./ONSButton";

interface Props {
    Headers?: string[],
    data: [] | null
}

interface State {
    data: []
}

interface DashboardTableRow {
    id: number
    type: string
    period: string
    status: string
    year: number,
    expanded: boolean
}

export class DashboardTable extends Component <Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {data: []};
    }

    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        if (nextProps.data !== prevState.data) {
            return {data: nextProps.data};
        } else return null;
    }

    handleClickOnRow = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: DashboardTableRow, index: number) => {
        row.expanded = !row.expanded;
        // @ts-ignore
        this.setState({data: update(this.state.data, {[index]: {$set: row}})})
    };

    handleEnterKeyPressOnRow = (onClick: any, row: DashboardTableRow, index: number) => {
        if (onClick.key === 'Enter') {
            this.handleClickOnRow(onClick, row, index);
        }
    };

    render() {
        return (
            <table id="basic-table" className="table ">
                <>
                    <thead className="table__head">
                    <tr className="table__row">
                        <th scope="col" className="table__header ">Batch ID</th>
                        <th scope="col" className="table__header ">Batch Type</th>
                        <th scope="col" className="table__header ">Period</th>
                        <th scope="col" className="table__header ">Year</th>
                        <th scope="col" className="table__header ">Status</th>
                    </tr>
                    </thead>
                    <tbody className="table__body">
                    {
                        this.props.data !== null && this.props.data.length !== 0 ?
                            this.state.data.map((row: DashboardTableRow, index: number) =>
                                <Fragment key={row.id}>
                                    <tr className="table__row selectableTableRow"
                                        onClick={((e) => this.handleClickOnRow(e, row, index))}
                                        tabIndex={0}
                                        onKeyPress={((e => this.handleEnterKeyPressOnRow(e, row, index)))}>
                                        <td className="table__cell ">
                                            {row.id}
                                        </td>
                                        <td className="table__cell ">
                                            {row.type}
                                        </td>
                                        <td className="table__cell ">
                                            {row.type === "Monthly" ?
                                                monthNumberToString(+row.period)
                                                :
                                                row.period
                                            }
                                        </td>
                                        <td className="table__cell ">
                                            {row.year}
                                        </td>
                                        <td className="table__cell ">

                                            <ONSStatus label={getStatusStyle(+row.status).text} small={false}
                                                       status={getStatusStyle(+row.status).colour}/>
                                        </td>
                                    </tr>
                                    <tr hidden={!row.expanded}>
                                        <td colSpan={5} className="table__cell ">
                                            <ONSButton label={"Manage Batch"} primary={true} small={false} onClick={() => {
                                                window.location.href = "/View_Monthly_Batch/" + row.type.toLowerCase() + "/" + row.year + "/" + row.period
                                            }}/>
                                        </td>
                                    </tr>
                                </Fragment>
                            )
                            :
                            <tr>
                                <td colSpan={5} className="table__cell ">
                                    <ONSPanel label={'No Batches Matching the Criteria'}>
                                        <p>No Batches matching this criteria</p>
                                    </ONSPanel>
                                </td>
                            </tr>
                    }
                    </tbody>
                </>
            </table>
        );
    }
}


