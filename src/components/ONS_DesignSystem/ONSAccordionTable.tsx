import React, {Component, Fragment} from "react";
import {ONSPanel} from "./ONSPanel";
import update from "immutability-helper";
import {ONSPagination} from "./ONSPagination";
import uuidv4 from "uuid/v4";
import "./ONSAccordionTable.css";
import lodash from "lodash";

interface Props {
    Headers: Header[]
    data: any[] | null
    id?: string
    Row: any
    // Is expanded row enabled
    expandedRowEnabled: boolean
    // The Row to show when expanded
    expandedRow?: any
    // Is the expandedRow additional rows for the table, this is so the table is formatted correctly
    expandedAdditionalRows?: boolean
    noDataMessage: string
    pagination?: boolean
    paginationSize?: number
    scrollable?: boolean
    caption?: string
}

interface State {
    data: any[]
    slicedData: any[]
    offset: number
    Headers: Header[]
}

interface DashboardTableRow {
    id: number
    type: string
    period: string
    status: string
    year: number,
    rowExpanded: boolean
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

        this.state = {data: [], offset: 0, slicedData: [], Headers: props.Headers};
    }

    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        if (nextProps.data !== null && nextProps.data.length !== prevState.data.length) {
            return {
                data: nextProps.data,
                slicedData: nextProps.data.slice(0, nextProps.paginationSize !== undefined ? nextProps.paginationSize : 20)
            };
        } else return null;
    }

    pageChange = (offset: number, listLength: number) => {
        this.setState({offset: offset});
        let slicedData: any[] = this.state.data.slice(offset, offset + listLength);

        // Dont think is needed and removed as couldn't test, would only fail if the slice breaks (we think!!!!!)
        // if (slicedData !== null) {
        this.setState({
            slicedData: slicedData
        });
        // }
    };

    handleClickOnRow = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: any, index: number) => {
        if (this.props.expandedRowEnabled) {
            row.rowExpanded = !row.rowExpanded;
            // @ts-ignore
            this.setState({data: update(this.state.data, {[index]: {$set: row}})});
        }
    };

    handleEnterKeyPressOnRow = (onClick: any, row: DashboardTableRow, index: number) => {
        if (onClick.key === "Enter") {
            this.handleClickOnRow(onClick, row, index);
        }
    };

    orderByRow = (onClick: any, header: any, index: number) => {
        let list = lodash.sortBy(this.state.data, header.column_name);
        if (header.descending) list = list.reverse();

        this.setState({data: list});
        if (this.props.pagination) {
            let slicedList = list.slice(this.state.offset, this.props.paginationSize !== undefined ? this.props.paginationSize : 20);
            this.setState({slicedData: slicedList});
        } else {
            this.setState({slicedData: list});
        }

        header.descending = !header.descending;
        // @ts-ignore
        this.setState({Headers: update(this.state.Headers, {[index]: {$set: header}})});
    };

    Table = () => {
        return (
            <table id="basic-table" className="table table--sortable" data-aria-sort="Sort by" data-aria-asc="ascending"
                   data-aria-desc="descending">
                <>
                    {this.props.caption && <caption className="table__caption">{this.props.caption}</caption>}
                    <thead className="table__head">
                    <tr className="table__row">
                        {
                            this.props.expandedRowEnabled &&
                            <th key={0} scope="col" className="table__header " aria-sort="none"/>
                        }
                        {
                            this.props.Headers.map((header: any, index: number) =>
                                header.order ?
                                    <th key={index} scope="col" className="table__header "
                                        aria-sort={header.descending === undefined ? "none" : (header.descending ? "descending" : "ascending")}>
                                        <button aria-label={"Sort by " + header.label} type="button" data-index={index}
                                                className="table__sort-button"
                                                onClick={(e) => this.orderByRow(e, header, index)}>
                                            {header.label}
                                        </button>
                                    </th>
                                    :
                                    <th key={index} scope="col" className="table__header ">{header.label}</th>
                            )
                        }
                    </tr>
                    </thead>
                    <tbody className={"table__body " + (this.props.expandedRowEnabled ? "expandedRowEnabled " : "")}>
                    {
                        this.state.data !== null && this.state.data.length !== 0 ?
                            this.state.slicedData.map((row: DashboardTableRow, index: number) =>
                                <Fragment key={uuidv4()}>
                                    <tr className={("table__row " + (this.props.expandedRowEnabled ? "selectableTableRow" : "nonSelectableTableRow"))}
                                        onClick={((e) => this.handleClickOnRow(e, row, index))}
                                        tabIndex={0}
                                        title="Click to Expand"
                                        onKeyPress={((e => this.handleEnterKeyPressOnRow(e, row, index)))}>
                                        {
                                            this.props.expandedRowEnabled &&
                                            <td className="table__cell ">
                                                <div className={"accordion-table-chevron "}>
                                                    <img
                                                        className={"accordion-table-chevron-svg " + (row.rowExpanded ? "accordion-table-chevron-rotate" : "")}
                                                        src={"/img/icons--chevron-right.svg"}
                                                        alt="Expanded Table chevron"/>
                                                </div>
                                            </td>
                                        }
                                        <this.props.Row row={row}/>
                                    </tr>
                                    {
                                        this.props.expandedRowEnabled && (
                                            this.props.expandedAdditionalRows ? (
                                                // Additional Hidden Rows for table being passed in
                                                row.rowExpanded &&
                                                <this.props.expandedRow row={row}/>
                                            ) : (
                                                // ExpandedRow not table rows so its styled accordingly
                                                <tr hidden={!row.rowExpanded}>
                                                    <td className="table__cell expandedRow"/>
                                                    <td colSpan={this.props.Headers.length}
                                                        className="table__cell expandedRow">
                                                        <this.props.expandedRow row={row}/>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    }
                                </Fragment>
                            )
                            :
                            <tr>
                                <td colSpan={this.props.Headers.length + (this.props.expandedRowEnabled ? 1 : 0)}
                                    className="table__cell ">
                                    <ONSPanel
                                        status={(this.props.noDataMessage.toLowerCase().includes("error") ? "error" : "info")}
                                        label={"No Batches Matching the Criteria"}>
                                        <p>{this.props.noDataMessage}</p>
                                    </ONSPanel>
                                </td>
                            </tr>
                    }
                    </tbody>
                </>
            </table>
        );
    };

    render() {
        return (
            <>
                {
                    this.props.scrollable ?
                        <>
                            <ONSPanel label={" "}>
                                {"Scrollable table. There are " + this.props.Headers.length + " columns in this table. Some of the table may be off screen. Scroll or drag horizontally to bring into view. "}
                            </ONSPanel>
                            <div className="table-scrollable table-scrollable--on">
                                <div className="table-scrollable__content" tabIndex={0} role="region"
                                     aria-label={"Scrollable table. There are " + this.props.Headers.length + " columns in this table. Some of the table may be off screen. Scroll or drag horizontally to bring into view. "}>
                                    <br/>

                                    <this.Table/>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <this.Table/>
                        </>
                }
                {this.props.pagination &&
                <ONSPagination
                    listLength={(this.props.paginationSize !== undefined ? this.props.paginationSize : 20)}
                    count={this.state.data.length}
                    pageChange={this.pageChange}/>
                }
            </>
        );
    }
}
