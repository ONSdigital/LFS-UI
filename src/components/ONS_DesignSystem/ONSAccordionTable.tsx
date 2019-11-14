import React, {Component, Fragment} from 'react';
import {ONSPanel} from "./ONSPanel";
import update from 'immutability-helper';

interface Props {
    Headers: Header[],
    data: any[] | null
    Row: any,
    expandedRowEnabled: boolean
    expandedRow?: any,
    noDataMessage: string
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

interface Header {
    label: string,
    column_name: string,
    filter: boolean,
    order: boolean,
}

export class ONSAccordionTable extends Component <Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {data: []};
    }

    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        if (nextProps.data !== prevState.data) {
            return {data: nextProps.data};
        } else return null;
    }

    handleClickOnRow = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: any, index: number) => {
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
                        {
                            this.props.Headers.map((header: any, index: number) =>
                                    <th key={index} scope="col" className="table__header ">{header.label}</th>
                            )
                        }
                    </tr>
                    </thead>
                    <tbody className="table__body">
                    {
                        this.props.data !== null && this.props.data.length !== 0 ?
                            this.state.data.map((row: DashboardTableRow, index: number) =>
                                <Fragment key={(this.props.expandedRowEnabled ? row.id : index)}>
                                    <tr className={("table__row selectableTableRow " + (this.props.expandedRowEnabled ? "itemCursorHover " : ""))}
                                        onClick={((e) => this.handleClickOnRow(e, row, index))}
                                        tabIndex={0}
                                        onKeyPress={((e => this.handleEnterKeyPressOnRow(e, row, index)))}>
                                        <this.props.Row row={row}/>
                                    </tr>
                                    {
                                        this.props.expandedRowEnabled ?
                                            <tr hidden={!row.expanded}>
                                                <td colSpan={this.props.Headers.length} className="table__cell ">
                                                    <this.props.expandedRow row={row}/>
                                                </td>
                                            </tr>
                                            :
                                            <>
                                            </>
                                    }

                                </Fragment>
                            )
                            :
                            <tr>
                                <td colSpan={this.props.Headers.length} className="table__cell ">
                                    <ONSPanel label={'No Batches Matching the Criteria'}>
                                        <p>{this.props.noDataMessage}</p>
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


