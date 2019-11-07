import React, {ChangeEvent, Component} from 'react';
import {DashboardTable} from "../components/DashboardTable";
import {ONSRadioButton} from "../components/ONS_DesignSystem/ONSRadioButton";
import {ONSCheckbox} from "../components/ONS_DesignSystem/ONSCheckbox";
import {getAllBatches} from "../utilities/http";

const MONTHLY_BATCH = 'Monthly';
const QUARTERLY_BATCH = 'Quarterly';
const ANNUALLY_BATCH = 'Annually';

interface State {
    batchData: [] | null,
    filteredBatchData: [] | null,
    batchType: string,
    liveStatus: boolean,
    monthlyBatchFilter: boolean,
    quarterlyBatchFilter: boolean,
    annuallyBatchFilter: boolean
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
            annuallyBatchFilter: true
        };
        this.getBatchData();
    }

    getBatchData = () => {
        getAllBatches()
            .then(r => {
                console.log(r);
                this.setState({batchData: r});
                this.filterBatchData()
            })
            .catch(error => {
                console.log(error);
                if (process.env.NODE_ENV === 'development') {
                    this.getMockBatchData()
                }
            });
    };

    getMockBatchData = () => {
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
        let annually = false;
        if (this.state.monthlyBatchFilter) {
            monthly = (row.type === MONTHLY_BATCH)
        }
        if (this.state.quarterlyBatchFilter) {
            quarterly = (row.type === QUARTERLY_BATCH)
        }
        if (this.state.annuallyBatchFilter) {
            annually = (row.type === ANNUALLY_BATCH)
        }
        return monthly || quarterly || annually;
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

    handleAnnuallyBatchFilterChange = async () => {
        await this.setState({annuallyBatchFilter: !this.state.annuallyBatchFilter});
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
                        <ONSRadioButton label={'Live'}
                                        onChange={this.handleBatchTypeRadioChange}
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
                                     id={MONTHLY_BATCH}
                                     label={MONTHLY_BATCH}
                                     checked={this.state.monthlyBatchFilter}
                                     style={this.filterOptionStyle}/>
                        <ONSCheckbox onChange={this.handleQuarterlyBatchFilterChange}
                                     id={QUARTERLY_BATCH}
                                     label={QUARTERLY_BATCH}
                                     checked={this.state.quarterlyBatchFilter}
                                     style={this.filterOptionStyle}/>
                        <ONSCheckbox onChange={this.handleAnnuallyBatchFilterChange}
                                     id={ANNUALLY_BATCH}
                                     label={ANNUALLY_BATCH}
                                     checked={this.state.annuallyBatchFilter}
                                     style={this.filterOptionStyle}/>
                    </span>
                </fieldset>
                <DashboardTable data={this.state.filteredBatchData}/>
            </div>
        );
    }
}

