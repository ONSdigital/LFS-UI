import React from "react";
import Enzyme, {mount, shallow} from "enzyme";
import {ONSSubmitButton} from "./ONSSubmitButton";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";

describe("ONS Submit Button Test", () => {
    Enzyme.configure({ adapter: new Adapter() })

    const submitProps = {
        label: "Submit",
        primary: true,
        small: true,
    }

    const clickSubmitProps = {
        label: "Submit",
        primary: false,
        small: false,
        onClick: sinon.spy(),
        onChange: undefined
    }

    const loadingButtonProps = {
        label: "Submit",
        primary: true,
        small: false,
        loading: true,
        onClick: sinon.spy(),
    }

    function wrapper(render: any, props:any) {
        return render(
            <ONSSubmitButton    
                label={props.label}
                primary={props.primary}
                small={props.small}
                loading={props.loading}
                onClick={props.onClick}>
            </ONSSubmitButton>
        )
    }

    it("matches Snapshot", () => {
        expect(wrapper(shallow, Props)).toMatchSnapshot()
    });

    it("should render correctly", () => expect(wrapper(shallow, submitProps).exists()).toEqual(true))

    it("should render with the correct label", () => {
        expect(wrapper(mount, submitProps).find("ONSSubmitButton").getElement().props.label).toEqual(submitProps.label);
    })
 
    it('simulates click events', () => {
        wrapper(mount, clickSubmitProps).find('ONSSubmitButton').simulate('click');
        expect(clickSubmitProps.onClick).toHaveProperty('callCount', 1);
    })
 
    it('displays loading button', () => {
        expect(wrapper(mount, loadingButtonProps).find('button').hasClass('btn--loader is-loading')).toEqual(true)
    })
})