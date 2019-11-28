import React, {CSSProperties} from 'react';

interface Props {
    label?: string,
    id: string,
    onChange?: ((...props: any[]) => void) | undefined,
    checked?: boolean,
    style?: CSSProperties
    disabled?: boolean
}

export const ONSCheckbox = (props: Props) => (
    props.label !== undefined ?
        <p className="checkboxes__item" style={props.style}>
            <span className="checkbox ">
                <input
                    disabled={props.disabled}
                    type="checkbox"
                    id={props.id}
                    checked={props.checked}
                    onChange={(e) => props.onChange !== undefined && props.onChange(e)}
                    className="checkbox__input js-checkbox "
                    value={props.id}
                    name={props.label}
                />
                <label className="checkbox__label " htmlFor={props.id}>
                    {props.label}
                </label>
            </span>
        </p>
        :
        <span style={{width: "unset"}} className="checkbox">
            <input
                disabled={props.disabled}
                type="checkbox"
                id={props.id}
                className="checkbox__input js-checkbox "
                checked={props.checked}
                onChange={(e) => props.onChange && props.onChange(e)}
                style={{position: "unset"}}
            />
        </span>
);
