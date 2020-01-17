import React from "react";
import {ONSButton} from "./ONSButton";
import "@ons/design-system/css/main.css";
// @ts-ignore
import {action} from "@storybook/addon-actions";
// Using knobs to allow user config:
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
import {boolean, number, text, withKnobs} from "@storybook/addon-knobs";

export default {
    component: ONSButton,
    title: "ONS Button",
    decorators: [withKnobs]
};

export const button = () => (
    <ONSButton
        label={text("Label", "Button")}
        primary={boolean("Primary", true)}
        small={boolean("Small", false)}
        loading={boolean("Loading", false)}
        disabled={boolean("Disabled", false)}/>
);
export const small = () => (
    <ONSButton
        label={text("Label", "Button")}
        primary={boolean("Primary", true)}
        small={boolean("Small", true)}
        loading={boolean("Loading", false)}/>
);
export const loading = () => (
    <ONSButton
        label={text("Label", "Button")}
        primary={boolean("Primary", true)}
        small={boolean("Small", false)}
        loading={boolean("Loading", true)}/>
);
export const marginRight = () => (
    <>
        <ONSButton
            label={text("Label", "First Button")}
            primary={boolean("Primary", true)}
            small={boolean("Small", false)}
            loading={boolean("Loading", false)}
            marginRight={number("Margin Right", 10)}/>
        <ONSButton label={"Second Button"} primary={true} marginRight={10}/>
    </>
);
export const onClick = () => (
    <ONSButton
        label={text("Label", "Button")}
        primary={boolean("Primary", true)}
        small={boolean("Small", false)}
        loading={boolean("Loading", false)}
        onClick={action("click")}/>
);
export const exportExcelButton = () => (
    <ONSButton
        label={text("Label", "Export Excel Button")}
        primary={true}
        loading={boolean("Loading", false)}
        onClick={action("click")}
        exportExcelBtn={true}/>
);
export const disabled = () => (
    <ONSButton
        label={text("Label", "Button")}
        primary={boolean("Primary", true)}
        small={boolean("Small", false)}
        loading={boolean("Loading", false)}
        disabled={boolean("Disabled", true)}/>
);
export const callToAction = () => (
    <ONSButton
        label={text("Label", "Lets Do something")}
        primary={boolean("Primary", true)}
        small={boolean("Small", false)}
        action={boolean("Call to Action", true)}/>
);

button.story = {
    parameters: {
        jest: ['ONSButton.test.tsx'],
    },
};

