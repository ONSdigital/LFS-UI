import React from 'react';
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { ONSPasswordInput } from './ONSPasswordInput';

describe("ONS Password Input Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const Props = {}

    const labelProps = {
        label: "Submit"
    }

    const changeProps = {
        onChange: jest.fn(),
    }

    const undefinedChangeProps = {
        onChange: undefined
    }

    function wrapper(render: any, props: any) {
        return render(
            <ONSPasswordInput 
                label={props.label}
                placeholder={props.placeholder}
                marginTop={props.marginTop}
                onChange={props.onChange}>
            </ONSPasswordInput>
        )
    }

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));

    it("should render with the correct label", () => {
        expect(wrapper(mount, labelProps).find("ONSPasswordInput").getElement().props.label).toEqual(labelProps.label);
    });

    it("should handle a change", () => {
        //defined onchange
        wrapper(mount, changeProps).find('input.input').simulate('change')
        expect(changeProps.onChange).toHaveBeenCalled()        
        
        //undefined onchange
        wrapper(mount, undefinedChangeProps).find('input.input').simulate('change')
        expect(undefinedChangeProps.onChange).toBeUndefined()        

    })

    it("should handle a click on the checkbox", () => {
        let thisWrapper = wrapper(mount, undefinedChangeProps)
        thisWrapper.find('input.checkbox__input').simulate('click')
        expect(thisWrapper.state('password')).toBeFalsy();
    })

})