import React from 'react';
import { shallow, mount } from 'enzyme';
import {ONSSelect} from "./ONSSelect";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

describe("ONS Select Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const Selection = [
        {"label": "1", "value": "1"},
        {"label": "2", "value": "2"},
        {"label": "3", "value": "3"}
    ]

    const Props = {
        label: "Select From",
        value: "select value",
        options: Selection
    }

    function wrapper(render: any, props: any) {
        return render(
            <ONSSelect
                label={props.label}
                onChange={props.onChange}
                value={props.value}
                options={props.options}>
            </ONSSelect>
            
        )
    }

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));
    
})