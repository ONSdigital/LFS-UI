import React from "react";
import {cleanup, fireEvent, render} from "@testing-library/react";

import {BrowserRouter} from "react-router-dom";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {ImportOverview} from "./ImportOverview";
import flushPromises from "../../tests/util/flushPromises";
import fetch from "../../tests/setup/__mocks__/fetch";
import MockDate from "mockdate";

// @ts-ignore
global.fetch = fetch;
MockDate.set('2015-01-21');

describe("Import Overview Page", () => {
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
                <ImportOverview match={""}/>
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

        let breadcrumbItems = getByTestId(/breadcrumbs/i);

        expect(breadcrumbItems.textContent).toEqual("Import Overview");
    });

    it("should display the list of all imports", async () => {
        const {getByTestId, queryAllByTestId, getByText} = wrapper(render);

        await flushPromises();

        let list = queryAllByTestId(/table-row/i);

        expect(list.length).toEqual(7);

        expect(getByText(/APS Design Weights/i)).toBeDefined();
        expect(getByText(/Bulk Amendments/i)).toBeDefined();
        expect(getByText(/Geographical Classifications/i)).toBeDefined();
        expect(getByText(/Output Specification/i)).toBeDefined();
        expect(getByText(/Population Estimates/i)).toBeDefined();
        expect(getByText(/Value Labels/i)).toBeDefined();
        expect(getByText(/Variable Definitions/i)).toBeDefined();
    });

    // TODO: Can't get Import link to change the pathname, despite this working on the Home page tests
    test.skip("the import buttons should redirect the page to the correct Import page", async () => {
        const {getByTestId, queryAllByTestId, getByText} = wrapper(render);

        await flushPromises();

        console.log(window.location.pathname);

        // delete window.location;
        // // @ts-ignore
        // window.location = {pathname: "import/overview"};

        console.log(window.location.pathname);

        let list = queryAllByTestId(/table-row/i);

        let importButton = list[0].children[3];

        console.log(importButton);

        await fireEvent.click(importButton);

        // await flushPromises();

        expect(window.location.pathname).toEqual("import/APS Design Weights");
    });
});