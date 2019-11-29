import React from 'react';
import DatePicker from "react-datepicker";
import "./ONSDateInput.css";
import {ONSTextInput} from "./ONSTextInput";


interface Props {
    label?: string
    id?: string
    onChange: Function
    date: Date | null
}

export const ONSDateInput = (props: Props) => {
    const CustomInput = ({value, onClick}: any) => (
        <ONSTextInput label={props.label} value={value} onClick={onClick} placeholder={"Select Date"}/>
    );
    
    return (
        <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={props.date}
            openToDate={new Date()}
            onChange={date => (props.onChange(date))}
            customInput={<CustomInput/>}
        />
    );
};
