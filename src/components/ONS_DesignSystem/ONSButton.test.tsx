import React from 'react';
import { shallow } from 'enzyme';
import {ONSButton} from "./ONSButton";
import sinon from 'sinon';

describe("ONS Button Test", () => {
    let wrapper;
    
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

    

})