import React, {ChangeEvent, Component} from 'react';
import {DashboardTable} from "../components/DashboardTable";
import {ONSRadioButton} from "../components/ONSRadioButton";
import {ONSCheckbox} from "../components/ONSCheckbox";


interface State {
    batchData: [] | null,
    filteredBatchData: [] | null,
    batchType: string,
    liveStatus: boolean,
    monthlyBatchFilter: boolean,
    quarterlyBatchFilter: boolean,
    yearlyBatchFilter: boolean
}

export class Dashboard extends Component <{}, State> {
    displayName = Dashboard.name;

    constructor(props: any) {
        super(props);
        this.state = {
            batchData: [],
            filteredBatchData: [],
            batchType: "live",
            liveStatus: true,
            monthlyBatchFilter: true,
            quarterlyBatchFilter: true,
            yearlyBatchFilter: true
        };
        this.getBatchData();
    }

    getBatchData = () => {
        fetch('/jsons/MOCK_RUNS.json')
            .then(response => response.json())
            .then(response => {
                this.setState({batchData: response.Rows});
                this.filterBatchData();
            })
    };

    filterListByStatus = (row: any): boolean => {
        if (this.state.batchType === 'completed') {
            return (row.status === 'Completed')
        }
        return (row.status !== 'Completed')
    };

    filterListByBatchType = (row: any): boolean => {
        let monthly = false;
        let quarterly = false;
        let yearly = false;
        if (this.state.monthlyBatchFilter) {
            monthly = (row.batchtype === 'Monthly')
        }
        if (this.state.quarterlyBatchFilter) {
            quarterly = (row.batchtype === 'Quarterly')
        }
        if (this.state.yearlyBatchFilter) {
            yearly = (row.batchtype === 'Yearly')
        }
        return monthly || quarterly || yearly;
    };

    filterBatchData = () => {
        if (this.state.batchData !== null) {
            let filteredList: any = this.state.batchData.filter(this.filterListByBatchType);
            filteredList = filteredList.filter(this.filterListByStatus);
            if (filteredList !== null) {
                this.setState({filteredBatchData: filteredList})
            }
        }
    };

    handleBatchTypeRadioChange = async (e: ChangeEvent<HTMLInputElement>) => {
        let liveStatusFilter = false;
        if (e.target.value === 'live') {
            liveStatusFilter = true;
        }
        await this.setState({batchType: e.target.value, liveStatus: liveStatusFilter});
        this.filterBatchData();
    };

    handleMonthlyBatchFilterChange = async () => {
        await this.setState({monthlyBatchFilter: !this.state.monthlyBatchFilter});
        this.filterBatchData();
    };

    handleQuarterlyBatchFilterChange = async () => {
        await this.setState({quarterlyBatchFilter: !this.state.quarterlyBatchFilter});
        this.filterBatchData();
    };

    handleYearlyBatchFilterChange = async () => {
        await this.setState({yearlyBatchFilter: !this.state.yearlyBatchFilter});
        this.filterBatchData();
    };

    filterOptionStyle = {marginRight: '.5rem', minWidth: '15rem'};

    render() {
        return (
            <div className="container">
                <fieldset className="fieldset">
                    <legend className="fieldset__legend">Filter Batches</legend>
                    <p className="checkboxes__label">Batch Status</p>
                    <span className="radios__items">
                        <ONSRadioButton label={'Live'} onChange={this.handleBatchTypeRadioChange}
                                        id={"live"}
                                        checked={this.state.liveStatus}
                                        style={this.filterOptionStyle}/>
                        <ONSRadioButton label={'Completed'}
                                        onChange={this.handleBatchTypeRadioChange}
                                        id={'completed'}
                                        checked={!this.state.liveStatus}
                                        style={this.filterOptionStyle}/><br/>
                    </span>
                    <p className="checkboxes__label">Batch Type</p>
                    <span className="checkboxes__items">
                        <ONSCheckbox onChange={this.handleMonthlyBatchFilterChange}
                                     label={'Monthly'}
                                     checked={this.state.monthlyBatchFilter}
                                     id={'Monthly'}
                                     style={this.filterOptionStyle}/>
                        <ONSCheckbox onChange={this.handleQuarterlyBatchFilterChange}
                                     label={'Quarterly'}
                                     checked={this.state.quarterlyBatchFilter}
                                     id={'Quarterly'}
                                     style={this.filterOptionStyle}/>
                        <ONSCheckbox onChange={this.handleYearlyBatchFilterChange} label={'Yearly'}
                                     checked={this.state.yearlyBatchFilter} id={'Yearly'}
                                     style={this.filterOptionStyle}/>
                    </span>
                </fieldset>
                {/*<DashboardTable data={this.state.filteredBatchData}/>*/}
                <DashboardTable data={this.state.filteredBatchData}/>
            </div>
        );
    }
}

