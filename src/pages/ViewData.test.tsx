import React from "react";
import {cleanup, fireEvent, render} from "@testing-library/react";

import {BrowserRouter} from "react-router-dom";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import fetch from "../tests/setup/__mocks__/fetch.js";
import {ViewData} from "./ViewData";
import flushPromises from "../tests/util/flushPromises";


// @ts-ignore
global.fetch = fetch;


describe("View Data Page", () => {
    Enzyme.configure({adapter: new Adapter()});

    beforeEach(() => {
        process.env.NODE_ENV = "test";
    });

    afterEach(() => {
        cleanup();
    });


    function wrapper(render: any) {
        return render(
            <BrowserRouter>
                <ViewData/>
            </BrowserRouter>
        );
    }

    it("renders the page", async () => {
        expect(wrapper(render)).toMatchSnapshot();
    });

    it("should display the Variable Definitions by default", async () => {
        const {queryAllByTestId, getByText} = wrapper(render);

        await flushPromises();

        expect(getByText(/DVHRPNUM/i));

        let list = queryAllByTestId(/table-row/i);

        expect(list.length).toEqual(2);
    });

    test("When you click on the tabs it should change the Table to the selected item.\n", async () => {
        const {queryAllByTestId, getByText} = wrapper(render);

        await flushPromises();

        await fireEvent.click(getByText(/Value Labels/i));

        await flushPromises();

        let list = queryAllByTestId(/table-row/i);

        expect(list.length).toEqual(4);
    });

    /*
    Variable Definitions Table tests
     */

    it("should loads all Variable Definitions in the list", async () => {
        const {queryAllByTestId} = wrapper(render);

        await flushPromises();

        let list = queryAllByTestId(/table-row/i);

        expect(list.length).toEqual(2);
    });

    it("should filter list by the Variable Name entered in the Search field for Variable Definitions", async () => {
        const {queryAllByTestId, getByLabelText, getByText, getAllByText} = wrapper(render);

        await flushPromises();

        await fireEvent.change(getByLabelText(/Filter by Variable Name/i), {
            target: {value: "IOUT"}
        });

        await flushPromises();

        let list = queryAllByTestId(/table-row/i);

        expect(list.length).toEqual(1);

        expect(getAllByText(/IOUTCOME/i)).toBeDefined();

        // Clear List back to default
        await fireEvent.click(getByText(/Clear/i));
        await flushPromises();
        list = queryAllByTestId(/table-row/i);
        expect(list.length).toEqual(2)
    });


    test("When you click on a Row the previous definitions for a variable should be shown", async () => {
        const {getByText, getAllByText} = wrapper(render);

        await flushPromises();

        await fireEvent.click(getByText(/IOUTCOME/i));

        await flushPromises();

        expect(getAllByText(/Previous Definition description/i));
    });

    test("When you click on a Row and there is No Previous Metadata a message is shown", async () => {
        const {getByText, getAllByText} = wrapper(render);

        await flushPromises();

        await fireEvent.click(getByText(/DVHRPNUM/i));

        await flushPromises();

        expect(getAllByText(/No Previous Metadata/i));
    });

    it("should display a message when no  are found", async () => {
        const {queryAllByTestId} = wrapper(render);

        await flushPromises();

        let list = queryAllByTestId(/table-row/i);

        expect(list.length).toEqual(2);
    });

    it("should display a message when no Variable Definitions are found", async () => {
        process.env.NODE_ENV = "noData";

        const {getByText} = wrapper(render);

        await flushPromises();

        expect(getByText(/No Variable Definitions found/i)).toBeDefined();
    });

    it("should display an error when the request fails to get the Variable Definitions", async () => {
        process.env.NODE_ENV = "returnError";

        const {getByText} = wrapper(render);

        await flushPromises();

        expect(getByText(/Error occurred while getting Variable Definitions/i)).toBeDefined();
    });

    /*
    Value Label Table tests
     */

    it("should loads all Value Labels in the list", async () => {
        const {getByText, queryAllByTestId} = wrapper(render);

        await flushPromises();

        await fireEvent.click(getByText(/Value Labels/i));

        await flushPromises();

        let list = queryAllByTestId(/table-row/i);

        expect(list.length).toEqual(4);
    });

    it("should filter list by the Variable Name entered in the Search field for Value Labels", async () => {
        const {queryAllByTestId, getByLabelText, getByText, getAllByText} = wrapper(render);

        await flushPromises();

        await fireEvent.click(getByText(/Value Labels/i));

        await flushPromises();

        await fireEvent.change(getByLabelText(/Filter by Variable Name/i), {
            target: {value: "ILLS"}
        });

        await flushPromises();

        let list = queryAllByTestId(/table-row/i);

        expect(list.length).toEqual(3);

        expect(getAllByText(/ILLST17/i)).toBeDefined();

        // Clear List back to default
        await fireEvent.click(getByText(/Clear/i));
        await flushPromises();
        list = queryAllByTestId(/table-row/i);
        expect(list.length).toEqual(4)
    });

    it("should display a message when no Value Labels are found", async () => {
        process.env.NODE_ENV = "noData";

        const {getByText} = wrapper(render);

        await flushPromises();

        await fireEvent.click(getByText(/Value Labels/i));

        await flushPromises();

        expect(getByText(/No Value Labels found/i)).toBeDefined();
    });

    it("should display an error when the request fails to get the Value Labels", async () => {
        process.env.NODE_ENV = "returnError";

        const {getByText} = wrapper(render);

        await flushPromises();

        await fireEvent.click(getByText(/Value Labels/i));

        await flushPromises();

        expect(getByText(/Error occurred while getting Value Labels/i)).toBeDefined();
    });

});