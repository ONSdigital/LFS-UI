import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ONSRadioButton} from "./ONSRadioButton";

describe("ONS Radio Button Test", () => {
    Enzyme.configure({adapter: new Adapter()});

    const radioProps = {
        label: "On/Off",
        id: '12',
        onRadioClick: jest.fn()
    };

    function wrapper(render: any, radioProps: any) {
        return render(
            <ONSRadioButton label={radioProps.label} id={radioProps.id} onChange={radioProps.onRadioClick}/>)
    }

    it("should render correctly", () => expect(wrapper(shallow, radioProps).exists()).toEqual(true));

    it("should render with the correct label", () => {
        expect(wrapper(mount, radioProps).find("ONSRadioButton").getElement().props.label).toEqual(radioProps.label);
    });

    it('simulates change events', () => {
        wrapper(mount, radioProps).find('input').simulate('change');
        expect(radioProps.onRadioClick).toHaveBeenCalled()
    });
});