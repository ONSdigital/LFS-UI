import React from "react";

import {SurveyFileUpload} from "./SurveyFileUpload"

import { default as flushPromises } from "../tests/util/flushPromises"
import {render, fireEvent, screen} from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";


describe("GB and NI survey file uploads", () => {
    
    const match = {
        path: "/survey-import/:survey/:week/:month/:year",
        url: "/survey-import/gb/18/5/2019",
        isExact: true,
        params: {survey: "gb", week: "1", month: "1", year: "2019"}
    }

    const Props = {
        period: "Week 1",
        year: "2019",
        surveyType: "gb",
        match: match
    }

    function wrapper(render: any, props: any) {
        return render(
            <BrowserRouter>
               <SurveyFileUpload {...props}/>
            </BrowserRouter>
        );
    }

    it("renders the page", async () => {
        expect(wrapper(render, Props)).toMatchSnapshot()
    })

    it("displays the correct metadata", async () => {
        wrapper(render, Props)

        await act(async () => {
            await flushPromises();
        });

        expect(screen.getByTestId(/metadata-test-0/i).textContent).toEqual(Props.surveyType.toUpperCase())
        expect(screen.getByTestId(/metadata-test-1/i).textContent).toEqual(Props.year.toUpperCase())
        expect(screen.getByTestId(/metadata-test-2/i).textContent).toEqual(Props.period)

    })


})