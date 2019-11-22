import React from 'react';
import DatePicker from "react-datepicker";
import "./ONSDateInput.css";
import {ONSTextInput} from "./ONSTextInput";


interface Props {
    label?: string
    onChange?: Function
    date: Date
}

export const ONSDateInput = (props: Props) => {
    const CustomInput = ({value, onClick}: any) => (
        <ONSTextInput label={props.label} value={value} onClick={onClick} placeholder={"Select Date"}/>
    );
    return (
        <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={props.date}
            onChange={date => (props.onChange !== undefined && props.onChange(date))}
            customInput={<CustomInput/>}
        />
    );
};
