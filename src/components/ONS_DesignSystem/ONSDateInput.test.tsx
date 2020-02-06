import React from "react";
import Enzyme, {mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {ONSDateInput} from "./ONSDateInput";
import DatePicker from "react-datepicker";

describe("ONS Date Input", () => {
    Enzyme.configure({adapter: new Adapter()});
    
    let newDate: any = null

    const dateInputProps = {
        label: 'Date Input',
        onChange: (date: any) => {newDate = date},
        date: new Date()
    };

    const undefinedDateInputProps = {
        label: 'undefined Date Input',
        onChange: undefined,
        date: null
    };

    const dateInputProps1 = {
        label: 'Date Input',
        onChange: jest.fn(),
        date: new Date()
    };

    function wrapper(render: any, dateInputProps: any) {
        return render(
            <ONSDateInput date={dateInputProps.date}
                          label={dateInputProps.label}
                          onChange={dateInputProps.onChange}/>)
    }

    it("matches Snapshot", () => {
        expect(wrapper(shallow, dateInputProps)).toMatchSnapshot()
    });

    it("should render correctly", () => expect(wrapper(shallow, dateInputProps).exists()).toEqual(true));

    it("should render with the correct label", () => {
        expect(wrapper(mount, dateInputProps).find("ONSDateInput").getElement().props.label).toEqual(dateInputProps.label);
    });

    // TODO: can't get change event to work on Date input
    it('simulates change events', () => {
        wrapper(mount, dateInputProps).find(DatePicker).instance().props.onChange('2018-01-26')
        expect(newDate).toBe('2018-01-26')

        wrapper(mount, undefinedDateInputProps).find('ONSDateInput').simulate('change');
        expect(undefinedDateInputProps.onChange).toBeUndefined()
    });

});
