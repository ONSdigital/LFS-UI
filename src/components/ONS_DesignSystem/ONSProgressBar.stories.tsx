import React from "react";
import {ONSProgressBar} from "./ONSProgressBar";
import "@ons/design-system/css/main.css";
// Using knobs to allow user config:
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
import {number, select, withKnobs} from "@storybook/addon-knobs";
import "../../index.css";


export default {
    component: ONSProgressBar,
    title: "ONS Progress Bar",
    decorators: [withKnobs]
};

const statusOptions = {
    "In Progress": 1,
    Success: 4,
    Error: 3
};

const percentageRange = {
    range: true,
    min: 0,
    max: 100,
    step: 1
};

export const inProgress = () => (
    <ONSProgressBar statusCode={select("Status", statusOptions, 1)}
                    percentage={number("Percentage ", 50, percentageRange)}/>
);
export const error = () => (
    <ONSProgressBar statusCode={select("Status", statusOptions, 3)}
                    percentage={number("Percentage ", 100, percentageRange)}/>
);
export const success = () => (
    <ONSProgressBar statusCode={select("Status", statusOptions, 4)}
                    percentage={number("Percentage ", 100, percentageRange)}/>
);