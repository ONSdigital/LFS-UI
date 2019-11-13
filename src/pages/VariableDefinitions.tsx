import React, {Component} from 'react';
import {VariableDefinitionTable} from "../components/VariableDefinitionTable";
import {getAllVarDefs} from "../utilities/http";

interface State {
    VarDefData: [] | null,
}

export class VariableDefinitions extends Component <{}, State> {
    displayName = VariableDefinitions.name;

    constructor(props: any) {
        super(props);
        this.state = {
            VarDefData: [],
        };
        this.getVarDefData();
    }

    getVarDefData = () => {
        getAllVarDefs()
            .then(r => {
                console.log(r);
                this.setState({VarDefData: r});
                // this.filterBatchData()
            })
            .catch(error => {
                console.log(error);
                if (process.env.NODE_ENV === 'development') {
                    this.getMockVarDefData()
                }
            });
    };

    getMockVarDefData = () => {
        fetch('/jsons/MOCK_VAR_DEFS.json')
            .then(response => response.json())
            .then(response => {
                this.setState({VarDefData: response.Rows});
                // this.filterBatchData();
            })
    };

    // filterListByStatus = (row: any): boolean => {
    //     if (this.state.batchType === 'completed') {
    //         return (row.status === 'Completed')
    //     }
    //     return (row.status !== 'Completed')
    // };

    // filterListByBatchType = (row: any): boolean => {
    //     let monthly = false;
    //     let quarterly = false;
    //     let annually = false;
    //     if (this.state.monthlyBatchFilter) {
    //         monthly = (row.type === MONTHLY_BATCH)
    //     }
    //     if (this.state.quarterlyBatchFilter) {
    //         quarterly = (row.type === QUARTERLY_BATCH)
    //     }
    //     if (this.state.annuallyBatchFilter) {
    //         annually = (row.type === ANNUALLY_BATCH)
    //     }
    //     return monthly || quarterly || annually;
    // };

    // filterBatchData = () => {
    //     if (this.state.batchData !== null) {
    //         let filteredList: any = this.state.batchData.filter(this.filterListByBatchType);
    //         filteredList = filteredList.filter(this.filterListByStatus);
    //         if (filteredList !== null) {
    //             this.setState({filteredBatchData: filteredList})
    //         }
    //     }
    // };

    // handleBatchTypeRadioChange = async (e: ChangeEvent<HTMLInputElement>) => {
    //     let liveStatusFilter = false;
    //     if (e.target.value === 'live') {
    //         liveStatusFilter = true;
    //     }
    //     await this.setState({batchType: e.target.value, liveStatus: liveStatusFilter});
    //     this.filterBatchData();
    // };
    //
    // handleMonthlyBatchFilterChange = async () => {
    //     await this.setState({monthlyBatchFilter: !this.state.monthlyBatchFilter});
    //     this.filterBatchData();
    // };
    //
    // handleQuarterlyBatchFilterChange = async () => {
    //     await this.setState({quarterlyBatchFilter: !this.state.quarterlyBatchFilter});
    //     this.filterBatchData();
    // };
    //
    // handleAnnuallyBatchFilterChange = async () => {
    //     await this.setState({annuallyBatchFilter: !this.state.annuallyBatchFilter});
    //     this.filterBatchData();
    // };

    filterOptionStyle = {marginRight: '.5rem', minWidth: '15rem'};

    render() {
        return (
            <div className="container">
                <fieldset className="fieldset">
                    {/*<legend className="fieldset__legend">Filter Batches</legend>*/}
                    {/*<p className="checkboxes__label">Batch Status</p>*/}
                    {/*<span className="radios__items">*/}
                    {/*    <ONSRadioButton label={'Live'}*/}
                    {/*                    onChange={this.handleBatchTypeRadioChange}*/}
                    {/*                    id={"live"}*/}
                    {/*                    checked={this.state.liveStatus}*/}
                    {/*                    style={this.filterOptionStyle}/>*/}
                    {/*    <ONSRadioButton label={'Completed'}*/}
                    {/*                    onChange={this.handleBatchTypeRadioChange}*/}
                    {/*                    id={'completed'}*/}
                    {/*                    checked={!this.state.liveStatus}*/}
                    {/*                    style={this.filterOptionStyle}/><br/>*/}
                    {/*</span>*/}
                    {/*<p className="checkboxes__label">Batch Type</p>*/}
                    {/*<span className="checkboxes__items">*/}
                    {/*    <ONSCheckbox onChange={this.handleMonthlyBatchFilterChange}*/}
                    {/*                 id={MONTHLY_BATCH}*/}
                    {/*                 label={MONTHLY_BATCH}*/}
                    {/*                 checked={this.state.monthlyBatchFilter}*/}
                    {/*                 style={this.filterOptionStyle}/>*/}
                    {/*    <ONSCheckbox onChange={this.handleQuarterlyBatchFilterChange}*/}
                    {/*                 id={QUARTERLY_BATCH}*/}
                    {/*                 label={QUARTERLY_BATCH}*/}
                    {/*                 checked={this.state.quarterlyBatchFilter}*/}
                    {/*                 style={this.filterOptionStyle}/>*/}
                    {/*    <ONSCheckbox onChange={this.handleAnnuallyBatchFilterChange}*/}
                    {/*                 id={ANNUALLY_BATCH}*/}
                    {/*                 label={ANNUALLY_BATCH}*/}
                    {/*                 checked={this.state.annuallyBatchFilter}*/}
                    {/*                 style={this.filterOptionStyle}/>*/}
                    {/*</span>*/}
                </fieldset>
                <VariableDefinitionTable data={this.state.VarDefData}/>
            </div>
        );
    }
}

