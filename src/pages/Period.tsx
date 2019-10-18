import React, {Component} from "react";
import {ONSSelect} from "../components/ONSSelect";
import {ONSButton} from "../components/ONSButton";

export class Period extends Component{
    displayName = Period.name;

    weeks = () => {
        let i;
        let weekList = [];
        for (i=1; i<=52; i++) {
            weekList.push({"label":"Week "+String(i), "value":String(i)})
        }
        return weekList
    };

    years = () => {
        let i;
        let yearlist = [];
        let date = new Date();
        const year = date.getFullYear();
        for (i=0; i<10; i++){
            yearlist.push({"label":String(year-i), "value":String(year-i)})
        }
        return yearlist
    };

    render() {
        return (
            <div className="container">
                    <ONSSelect label="Week" value="week" options={this.weeks()} />
                    <ONSSelect label="Year" value="year" options={this.years()} />
                    <ONSButton label={"Submit"} field={true} primary={true} small={false}/>

            </div>
        )
    }
}
