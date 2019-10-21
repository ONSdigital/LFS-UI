import React, {Component, ChangeEvent} from "react";
import {ONSSelect} from "../components/ONSSelect";
import {ONSButton} from "../components/ONSButton";
import {runs, years, quarters, months } from "../utilities/input_fields";

interface State{
    runType: String;
}

export class New_Run extends Component <{}, State> {
    displayName = New_Run.name
    constructor(props: any) {
        super(props);
        this.state = {
            runType: "String",
        };
    }

    handleChange = (e: ChangeEvent<HTMLSelectElement>) =>{
        console.log(e.target.value)
        this.setState({runType: e.target.value})
        console.log(this.state.runType)
    }    

    render() {
        return (
            <div className="container">
                    <ONSSelect label="Run Type" value="run" options={runs} onChange={this.handleChange}/>
                    <ONSSelect label="Year" value="year" options={years()} />
                    {(() => {if (this.state.runType == "monthly") {
                        return(
                            <ONSSelect label="Period" value="period" options={months()} />
                        )
                    }if(this.state.runType == "quarterly"){
                        return(
                            <ONSSelect label="Period" value="period" options={quarters} />
                        )
                    }
                    })()}
                    <ONSButton label={"Submit"} field={true} primary={true} small={false}/>

            </div>
        )
    }
}
