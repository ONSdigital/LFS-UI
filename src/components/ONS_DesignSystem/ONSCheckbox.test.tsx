import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ONSCheckbox} from "./ONSCheckbox";

describe("ONS Checkbox Test", () => {
    Enzyme.configure({adapter: new Adapter()});

    const checkboxProps = {
        id: '12',
        onCheckboxClick: jest.fn(),
    };

    const checkboxWithLabelProps = {
        label: "Enable",
        id: '12',
        onCheckboxClick: jest.fn()
    };

    const checkboxCheckedProps = {
        label: "Enable",
        id: '12',
        checked: true,
        onCheckboxClick: jest.fn()
    };

    function wrapper(render: any, props: any) {
        return render(
            <ONSCheckbox id={props.id}
                         label={props.label}
                         onChange={props.onCheckboxClick}
                         disabled={props.disabled}
                         checked={props.checked}
                         style={props.style}/>)
    }

    it("should render correctly", () => expect(wrapper(shallow, checkboxProps).exists()).toEqual(true));

    it("should render with the correct label", () => {
        expect(wrapper(mount, checkboxWithLabelProps).find("ONSCheckbox").getElement().props.label).toEqual(checkboxWithLabelProps.label);
    });

    it("should render without label if prop not passed in", () => {
            expect(wrapper(mount, checkboxProps).find("ONSCheckbox").getElement().props.label).toBeUndefined();
        }
    );

    it("should render with the correct checked status", () => {
        expect(wrapper(mount, checkboxCheckedProps).find("ONSCheckbox").getElement().props.checked).toEqual(true);
    });

    it('simulates change events', () => {
        wrapper(mount, checkboxProps).find('input').simulate('change');
        expect(checkboxProps.onCheckboxClick).toHaveBeenCalled()
    });

    // it('matches snapshot', () => {
    //     expect(wrapper(mount, checkboxProps)).toMatchSnapshot()
    // });
});