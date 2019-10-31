import React, {Component, Fragment} from 'react';
import {ONSStatus} from "./ONSStatus";
import {ONSPanel} from "./ONSPanel";
import update from 'immutability-helper';

interface Props {
    Headers?: string[],
    data: [] | null
}

interface State {
    data: []
}

interface DashboardTableRow {
    BatchID: number
    batchtype: string
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
                                <Fragment key={row.BatchID}>
                                    <tr className="table__row"
                                        onClick={((e) => this.handleClickOnRow(e, row, index))}
                                         tabIndex={0}
                                        onKeyPress={((e => this.handleEnterKeyPressOnRow(e, row, index)))}>
                                        <td className="table__cell ">
                                            {row.BatchID}
                                        </td>
                                        <td className="table__cell ">
                                            {row.batchtype}
                                        </td>
                                        <td className="table__cell ">
                                            {row.period}
                                        </td>
                                        <td className="table__cell ">
                                            {row.year}
                                        </td>
                                        <td className="table__cell ">
                                            <ONSStatus label={row.status} small={false}
                                                       status={row.status}/>
                                        </td>
                                    </tr>
                                    <tr hidden={!row.expanded}>
                                        <td colSpan={5} className="table__cell ">
                                            <ONSPanel label={'sds'}>
                                                {row.status}
                                            </ONSPanel>
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


