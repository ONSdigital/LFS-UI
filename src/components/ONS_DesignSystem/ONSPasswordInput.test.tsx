import React from 'react';
import { shallow, mount } from 'enzyme';
import {ONSSubmitButton} from "./ONSSubmitButton";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { ONSPasswordInput } from './ONSPasswordInput';

describe("ONS Password Input Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const Props = {}

    const labelProps = {
        label: "Submit"
    }

    function wrapper(render: any, props: any) {
        return render(
            <ONSPasswordInput 
                label={props.label}
                placeholder={props.placeholder}
                marginTop={props.marginTop}>
            </ONSPasswordInput>
        )
    }

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));

    it("should render with the correct label", () => {
        expect(wrapper(mount, labelProps).find("ONSPasswordInput").getElement().props.label).toEqual(labelProps.label);
    });


})