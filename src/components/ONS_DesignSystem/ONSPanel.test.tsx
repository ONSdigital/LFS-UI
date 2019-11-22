import React from 'react';
import { shallow, mount } from 'enzyme';
import {ONSPanel} from "./ONSPanel";
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

describe("ONS Panel Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const panelProps = {
        label: "Success",
        children: <p>Succceeesssss</p>,
    };

    const statusPanelProps = {
        label: "Status",
        children: <p>Statusssss</p>,
        status: "success",
        // spacious: false
    };

    const spaciousPanelProps = {
        label: "Spacious",
        children: <p>Spaciooouuusssss</p>,
        status: "error",
        spacious: true,
        id: "spacious"
    }
    
    function wrapper (render: any, panelProps: any) {
        return render(
            <ONSPanel   label={panelProps.label} 
                        status={panelProps.status}  
                        spacious={panelProps.spacious} 
                        id={panelProps.id}
                        hidden = {panelProps.hidden}
                        >{panelProps.children}</ONSPanel>)}

    it("should render correctly", () => expect(wrapper(shallow, panelProps).exists()).toEqual(true));

    it("should render the correct label", () => {
        expect(wrapper(mount, panelProps).find("ONSPanel").getElement().props.label).toEqual(panelProps.label);
    });

    it("should render the correct children", () => {
        expect(wrapper(mount, panelProps).find("ONSPanel").getElement().props.children).toEqual(panelProps.children)
    })

    it("should render the correct status", () => {
        expect(wrapper(mount, statusPanelProps).find("div.panel").hasClass('panel--success')).toEqual(true)
    })
    
    it('displays a spacious panel button', () => {
        expect(wrapper(mount, spaciousPanelProps).find('div.panel').hasClass('panel--spacious')).toEqual(true)
    })

})