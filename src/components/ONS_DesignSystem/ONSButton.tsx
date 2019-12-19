import React from "react";
import "./ONSButton.css";

interface Props {
    label: string,
    id?: string,
    primary: boolean,
    small?: boolean,
    field?: boolean,
    loading?: boolean,
    marginRight?: number,
    onClick?: (...props: any[]) => void
    exportExcelBtn?: boolean
    disabled?: boolean
    action?: boolean
}

export const ONSButton = (props: Props) => {

    let spacing = () => {
        return {
            marginRight: String(props.marginRight) + "px"
        };
    };

    let className = "btn ";
    if (props.exportExcelBtn) {
        className = className + " " + (props.loading ? "btn--secondary btn--loader is-loading  " : " btn--excel btn--secondary");
    } else {
        className = className +
            (props.action ? "btn--link " : "") +
            (props.loading ? "btn--loader is-loading " : "") +
            (props.field ? "field " : "") +
            (props.primary ? "" : "btn--secondary ") +
            (props.small ? "btn--small " : "") +
            (props.disabled ? "btn--disabled " : "");
    }

    return (
        <button id={props.id} style={spacing()} type="button" disabled={props.loading || props.disabled}
                className={className} onClick={props.onClick}>
            <span className="btn__inner">{props.label}</span>
        </button>
    );
};
