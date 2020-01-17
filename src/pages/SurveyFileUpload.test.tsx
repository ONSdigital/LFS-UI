import React from "react";

import {SurveyFileUpload} from "./SurveyFileUpload";

import {default as flushPromises} from "../tests/util/flushPromises";
import {cleanup, fireEvent, render, screen} from "@testing-library/react";

import {BrowserRouter} from "react-router-dom";

import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import fetch from "../tests/setup/__mocks__/fetch.js";

import {monthNumberToString} from "../utilities/Common_Functions";
import {act} from "react-dom/test-utils";

global.fetch = fetch;

describe("GB and NI survey file uploads", () => {
    Enzyme.configure({adapter: new Adapter()});

    afterEach(cleanup);

    const match = {
        path: "/survey-import/:survey/:week/:month/:year",
        url: "/survey-import/gb/1/1/2019",
        isExact: true,
        params: {survey: "gb", week: "1", month: "1", year: "2019"}
    };

    const matchNI = {
        path: "/survey-import/:survey/:week/:month/:year",
        url: "/survey-import/ni/0/5/2019",
        isExact: true,
        params: {survey: "ni", week: "0", month: "5", year: "2019"}
    };

    const Props = {
        period: "Week 1",
        year: "2019",
        surveyType: "gb",
        match: match
    };

    const PropsNI = {
        period: 5,
        year: "2019",
        surveyType: "ni",
        match: matchNI
    };

    function wrapper(render: any, props: any) {
        return render(
            <BrowserRouter>
                <SurveyFileUpload {...props}/>
            </BrowserRouter>
        );
    }

    it("renders the page", async () => {
        expect(wrapper(render, Props)).toMatchSnapshot();
    });

    it("displays the correct GB metadata", async () => {
        wrapper(render, Props);

        expect(screen.getByTestId(/metadata-test-0/i).textContent).toEqual(Props.surveyType.toUpperCase());
        expect(screen.getByTestId(/metadata-test-1/i).textContent).toEqual(Props.year.toUpperCase());
        expect(screen.getByTestId(/metadata-test-2/i).textContent).toEqual(Props.period);
    });

    it("displays the correct NI metadata", async () => {
        wrapper(render, PropsNI);

        expect(screen.getByTestId(/metadata-test-0/i).textContent).toEqual(PropsNI.surveyType.toUpperCase());
        expect(screen.getByTestId(/metadata-test-1/i).textContent).toEqual(PropsNI.year.toUpperCase());
        expect(screen.getByTestId(/metadata-test-2/i).textContent).toEqual(monthNumberToString(PropsNI.period));
    });

    test("breadcrumb points to the correct url", async () => {
        let breadWrapper = wrapper(mount, Props);

        //Home breadcrumb links to Home
        expect(breadWrapper.find("ONSBreadcrumbs").getElement().props.List[0].link).toEqual("");

        //manage batch breadcrumb links to the correct manage batch page
        expect(breadWrapper.find("ONSBreadcrumbs").getElement().props.List[1].link).toEqual("manage-batch/monthly/" + Props.year + "/" + Props.period.slice(-1));
    });

    it("displays \"no file selected\" panel when the upload doesnt contain a file", async () => {
        const {getByTestId, getByText} = wrapper(render, Props);

        fireEvent.click(getByTestId("import-button"));

        expect(getByText(/No File Selected/i)).toBeTruthy();
    });

    it("selects a file and uploads, returning an OK response and displaying a success panel", async () => {
        const {getByTestId, getByLabelText, getByText} = wrapper(render, Props);

        const inputEl = getByLabelText(/import/i);

        const file = new File(["(⌐□_□)"], "chucknorris.sav", {
            type: "sav"
        });

        Object.defineProperty(inputEl, "files", {
            value: [file]
        });

        fireEvent.change(inputEl);

        fireEvent.click(getByTestId("import-button"));

        await act(async () => {
            await flushPromises();
        });

        expect(getByText(/Survey Uploaded, Starting Import/i)).toBeTruthy();
    });
});