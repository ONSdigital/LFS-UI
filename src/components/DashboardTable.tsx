import React, {Component} from 'react';
import update from 'immutability-helper';
import {ONSAccordionTable} from "./ONSAccordionTable";

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
            <ONSAccordionTable data={this.state.data}/>
        );
    }
}


