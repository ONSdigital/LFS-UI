import React from "react";
import Enzyme, {mount, shallow} from "enzyme";
import {ONSBreadcrumbs} from "./ONSBreadcrumbs";
import Adapter from "enzyme-adapter-react-16";
import {BrowserRouter} from "react-router-dom";

describe("ONS Breadcrumbs Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const Props = {
        List: [],
        Current: "The page you are on"
    }

    const listProps = {
        List: [{name: "1", link: ""}],
        Current: "The page you are on"
    }

    function wrapper(render: any, props: any) {
        return render(
            <BrowserRouter>
                <ONSBreadcrumbs
                    {...props}>
                </ONSBreadcrumbs>
            </BrowserRouter>
        )
    }

    it("matches Snapshot", () => {
        expect(wrapper(shallow, Props)).toMatchSnapshot()
    });

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));

    it("should render the correct current text", () => {
        expect(wrapper(mount, listProps).find("ONSBreadcrumbs").getElement().props.Current).toEqual(listProps.Current)
    })

})