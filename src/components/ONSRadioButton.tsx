import React, {CSSProperties} from 'react';

interface Props {
    label: string,
    id: string,
    onChange: ((...props: any[]) => void) | undefined,
    checked?: boolean,
    style?: CSSProperties
}

export const ONSRadioButton = (props: Props) => (
    <p className="radios__item" style={props.style}>
        <span className="radio">
            <input
                type="radio"
                id={props.id}
                className={"radio__input js-radio"}
                checked={props.checked}
                onChange={(e) => props.onChange ? props.onChange(e) : e}
                value={props.id}
                name={props.label}
            />
            <label className="radio__label " htmlFor={props.id}>
                {props.label}
            </label>
        </span>
    </p>
);
