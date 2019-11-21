import React from 'react';
import { shallow } from 'enzyme';
import {ONSButton} from "./ONSButton";
import sinon from 'sinon';

describe("ONS Button Test", () => {
    let wrapper: { find: (arg0: string) => { text: () => void; }; };
    // let wrapper: any

    // Props to pass to Button
    const buttonProps = {
        label: "Submit",
        primary: true,
        small: false,
        onButtonClick: sinon.spy()
    };

    beforeEach(() => {
        wrapper = shallow(<ONSButton label={buttonProps.label} primary={buttonProps.primary}  small={buttonProps.small} onClick={buttonProps.onButtonClick}/>)
    })

    it("should render correctly", () => {
        expect(wrapper.exists()).toEqual(true);
    })



})