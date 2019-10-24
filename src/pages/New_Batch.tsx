import React, {Component, ChangeEvent} from "react";
import {ONSSelect} from "../components/ONSSelect";
import {ONSSubmitButton} from "../components/ONSSubmitButton"
import {ONSButton} from "../components/ONSButton";
import {runs, years, quarters, months } from "../utilities/input_fields";

interface State{
    runType: String;
    year: String;
    period: String;
    submitError?: boolean;
}

export class New_Batch extends Component <{}, State> {
    displayName = New_Batch.name
    constructor(props: any) {
        super(props);
        this.state = {
            runType: "",
            year: "",
            period: "",
            submitError: false
        };
    }
    error = false;

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //setting up for the panel error, if submit === true then there is at least one empty field and submit has been clicked, else redirect to manage run
        if(this.state.runType === "" || this.state.year === "" || (this.state.runType !== "yearly" && this.state.period === "")) this.error = true
        else window.location.href = "/Manage_Run"

        if(this.state.runType !== "yearly") this.setState({period: ""})
        
        this.setState({submitError: this.error})
        
        // printing to console the info to be sent to api on submit
        console.log("subbbbmmmiiiiittttt")
        console.log("run type :" + this.state.runType)
        console.log("run type :" + this.state.year)
        if(this.state.runType !== "yearly") console.log("run type :" + this.state.period)

    };

    handleRunTypeChange = (e: ChangeEvent<HTMLSelectElement>) =>{
        this.setState({runType: e.target.value})
    }
    
    handleYearChange = (e: ChangeEvent<HTMLSelectElement>) =>{
        this.setState({year: e.target.value})
    }

    handlePeriodChange = (e: ChangeEvent<HTMLSelectElement>) =>{
        this.setState({period: e.target.value})
    }

    render() {
        return (
            <div className="container">
                {/* this is for the empty inputs, the  ifs are pure jank but it works */}
                {(() => {if (this.state.submitError === true) {
                    return(
                        <div>
                            <div className="panel panel--error">
                                <div className="panel__header">
                                    <h1 className="panel__title u-fs-r--b">This page has errors</h1>
                                </div>
                                <div className="panel__body">
                                    <ul className="list list--bare">
                                        {(() => {if (this.state.runType === ""){
                                            return(<li className="list__item ">
                                                <p className="list__link js-inpagelink">
                                                Please select a Run Type.
                                                </p>
                                            </li>
                                            )}
                                        })()}
                                        {(() => {if (this.state.year === ""){
                                            return(<li className="list__item ">
                                                <p className="list__link js-inpagelink">
                                                Please select a Year.
                                                </p>
                                            </li>
                                            )}
                                        })()}
                                        {(() => {if ((this.state.runType !== "yearly" && this.state.runType !== "") && this.state.period === ""){
                                            return(<li className="list__item ">
                                                <p className="list__link js-inpagelink">
                                                Please select a Period.
                                                </p>
                                            </li>
                                            )}
                                        })()}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <br/>
                            </div>
                        </div>
                    )}
                })()}

                <form onSubmit={this.handleSubmit}>
                    <div style={{maxWidth: "351px"}}>
                        <ONSSelect label="Run Type" value="run" options={runs} onChange={this.handleRunTypeChange}/>
                        <ONSSelect label="Year" value="year" options={years()} onChange={this.handleYearChange} />
                        {(() => {if (this.state.runType === "monthly") {
                            return(
                                <ONSSelect label="Period" value="period" options={months()} onChange={this.handlePeriodChange} />
                            )
                        }if(this.state.runType === "quarterly"){
                            return(
                                <ONSSelect label="Period" value="period" options={quarters} onChange={this.handlePeriodChange} />
                            )
                        }
                        })()}
                        <ONSSubmitButton label="Submit" primary={true} small={false}/>
                    </div>
                </form>
            </div>
        )
    }
}
