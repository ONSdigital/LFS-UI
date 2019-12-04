import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import {ONSButton} from "./ONSButton";
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

describe("ONS Button Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const Props = {
        label: "Submit1",
        primary: false,
        small: true,
        field: true,
        onButtonClick: sinon.spy(),
        exportExcelBtn: false
    }

    const exportButtonProps = {
        label: "Submit1.5",
        primary: false,
        small: true,
        field: true,
        onButtonClick: sinon.spy(),
        exportExcelBtn: true,
        loading: false
    }

    const smallButtonProps = {
        label: "Submit2",
        primary: true,
        onButtonClick: sinon.spy(),
        loading: true,
        exportExcelBtn: false,
        small: true
    }
    const exportLoadingButtonProps = {
        label: "Submit3",
        primary: true,
        small: false,
        loading: true,
        exportExcelBtn: true,
    }

    const loadingButtonProps = {
        label: "Submit4",
        primary: true,
        small: false,
        onButtonClick: sinon.spy(),
        loading: true,
        field: true,
        exportExcelBtn: false
    }

    function wrapper (render: any, props: any) {
        return render(
             <ONSButton label={props.label} 
                        id={props.id}
                        primary={props.primary}  
                        small={props.small} 
                        field={props.field}
                        loading = {props.loading}
                        marginRight = {props.marginRight}
                        onClick={props.onButtonClick}
                        exportExcelBtn={props.exportExcelBtn}/>)
    }

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));

    it("should render with the correct label", () => {
        expect(wrapper(mount, Props).find("ONSButton").getElement().props.label).toEqual(Props.label);
    })
 
    it('simulates click events', () => {
        wrapper(mount, exportButtonProps).find('ONSButton').simulate('click');
        expect(exportButtonProps.onButtonClick).toHaveProperty('callCount', 1);
    })
 
    it('displays loading button', () => {
        // with export button
        expect(wrapper(mount, exportLoadingButtonProps).find('button').hasClass('btn--loader is-loading ')).toEqual(true)
        
        //without export button
        expect(wrapper(mount, loadingButtonProps).find('button').hasClass('btn--loader')).toEqual(true)
    })

    it('displays small button', () => {
        expect(wrapper(mount, smallButtonProps).find('button').hasClass('btn--small')).toEqual(true)
    })
})