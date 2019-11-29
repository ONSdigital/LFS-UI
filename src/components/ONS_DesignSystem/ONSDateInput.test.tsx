import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ONSDateInput} from "./ONSDateInput";

describe("ONS Date Input", () => {
    Enzyme.configure({adapter: new Adapter()});

    const Props = {
        label: "Input",
        onChange: "",
        date: getDate,
        value: "input"
    }

    const dateInputProps = {
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

    it("should render correctly", () => expect(wrapper(shallow, dateInputProps).exists()).toEqual(true));

    it("should render with the correct label", () => {
        expect(wrapper(mount, dateInputProps).find("ONSDateInput").getElement().props.label).toEqual(dateInputProps.label);
    });

    // TODO: can't get change event to work on Date input
    it.skip('simulates change events', () => {
        wrapper(mount, dateInputProps).find('ONSDateInput').simulate('change');
        expect(dateInputProps.onChange).toHaveBeenCalled()
    });

    // it('matches snapshot', () => {
    //     expect(wrapper(mount, checkboxProps)).toMatchSnapshot()
    // });
});