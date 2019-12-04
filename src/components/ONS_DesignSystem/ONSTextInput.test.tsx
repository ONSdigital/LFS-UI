import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import {ONSTextInput} from "./ONSTextInput";
import Adapter from 'enzyme-adapter-react-16';

describe("ONS Text Input Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    let x: any

    const Props = {
        label: "text"
    }

    const changeProps = {
        onChange: jest.fn(),
    }

    const undefinedChangeProps = {
        onChange: undefined,
    }

    const clickProps = { 
        onClick: jest.fn(),
        fit: true,
        password: true
    }

    function wrapper(render: any, props: any) {
        return render(
            <ONSTextInput
                label={props.label}
                id={props.id}
                password={props.password}
                onChange={props.onChange}
                placeholder={props.placeholder}
                fit={props.fit}
                autoFocus={props.autoFocus}
                value={props.value}
                autoComplete={props.autoComplete}
                onClick={props.onClick}>
            </ONSTextInput>
            
        )
    }

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));

    it("should render with the correct label", () => {
        expect(wrapper(mount, Props).find("ONSTextInput").getElement().props.label).toEqual(Props.label);
    })
    
    it('simulates change events', () => {
        //defined
        wrapper(mount, changeProps).find("input").simulate('change');
        expect(changeProps.onChange).toHaveBeenCalled()
        
        //undefined
        wrapper(mount, undefinedChangeProps).find("input").simulate('change');
        expect(undefinedChangeProps.onChange).toBeUndefined()
    })

    it('simulates click events', () => {
        wrapper(mount, clickProps).find('input').simulate('click');
        expect(clickProps.onClick).toHaveBeenCalled();
    })



})