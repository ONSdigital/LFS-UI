import React, {ChangeEvent, Component} from "react";
import {HomeProcessingTable} from "../components/HomeProcessingTable";
import {ONSRadioButton} from "../components/ONS_DesignSystem/ONSRadioButton";
import {ONSCheckbox} from "../components/ONS_DesignSystem/ONSCheckbox";
import {getAllBatches} from "../utilities/http";
import DocumentTitle from "react-document-title";
import {ONSButton} from "../components/ONS_DesignSystem/ONSButton";
import {ONSPanel} from "../components/ONS_DesignSystem/ONSPanel";
import {Link} from "react-router-dom";
import { ONSSearch } from "../components/ONS_DesignSystem/ONSSearch";

const MONTHLY_BATCH = "Monthly";
const QUARTERLY_BATCH = "Quarterly";
const ANNUALLY_BATCH = "Annually";

interface State {
    batchData: [] | null,
    filteredBatchData: any[],
    batchType: string,
    liveStatus: boolean,
    monthlyBatchFilter: boolean,
    quarterlyBatchFilter: boolean,
    annuallyBatchFilter: boolean
    periodFilter: string | null
    clickedPeriodFilter: string | null
    mocked: boolean
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
            annuallyBatchFilter: true,
            periodFilter: null,
            clickedPeriodFilter: null,
            mocked: false
        };
        this.getBatchData();
    }

    getBatchData = () => {
        getAllBatches()
            .then(r => {
                console.log(r);
                this.setState({batchData: r, mocked: false});
                this.filterBatchData();
            })
            .catch(error => {
                if (process.env.NODE_ENV === "development") {
                    console.log(error);
                    console.log("Error Connecting to Server, Loading mock data");
                    this.getMockBatchData();
                }
            });
    };

    getMockBatchData = () => {
        fetch("/jsons/MOCK_RUNS.json")
            .then(response => response.json())
            .then(response => {
                this.setState({batchData: response.Rows, mocked: true});
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

    filterListByPeriod = (row: any) => {
        // console.log(this.state.periodFilter)
        let fullPeriod: string = row.fullPeriod.toLowerCase()
        let periodFilter = ""
        if(this.state.periodFilter) {
            periodFilter = this.state.periodFilter.toLowerCase()
            return fullPeriod.includes(periodFilter)
        }
        else return fullPeriod
        
        
    }

    filterByPeriod = () => {        
        if(this.state.batchData) {
            const elements = this.state.batchData      
            let filteredElements = elements.filter(this.filterListByPeriod)
            this.setState({filteredBatchData: filteredElements})
        }            

    }

    handlePeriodFilterClick = async (e: any) => {
        this.setState({clickedPeriodFilter: this.state.periodFilter})
        this.filterByPeriod()
    }

    handlePeriodFilterChange = async (e: any) => {
        this.setState({periodFilter: e.target.value})
    }

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
                            <ONSButton label={"Create New Processing"} primary={true} field={true} action={true}/>
                        </Link>
                        {/* <br/> */}
                        <br/>
                        <br/>
                        <p className="checkboxes__label">Processing Status</p>
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
                        </span>
                        <br/>
                        <p className="checkboxes__label">Processing Type</p>
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
                            {/* <ONSCheckbox onChange={this.handleAnnuallyBatchFilterChange}
                                        id={ANNUALLY_BATCH}
                                        label={ANNUALLY_BATCH}
                                        checked={this.state.annuallyBatchFilter}
                                        style={this.filterOptionStyle}/> */}
                        </span>
                        <br/>
                        <ONSSearch label="Filter results by period" 
                                buttonLabel="Filter" 
                                onClick={this.handlePeriodFilterClick}
                                onChange={this.handlePeriodFilterChange}></ONSSearch>
                    </fieldset>
                    <br/>
                    {(this.state.mocked) && 
                        <ONSPanel><p>This data has been mocked, Links may not work correctly</p></ONSPanel>
                    }
                    <HomeProcessingTable data={this.state.filteredBatchData}/>
                </div>
            </DocumentTitle>
        );
    }
}

