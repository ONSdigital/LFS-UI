import React from "react";
import Enzyme, {mount, shallow} from "enzyme";
import {ONSSelect} from "./ONSSelect";
import Adapter from "enzyme-adapter-react-16";

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

    const changeProps = {
        label: "Select From",
        options: Selection,
        onChange: jest.fn(),
    }

    const undefinedChangeProps = {
        label: "Select From",
        value: "select value",
        options: Selection,
        onChange: undefined,
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

    it("matches Snapshot", () => {
        expect(wrapper(shallow, Props)).toMatchSnapshot()
    });

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));
    
    it("should render with the correct label", () => {
        expect(wrapper(mount, Props).find("ONSSelect").getElement().props.label).toEqual(Props.label);
    })
    
    it('simulates change events', () => {
        //defined
        wrapper(mount, changeProps).find("select").simulate('change');
        expect(changeProps.onChange).toHaveBeenCalled()
        
        //undefined
        wrapper(mount, undefinedChangeProps).find("select").simulate('change');
        expect(undefinedChangeProps.onChange).toBeUndefined()
    })
})