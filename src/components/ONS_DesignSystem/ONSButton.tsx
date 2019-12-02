import React from 'react';
import './ONSButton.css'

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
}

export const ONSButton = (props: Props) => {

    let spacing = () => {
        return {
            marginRight: String(props.marginRight) + "px",
        }
    };

    let className = "btn ";
    if (props.exportExcelBtn) {
        className = className + " " + (props.loading ? "btn--secondary btn--loader is-loading  " : " btn--excel")
    } else {
        className = className +
            (props.loading ? "btn--loader is-loading " : "") +
            (props.field ? "field " : "") +
            (props.primary ? "" : "btn--secondary ") +
            (props.small ? "btn--small " : "");
    }

    return (
        <button id={props.id} style={spacing()} type="button" disabled={props.loading}
                className={className} onClick={props.onClick}>
            <span className="btn__inner">{props.label}</span>
        </button>
    );
};
