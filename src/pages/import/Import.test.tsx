import React from "react";

import {Import} from "./Import";

import {default as flushPromises} from "../../tests/util/flushPromises";
import {cleanup, fireEvent, render} from "@testing-library/react";

import {BrowserRouter} from "react-router-dom";
import {act} from "react-dom/test-utils";

import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import fetch from "../../tests/setup/__mocks__/fetch.js";

// @ts-ignore
global.fetch = fetch;

const designWeightsMatch = {
    path: "/import/:file?",
    url: "/import/APS Design Weights",
    isExact: true,
    params: {file: "APS Design Weights"}
};

const APSPersonMatch = {
    path: "/import/:file?",
    url: "/import/APS Person Variable Specification",
    isExact: true,
    params: {file: "APS Person Variable Specification"}
};

function Props(input: any) {
    return {
        match: input
    };
}

function wrapper(render: any, props: any) {
    return render(
        <BrowserRouter>
            <Import {...props}/>
        </BrowserRouter>
    );
}

Enzyme.configure({adapter: new Adapter()});

describe("Import page functionality", () => {
    afterEach(cleanup);

    it("renders the page correctly", () => {
        //testing design weights as it is the first one
        expect(wrapper(render, Props(designWeightsMatch))).toMatchSnapshot();
    });

    test("breadcrumb points to the correct url", async () => {
        //testing an output file as they have two breadcrumbs
        let breadWrapper = wrapper(mount, Props(APSPersonMatch));

        //Home breadcrumb links to Home
        expect(breadWrapper.find("ONSBreadcrumbs").getElement().props.List[0].link).toEqual("import/overview");

        //manage batch breadcrumb links to the correct manage batch page
        expect(breadWrapper.find("ONSBreadcrumbs").getElement().props.List[1].link).toEqual("import/output");
    });

    it("displays \"no file selected\" panel when the upload doesnt contain a file", async () => {
        const {getByText} = wrapper(render, Props(designWeightsMatch));

        fireEvent.click(getByText(/submit/i));

        expect(getByText(/No File Selected/i)).toBeTruthy();
    });

    it("selects a file and uploads, returning an OK response and displaying a success panel", async () => {
        const {getByLabelText, getByText} = wrapper(render, Props(designWeightsMatch));

        const inputEl = getByLabelText(/import/i);

        const file = new File(["(⌐□_□)"], "chucknorris.csv", {
            type: "csv"
        });

        Object.defineProperty(inputEl, "files", {
            value: [file]
        });

        fireEvent.change(inputEl);

        fireEvent.click(getByText(/submit/i));

        await act(async () => {
            await flushPromises();
        });

        expect(getByText(/File Uploaded Successfully/i)).toBeTruthy();
    });

});