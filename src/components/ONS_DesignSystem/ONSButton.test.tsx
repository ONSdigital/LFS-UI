import React from 'react';
import { shallow, mount } from 'enzyme';
import {ONSButton} from "./ONSButton";
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

describe("ONS Button Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const buttonProps = {
        label: "Submit",
        primary: false,
        small: true,
        field: true,
        loading: false,
        onButtonClick: sinon.spy()
    }

    const loadingButtonProps = {
        label: "Submit",
        primary: true,
        small: false,
        onButtonClick: sinon.spy(),
        loading: true
    }

    function wrapper (render: any, buttonProps: any) {
        return render(
             <ONSButton label={buttonProps.label} 
                        id={buttonProps.id}
                        primary={buttonProps.primary}  
                        small={buttonProps.small} 
                        field={buttonProps.field}
                        loading = {buttonProps.loading}
                        marginRight = {buttonProps.marginRight}
                        onClick={buttonProps.onButtonClick}/>)
    }

    it("should render correctly", () => expect(wrapper(shallow, buttonProps).exists()).toEqual(true));

    it("should render with the correct label", () => {
        expect(wrapper(mount, buttonProps).find("ONSButton").getElement().props.label).toEqual(buttonProps.label);
    })
 
    it('simulates click events', () => {
        wrapper(mount, buttonProps).find('ONSButton').simulate('click');
        expect(buttonProps.onButtonClick).toHaveProperty('callCount', 1);
    })
 
    it('displays loading button', () => {
        expect(wrapper(mount, loadingButtonProps).find('button').hasClass('btn--loader is-loading ')).toEqual(true)
    })
     
})