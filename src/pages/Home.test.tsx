import React from "react";

import {default as flushPromises} from "../tests/util/flushPromises";
import {cleanup, fireEvent, render} from "@testing-library/react";

import {BrowserRouter} from "react-router-dom";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import fetch from "../tests/setup/__mocks__/fetch.js";
import {Home} from "./Home";
import MockDate from "mockdate";

// @ts-ignore
global.fetch = fetch;
MockDate.set('2015-01-21');


describe("Home Page", () => {
    Enzyme.configure({adapter: new Adapter()});

    beforeEach(() => {
        // @ts-ignore
        process.env.NODE_ENV = 'test'
    });

    afterEach(() => {
        cleanup();
    });

    const Props = {};


    function wrapper(render: any) {
        return render(
            <BrowserRouter>
                <Home/>
            </BrowserRouter>
        );
    }

    it("renders the page", async () => {
        expect(wrapper(render)).toMatchSnapshot();
    });

    it("should display all open batch items in the list", async () => {
        const {getByTestId, getByLabelText, getByText, queryAllByTestId} = wrapper(render);

        await flushPromises();

        // Check the
        let list = queryAllByTestId(/table-row/i);

        let listItemOne = list[0];
        let firstRowData = listItemOne.children[2].textContent + " " + listItemOne.children[3].textContent + " " + listItemOne.children[4].textContent;
        expect(firstRowData).toEqual("Monthly April 2019");

        let listItemTwo = list[5];
        let secondRowData = listItemTwo.children[2].textContent + " " + listItemTwo.children[3].textContent + " " + listItemTwo.children[4].textContent;
        expect(secondRowData).toEqual("Monthly May 2019");

        let listItemThree = list[10];
        let thirdRowData = listItemThree.children[2].textContent + " " + listItemThree.children[3].textContent + " " + listItemThree.children[4].textContent;
        expect(thirdRowData).toEqual("Monthly June 2019");

        let listItemFour = list[15];
        let fourthRowData = listItemFour.children[2].textContent + " " + listItemFour.children[3].textContent + " " + listItemFour.children[4].textContent;
        expect(fourthRowData).toEqual("Quarterly Q2 2019");
    });

    it("should filter the Batch list by its status", async () => {
        const {getByTestId, getByLabelText, getByText, getAllByText, queryAllByTestId} = wrapper(render);

        await flushPromises();

        // Filter by Completed
        await fireEvent.click(getAllByText(/Completed/i)[0]);

        await flushPromises();

        // Check the
        let tableList = queryAllByTestId(/table-row/i);

        let listItemOne = tableList[0];
        let firstRowData = listItemOne.children[2].textContent + " " + listItemOne.children[3].textContent + " " + listItemOne.children[4].textContent;
        expect(firstRowData).toEqual("Monthly January 2019");

        let listItemTwo = tableList[5];
        let secondRowData = listItemTwo.children[2].textContent + " " + listItemTwo.children[3].textContent + " " + listItemTwo.children[4].textContent;
        expect(secondRowData).toEqual("Monthly February 2019");

        let listItemThree = tableList[10];
        let thirdRowData = listItemThree.children[2].textContent + " " + listItemThree.children[3].textContent + " " + listItemThree.children[4].textContent;
        expect(thirdRowData).toEqual("Monthly March 2019");

        let listItemFour = tableList[15];
        let fourthRowData = listItemFour.children[2].textContent + " " + listItemFour.children[3].textContent + " " + listItemFour.children[4].textContent;
        expect(fourthRowData).toEqual("Quarterly Q1 2019");

        // Filter by Live again
        await fireEvent.click(getByText(/Live/i));

        await flushPromises();

        let list = queryAllByTestId(/table-row/i);
        listItemOne = list[0];
        firstRowData = listItemOne.children[2].textContent + " " + listItemOne.children[3].textContent + " " + listItemOne.children[4].textContent;
        expect(firstRowData).toEqual("Monthly April 2019");
    });

    it("should filter the Batch list by Batch Type", async () => {
        const {getByTestId, getByLabelText, getByText, getAllByText, queryAllByTestId} = wrapper(render);

        await flushPromises();

        // Uncheck the monthly batch type checkbox
        await fireEvent.click(getAllByText(/Monthly/i)[0]);

        await flushPromises();

        let list = queryAllByTestId(/table-row/i);

        let listItemOne = list[0];
        let firstRowData = listItemOne.children[2].textContent + " " + listItemOne.children[3].textContent + " " + listItemOne.children[4].textContent;
        expect(firstRowData).toEqual("Quarterly Q2 2019");

        let listItemTwo = list[5];
        let secondRowData = listItemTwo.children[2].textContent + " " + listItemTwo.children[3].textContent + " " + listItemTwo.children[4].textContent;
        expect(secondRowData).toEqual("Annually 2019 2019");


        // Uncheck the Quarterly batch type checkbox
        await fireEvent.click(getAllByText(/Quarterly/i)[0]);

        await flushPromises();

        list = queryAllByTestId(/table-row/i);
        listItemOne = list[0];
        firstRowData = listItemOne.children[2].textContent + " " + listItemOne.children[3].textContent + " " + listItemOne.children[4].textContent;
        expect(firstRowData).toEqual("Annually 2019 2019");

        // Uncheck the Annually batch type checkbox
        await fireEvent.click(getAllByText(/Annually/i)[0]);

        await flushPromises();

        expect(getByText(/No Batches matching this criteria/i)).toBeDefined();
    });

    test("The Manage Batch button in the expanded row should redirect to the correct Batch.", async () => {
        const {getByTestId, getByLabelText, getByText, getAllByText, queryAllByTestId} = wrapper(render);

        await flushPromises();

        let buttons = getAllByText(/Manage Batch/i);

        expect(buttons).toHaveLength(5);

        await fireEvent.click(buttons[0]);

        await flushPromises();

        expect(window.location.pathname).toEqual("/manage-batch/monthly/2019/4");
    });

    test("The Create New Batch button should redirect to the Create New Batch page", async () => {
        const {getByTestId, getByLabelText, getByText, getAllByText, queryAllByTestId} = wrapper(render);

        await flushPromises();

        let newBatchButton = getByText(/Create New Batch/i);

        await fireEvent.click(newBatchButton);

        expect(window.location.pathname).toEqual("/new-batch");
    });

    it("should load test data in development environment", async () => {
        // @ts-ignore - Set Test Env to development
        process.env.NODE_ENV = "development";
        const {getByTestId, getByLabelText, getByText, getAllByText, queryAllByTestId} = wrapper(render);

        await flushPromises();

    });
});