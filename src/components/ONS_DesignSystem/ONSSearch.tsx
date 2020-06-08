import React from "react";

interface Props {
    label: string
    buttonLabel?: string
    onClick?: (...props: any[]) => void
    onChange?: ((...props: any[]) => void) | undefined
}

export const ONSSearch = (props: Props) => {
    let buttonLabel = () => {
        if(props.buttonLabel) return props.buttonLabel
        else return "Search"
    }

    return (
        <p className="field">
            <label className="label" htmlFor="search-field">{props.label}</label>
            <span className="grid--flex">
                <input
                    type="text"
                    id="search-field"
                    className="input input--text input-type__input  u-mr-xs input--w-10"
                    data-char-check-ref="search-field-check-remaining" data-char-check-num=""
                    data-char-check-countdown="true"
                    onChange={(e) => props.onChange !== undefined && props.onChange(e)}
                />
            <button
                    type="submit"
                    className="btn btn--small u-flex-align-bottom u-mb-no"
                    onClick={props.onClick}
                >
                <span className="btn__inner">{buttonLabel()}</span>
            </button>
            </span>
        </p>
    )
}