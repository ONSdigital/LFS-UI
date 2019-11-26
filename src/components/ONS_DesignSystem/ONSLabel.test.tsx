import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {ONSLabel} from "./ONSLabel";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

describe("ONS Label Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const Props = {
        label: "ONS Label",
        description: "This is the ONS Label",
        id: "L1"
    }

    function wrapper(render: any, props: any) {
        return render(
            <ONSLabel
                label={props.label}
                description={props.description}
                id={props.id}>
            </ONSLabel>
            
        )
    }

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));

    it("should render with the correct label", () => {
        expect(wrapper(mount, Props).find("ONSLabel").getElement().props.label).toEqual(Props.label);
    })

    // the span is in an if statement so not sure how to get it to find

    it('displays a description if supplied', () => {
        expect(wrapper(mount, Props).find("span").hasClass("label__description")).toEqual(true)
    })
})