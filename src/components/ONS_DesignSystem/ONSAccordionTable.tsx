import React, {Component, Fragment} from 'react';
import {ONSPanel} from "./ONSPanel";
import update from 'immutability-helper';
import {ONSPagination} from "./ONSPagination";

interface Props {
    Headers: Header[]
    data: any[] | null
    Row: any
    expandedRowEnabled: boolean
    expandedRow?: any
    noDataMessage: string
    pagination?: boolean
    paginationSize?: number
}

interface State {
    data: any[]
    slicedData: any[]
    offset: number
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
    label: string
    column_name: string
    filter: boolean
    order: boolean
}

export class ONSAccordionTable extends Component <Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {data: [], offset: 0, slicedData: []};
    }

    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        if (nextProps.data !== prevState.data && nextProps.data !== null) {
            return {data: nextProps.data, slicedData: nextProps.data.slice(0, 20)};
        } else return null;
    }

    pageChange = (offset: number, steps: number) => {
        this.setState({offset: offset});
        console.log(offset)
        console.log(steps)
        if (this.props.data === null) return;
        let slicedData: any[] = this.state.data.slice(offset, offset+steps);
        console.log(slicedData)
        if (slicedData !== null) {
            console.log("sfjhalshfdlaksjh ")
            this.setState({
                slicedData: slicedData
            })
        }
        // this.props.pageChange(offset, steps)
    };

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
            <>
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
                            this.state.data !== null && this.state.data.length !== 0 ?
                                this.state.slicedData.map((row: DashboardTableRow, index: number) =>
                                    <Fragment key={(this.props.expandedRowEnabled ? row.id : index)}>
                                        <tr className="table__row selectableTableRow"
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
                {this.props.pagination ?
                    <ONSPagination steps={(this.props.paginationSize !== undefined ? this.props.paginationSize: 20)} count={this.state.data.length} pageChange={this.pageChange}/>
                    :
                    <br/>
                }

            </>
        );
    }
}


