import React from 'react';
import { shallow, mount } from 'enzyme';
import { ONSSubmitButton } from "./ONSSubmitButton";
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

describe("ONS Submit Button Test", () => {
    Enzyme.configure({ adapter: new Adapter() })

    const submitProps = {
        label: "Submit",
        primary: true,
        small: false
    }

    const clickSubmitProps = {
        label: "Submit",
        primary: true,
        small: false,
        onClick: sinon.spy()
    }

    function wrapper(render: any, props:any) {
        return render(
            <ONSSubmitButton    label={props.label}
                                primary={props.primary}
                                small={props.small}
                                loading={props.loading}
                                onClick={props.onClick}>
            </ONSSubmitButton>
        )
    }

    it("should render correctly", () => expect(wrapper(shallow, submitProps).exists()).toEqual(true))

    it("should render with the correct label", () => {
        expect(wrapper(mount, submitProps).find("ONSButton").getElement().props.label).toEqual(buttonProps.label);
    })
 
    it('simulates click events', () => {
        wrapper(mount, submitProps).find('ONSButton').simulate('click');
        expect(<clickSubmitProps.onButtonClick).toHaveProperty('callCount', 1);
    })
 
    it('displays loading button', () => {
        expect(wrapper(mount, submitProps).find('button').hasClass('btn--loader is-loading ')).toEqual(true)
    })
})