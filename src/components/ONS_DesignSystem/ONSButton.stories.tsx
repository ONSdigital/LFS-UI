import React from "react";
import {ONSButton} from "./ONSButton";
import "@ons/design-system/css/main.css";
import {action} from "@storybook/addon-actions";

export default {
    component: ONSButton,
    title: "ONSButton"
};

export const primary = () => <ONSButton label={"Button"} primary={true}/>;
export const secondary = () => <ONSButton label={"Button"} primary={false}/>;
export const smallPrimary = () => <ONSButton label={"Button"} primary={true} small={true}/>;
export const smallSecondary = () => <ONSButton label={"Button"} primary={false} small={true}/>;
export const loadingPrimary = () => <ONSButton label={"Button"} primary={true} loading={true}/>;
export const loadingSecondary = () => <ONSButton label={"Button"} primary={false} loading={true}/>;
export const marginRight = () => (
    <>
        <ONSButton label={"Button"} primary={true} marginRight={10}/>
        <ONSButton label={"Button"} primary={true} marginRight={10}/>
    </>
);
export const onClick = () => <ONSButton label={"Button"} primary={false} onClick={action('click')}/>;
export const exportExcelButton = () => <ONSButton label={"Button"} primary={false} exportExcelBtn={true}/>;
export const disabled = () => <ONSButton label={"Button"} primary={true} disabled={true}/>;
export const callToAction = () => <ONSButton label={"Button"} primary={true} action={true}/>;



