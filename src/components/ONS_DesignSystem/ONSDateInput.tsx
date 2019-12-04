import React, {forwardRef} from "react";
import DatePicker from "react-datepicker";
import "./ONSDateInput.css";
import {ONSTextInput} from "./ONSTextInput";


interface Props {
    label?: string
    id?: string
    onChange?: Function
    date: Date | null
}

export const ONSDateInput = (props: Props) => {

    const ref = React.createRef();
    const CustomDateInput = forwardRef(({onClick, value}: any, ref) => (
        <ONSTextInput label={props.label} value={value} onClick={onClick} placeholder={"Select Date"}/>
    ));

    return (
        <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={props.date}
            openToDate={new Date()}
            onChange={date => (props.onChange !== undefined && props.onChange(date))}
            customInput={<CustomDateInput ref={ref}/>}
        />
    );
};
