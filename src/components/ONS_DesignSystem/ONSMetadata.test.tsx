import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import {ONSMetadata} from "./ONSMetadata";
import Adapter from 'enzyme-adapter-react-16';

describe("ONS MetaData Test", () => {
    Enzyme.configure({ adapter: new Adapter() });
    
    const list = [{L: "Batch Type", R: "Monthly"},
                {L: "Year", R: "2015"}]

    const Props = {
        List: list,
        LSpacing: "10",
        RSpacing: "10"
    }

    const nullProps = {
        List: null
    }

    function wrapper(render: any, props: any) {
        return render(
            <ONSMetadata
                List={props.List}
                LSpacing={props.LSpacing}
                RSpacing={props.RSpacing}>
            </ONSMetadata>
            
        )
    }

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));

    it("should render correctly", () => expect(wrapper(shallow, nullProps).exists()).toEqual(true));

    it('displays the correct left and right margins', () => {
        expect(wrapper(mount, Props).getElement().props.LSpacing).toEqual(Props.LSpacing)
        expect(wrapper(mount, Props).getElement().props.RSpacing).toEqual(Props.RSpacing)
    })

    it('displays the correct left and right margins', () => {
        expect(wrapper(mount, Props).at(0).find("dt")).toHaveLength(2)
    })



})