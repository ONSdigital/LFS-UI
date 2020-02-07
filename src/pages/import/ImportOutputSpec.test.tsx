import React from "react";
import {cleanup, render} from "@testing-library/react";

import {BrowserRouter} from "react-router-dom";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import flushPromises from "../../tests/util/flushPromises";
import fetch from "../../tests/setup/__mocks__/fetch";
import {ImportOutputSpec} from "./ImportOutputSpec";
import MockDate from "mockdate";

// @ts-ignore
global.fetch = fetch;
MockDate.set('2015-01-21');


describe("Import Output Specification Page", () => {
    Enzyme.configure({adapter: new Adapter()});

    beforeEach(() => {
        // @ts-ignore
        process.env.NODE_ENV = "test";
    });

    afterEach(() => {
        cleanup();
    });


    function wrapper(render: any) {
        return render(
            <BrowserRouter>
                <ImportOutputSpec match={""}/>
            </BrowserRouter>
        );
    }

    it("renders the page", async () => {
        expect(wrapper(render)).toMatchSnapshot();
    });

    it("should render without crashing", async () => {
        const {queryAllByTestId, getByText} = wrapper(render);
    });

    it("should display the page name in the Breadcrumbs", async () => {
        const {getByTestId} = wrapper(render);

        await flushPromises();

        let currentBreadcrumb = getByTestId(/breadcrumb-current/i);

        expect(currentBreadcrumb.textContent).toEqual("Output File Specification");
    });

    it("should display the list of all imports", async () => {
        const {getByTestId, queryAllByTestId, getByText} = wrapper(render);

        await flushPromises();

        let list = queryAllByTestId(/table-row/i);

        expect(list.length).toEqual(5);

        expect(getByText(/APS Person Variable Specification/i)).toBeDefined();
        expect(getByText(/APS Household Variable Specification/i)).toBeDefined();
        expect(getByText(/Eurostat Variable Specification/i)).toBeDefined();
        expect(getByText(/LFS Household Variable Specification/i)).toBeDefined();
        expect(getByText(/LFS Person Variable Specification/i)).toBeDefined();
    });
});