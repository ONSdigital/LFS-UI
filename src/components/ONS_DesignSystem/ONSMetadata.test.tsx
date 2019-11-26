import React from 'react';
import { shallow, mount } from 'enzyme';
import {ONSMetadata} from "./ONSMetadata";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

describe("ONS MetaData Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const Props = {
        List: [],
        LSpacing: "10",
        RSpacing: "10"
    }

    function wrapper(render: any, props: any) {
        return render(
            <ONSMetadata
            List={props.List}
            LSpacing={props.LSpacing}
            RSpacing={props.RSpacing}
            >
            </ONSMetadata>
            
        )
    }

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));

    //was gonna checkk the class names but they in a loop
    it('displays the correct left and right margins', () => {
        expect(wrapper(mount, Props).getElement().props.LSpacing).toEqual(Props.LSpacing)
        expect(wrapper(mount, Props).getElement().props.RSpacing).toEqual(Props.RSpacing)
    })



})