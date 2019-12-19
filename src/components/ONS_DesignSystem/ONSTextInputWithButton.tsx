import React, {ChangeEvent} from "react";
import "./ONSButton.css";

interface Props {
    // Input Props
    labelID?: string
    inputLabel?: string
    handleInputChange: (e: ChangeEvent<HTMLInputElement>, ...args: any[]) => void
    inputValue: string
    // Button Props
    buttonID?: string
    buttonLabel: string
    onButtonClick: (...props: any[]) => void
    primaryButton: boolean
}

export const ONSTextInputWithButton = (props: Props) => {

    let buttonClassName = "btn btn--small u-flex-align-bottom u-mb-xs " +
        (props.primaryButton ? "" : "btn--secondary ");

    return (
        <div className="grid--flex ">
            <p className="field">
                <label className="label" htmlFor="search-field">{props.inputLabel}</label>
                <input type="text" id={props.labelID}
                       className="input input--text input-type__input u-mr-xs u-mb-xs input--w-10"
                       value={props.inputValue}
                       onChange={(e) => props.handleInputChange(e)}/>
            </p>
            <button type="submit" id={props.buttonID} className={buttonClassName}
                    onClick={props.onButtonClick}>
                <span className="btn__inner">{props.buttonLabel}</span>
            </button>
        </div>
    );
};
