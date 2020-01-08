import React from "react";

import {SurveyFileUpload} from "./SurveyFileUpload"

import { default as flushPromises } from "../tests/util/flushPromises"
import {render, fireEvent, screen} from '@testing-library/react'

describe("GB and NI survey file uploads", () => {
    
    const Props = {
        period: "period",
        year: "2020",
        surveyType: "GB",
        match: "match"
    }

    function wrapper(render: any, props: any) {
        return render(
            <SurveyFileUpload {...props}/>
        );
    }

    it("renders the page", async () => {
        wrapper(render, Props)
    })
})