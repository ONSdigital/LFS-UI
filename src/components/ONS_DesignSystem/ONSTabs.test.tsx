import React from "react";
import Enzyme, {mount, shallow} from "enzyme";
import {ONSTabs} from "./ONSTabs";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";

describe("ONS Tabs Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const tabsSelection = [
        {name: "Tab 1", active: true},
        {name: "Tab 2", active: false}
    ];
    
    const Props = {
        label: "I'm not your friend buddy",
        onClick: sinon.spy(),
        items: tabsSelection
    }

    function wrapper(render: any, props: any) {
        return render(
            <ONSTabs
                {...props}>
            </ONSTabs>
        )
    }

    it("matches Snapshot", () => {
        expect(wrapper(shallow, Props)).toMatchSnapshot()
    });

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));

    it("should simulate a click event", () => {
        wrapper(mount, Props).find("a.tab--selected").simulate("click");
        expect(Props.onClick).toHaveProperty("callCount", 1);
    })
})