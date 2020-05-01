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
    testid?: string
    hidden?: boolean
}

export const ONSButton = (props: Props) => {

    let styling = () => {
        if(props.hidden === true) {
           return {display: "none"}
        }else if(props.marginRight){
            return {marginRight: + String(props.marginRight) + "px"}
        }; 
    };

    let test_id = () => {
        if(props.testid){
            return props.testid + "-button"
        }
        return "button"
    }

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
        <button id={props.id} style={styling()} type="button" disabled={props.loading || props.disabled}
                className={className} onClick={props.onClick} data-testid={test_id()}>
            <span className="btn__inner">{props.label}</span>
        </button>
    );
};
