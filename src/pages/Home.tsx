import React, {ChangeEvent, Component} from "react";
import {HomeBatchTable} from "../components/HomeBatchTable";
import {ONSRadioButton} from "../components/ONS_DesignSystem/ONSRadioButton";
import {ONSCheckbox} from "../components/ONS_DesignSystem/ONSCheckbox";
import {getAllBatches} from "../utilities/http";
import DocumentTitle from "react-document-title";
import {ONSButton} from "../components/ONS_DesignSystem/ONSButton";
import {Link} from "react-router-dom";

const MONTHLY_BATCH = "Monthly";
const QUARTERLY_BATCH = "Quarterly";
const ANNUALLY_BATCH = "Annually";

interface State {
    batchData: [] | null,
    filteredBatchData: [] | null,
    batchType: string,
    liveStatus: boolean,
    monthlyBatchFilter: boolean,
    quarterlyBatchFilter: boolean,
    annuallyBatchFilter: boolean
}

export class Home extends Component <{}, State> {
    displayName = Home.name;

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
                this.filterBatchData();
            })
            .catch(error => {
                console.log(error);
                if (process.env.NODE_ENV === "development") {
                    console.log("Error Connecting to Server, Loading mock data");
                    this.getMockBatchData();
                }
            });
    };

    getMockBatchData = () => {
        fetch("/jsons/MOCK_RUNS.json")
            .then(response => response.json())
            .then(response => {
                this.setState({batchData: response.Rows});
                this.filterBatchData();
            });
    };

    filterListByStatus = (row: any): boolean => {
        if (this.state.batchType === "completed") {
            return (row.status === 4);
        }
        return (row.status !== 4);
    };

    filterListByBatchType = (row: any): boolean => {
        let monthly = false;
        let quarterly = false;
        let annually = false;
        if (this.state.monthlyBatchFilter) {
            monthly = (row.type === MONTHLY_BATCH);
        }
        if (this.state.quarterlyBatchFilter) {
            quarterly = (row.type === QUARTERLY_BATCH);
        }
        if (this.state.annuallyBatchFilter) {
            annually = (row.type === ANNUALLY_BATCH);
        }
        return monthly || quarterly || annually;
    };

    filterBatchData = () => {
        if (this.state.batchData !== null) {
            let filteredList: any = this.state.batchData.filter(this.filterListByBatchType);
            filteredList = filteredList.filter(this.filterListByStatus);
            if (filteredList !== null) {
                this.setState({filteredBatchData: filteredList});
            }
        }
    };

    handleBatchTypeRadioChange = async (e: ChangeEvent<HTMLInputElement>) => {
        let liveStatusFilter = false;
        if (e.target.value === "live") {
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

    filterOptionStyle = {marginRight: ".5rem", minWidth: "15rem"};

    render() {
        return (
            <DocumentTitle title={"Labour Force Survey Dashboard"}>
                <div className="container">
                    <br/>
                    <fieldset className="fieldset">
                        <Link to={"/new-batch"} style={{right: 0, float: "right"}}>
                            <ONSButton label={"Create New Batch"} primary={true} field={true} action={true}/>
                        </Link>
                        <h4 className="fieldset__legend">Filter Batches</h4>
                        <p className="checkboxes__label">Batch Status</p>
                        <span className="radios__items">
                        <ONSRadioButton label={"Live"}
                                        onChange={this.handleBatchTypeRadioChange}
                                        id={"live"}
                                        checked={this.state.liveStatus}
                                        style={this.filterOptionStyle}/>
                        <ONSRadioButton label={"Completed"}
                                        onChange={this.handleBatchTypeRadioChange}
                                        id={"completed"}
                                        checked={!this.state.liveStatus}
                                        style={this.filterOptionStyle}/>
                            <br/>
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
                    <HomeBatchTable data={this.state.filteredBatchData}/>
                </div>
            </DocumentTitle>
        );
    }
}

