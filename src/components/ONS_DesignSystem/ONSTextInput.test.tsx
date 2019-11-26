import React from 'react';
import { shallow, mount } from 'enzyme';
import {ONSTextInput} from "./ONSTextInput";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

describe("ONS Text Input Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const Props = {
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



})