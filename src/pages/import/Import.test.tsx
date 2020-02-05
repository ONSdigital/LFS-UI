import React from "react"

import {Import} from "./Import"

import { default as flushPromises } from "../../tests/util/flushPromises"
import {render, fireEvent, screen, cleanup} from '@testing-library/react'

import { BrowserRouter } from "react-router-dom"
import { act } from "react-dom/test-utils";

import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import fetch from '../../tests/setup/__mocks__/fetch.js';

import '@testing-library/jest-dom';
import { getMonthandYear } from "../../tests/util/getMonthandYear"

// @ts-ignore 
global.fetch = fetch;
// @ts-ignore 
global.URL.createObjectURL = jest.fn();

// @ts-ignore 
if (global.document)
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    // @ts-ignore 
    commonAncestorContainer: {
      nodeName: "BODY",
      ownerDocument: document,
    },
})

const designWeightsMatch = {
    path: "/import/:file?",
    url: "/import/APS Design Weights",
    isExact: true,
    params: {file: "APS Design Weights"}
}

const bulkAmendmentsMatch = {
    path: "/import/:file?",
    url: "/import/Bulk Amendments",
    isExact: true,
    params: {file: "Bulk Amendments"}
}

const geogClassMatch = {
    path: "/import/:file?",
    url: "/import/Geographical Calculations",
    isExact: true,
    params: {file: "Geographical Calculations"}
}

const populationEstimatesMatch = {
    path: "/import/:file?",
    url: "/import/Population Estimates",
    isExact: true,
    params: {file: "Population Estimates"}
}

const valueLabelsMatch = {
    path: "/import/:file?",
    url: "/import/Value Labels",
    isExact: true,
    params: {file: "Value Labels"}
}

const variableDefinitionsMatch = {
    path: "/import/:file?",
    url: "/import/Variable Definitions",
    isExact: true,
    params: {file: "Variable Definitions"}
}

const APSHouseholdMatch = {
    path: "/import/:file?",
    url: "/import/APS Household Variable Specification",
    isExact: true,
    params: {file: "APS Household Variable Specification"}
}

const APSPersonMatch = {
    path: "/import/:file?",
    url: "/import/APS Person Variable Specification",
    isExact: true,
    params: {file: "APS Person Variable Specification"}
}

const eurostatMatch = {
    path: "/import/:file?",
    url: "/import/Eurostat Variable Specification",
    isExact: true,
    params: {file: "Eurostat Variable Specification"}
}

const LFSHouseholdMatch = {
    path: "/import/:file?",
    url: "/import/LFS Household Variable Specification",
    isExact: true,
    params: {file: "LFS Household Variable Specification"}
}

const LFSPersonMatch = {
    path: "/import/:file?",
    url: "/import/LFS Person Variable Specification",
    isExact: true,
    params: {file: "LFS Person Variable Specification"}
}


function Props(input: any) {
    return {
        match: input
    }
}

function wrapper(render: any, props: any){
        return render(
            <BrowserRouter>
                <Import {...props}/>
            </BrowserRouter>
        )
}

let renderAndImport = (match: any, render: any, fileName?: string) => {
    wrapper(render, Props(match))

    const inputEl = screen.getByLabelText(/import/i);

    let file;
    if (fileName) file = new File(["(⌐□_□)"], fileName + ".csv", {type: "csv"});
    else file = new File(["(⌐□_□)"], match.params.file + ".csv", {type: "csv"});

    Object.defineProperty(inputEl, "files", {
        value: [file]
    });
    
    fireEvent.change(inputEl);
}

Enzyme.configure({adapter: new Adapter()});

describe("Import page snapshot rendering", () => {
    // Here we are testing if each import renders and matches the snapshot
    afterEach(cleanup);
    
    // Imports visible on import overview
    it("renders the APS design weights page correctly", () => {
        expect(wrapper(render, Props(designWeightsMatch))).toMatchSnapshot()
    })

    it("renders the bulk amendments page correctly", () => {
        expect(wrapper(render, Props(bulkAmendmentsMatch))).toMatchSnapshot()
    })

    it("renders the geographical classifications page correctly", () => {
        expect(wrapper(render, Props(geogClassMatch))).toMatchSnapshot()
    })

    it("renders the population estimates page correctly", () => {
        expect(wrapper(render, Props(populationEstimatesMatch))).toMatchSnapshot()
    })

    it("renders the value labels page correctly", () => {
        expect(wrapper(render, Props(valueLabelsMatch))).toMatchSnapshot()
    })
    
    it("renders the variable definitions page correctly", () => {
        expect(wrapper(render, Props(variableDefinitionsMatch))).toMatchSnapshot()
    })

    //Imports from output spec
    it("renders the APS household variable specification page correctly", () => {
        expect(wrapper(render, Props(APSHouseholdMatch))).toMatchSnapshot()
    })

    it("renders the APS person variable specification page correctly", () => {
        expect(wrapper(render, Props(APSPersonMatch))).toMatchSnapshot()
    })

    it("renders the eurostat variable specification page correctly", () => {
        expect(wrapper(render, Props(eurostatMatch))).toMatchSnapshot()
    })

    it("renders the LFS household specification page correctly", () => {
        expect(wrapper(render, Props(LFSHouseholdMatch))).toMatchSnapshot()
    })

    it("renders the LFS person specification page correctly", () => {
        expect(wrapper(render, Props(LFSPersonMatch))).toMatchSnapshot()
    })
})

describe("Import page functionality", () => {
    // Here we are testing the page functionality covering all the states the page could be in
    afterEach(cleanup);

    test("breadcrumb points to the correct url", async () => {
        //testing an output file as they have two breadcrumbs
        let breadWrapper = wrapper(mount, Props(APSPersonMatch))
        
        //Home breadcrumb links to Home
        expect(breadWrapper.find("ONSBreadcrumbs").getElement().props.List[0].link).toEqual("import/overview")

        //manage batch breadcrumb links to the correct manage batch page
        expect(breadWrapper.find("ONSBreadcrumbs").getElement().props.List[1].link).toEqual('import/output')
    })

    it('displays "no file selected" panel when the upload doesnt contain a file', async () => {
        const { getByText }  = wrapper(render, Props(designWeightsMatch))

        fireEvent.click(getByText(/submit/i))

        expect(getByText(/No File Selected/i)).toBeTruthy();
    });

    it('shows the correct panels and correct date for the date input', async () => {
        renderAndImport(variableDefinitionsMatch, render)
        
        fireEvent.click(screen.getByText(/submit/i))

        //no date has been selected when submitting so 'no date selected panel' shows
        expect(screen.getByText(/no date selected/i))
        
        fireEvent.click(screen.getByTestId(/text-input/i))
        
        fireEvent.click(screen.getByText(String(17)))
        
        //date has been selected and is displayed in the date input
        expect(screen.getByTestId(/text-input/i)).toHaveAttribute("value", getMonthandYear("/", 17))

        fireEvent.click(screen.getByText(/submit/i))

        await act(async () => {
            await flushPromises();
        });

        // Correct file is uploaded and shows the correct panel
        expect(screen.getByText(/Variable Definitions: File Uploaded Successfully/i))
    })

    // TODO
    // test('the dropdowns on the output spec imports function correctly', async () => {
    //     renderAndImport(APSHouseholdMatch, render)

    //     fireEvent.click(screen.getByText(/submit/i))

    //     // File submitted with no year
    //     expect(screen.getAllByText(/please select a year/i))
    //     // console.log(screen.getByLabelText(/year/i))
    //     console.log(screen.getByTestId(/option-year/i))

    //     fireEvent.click(screen.getByTestId(/option-year/i))
    //     // console.log(screen.getByLabelText(/year/i))
    //     console.log(screen.getByTestId(/option-year/i))
    //     fireEvent.click(screen.getByText("2020"))
    //             expect(screen.getByLabelText(/yearrrr/i)).toHaveAttribute("value", "2020")

    // })
})

describe("Importing files and handling", () => {
    // Here we are testing the imports which are distinctive, they have a websocket or modal etc
    afterEach(cleanup);

    it('selects a design weights file and uploads, returning an OK response and displaying a success panel', async () => {
        renderAndImport(designWeightsMatch, render)
        
        fireEvent.click(screen.getByText(/submit/i))

        await act(async () => {
            await flushPromises();
        });
        
        expect(screen.getByText(/APS Design Weights: File Uploaded Successfully/i)).toBeTruthy();
    });

    it('selects a population estimates file and uploads, returning an OK response, displaying a success panel and a download button', async () => {
        renderAndImport(populationEstimatesMatch, render)

        fireEvent.click(screen.getByText(/submit/i))

        await act(async () => {
            await flushPromises();
        });

        expect(screen.getByText(/Population Estimates: File Uploaded Successfully/i)).toBeTruthy();

        fireEvent.click(screen.getByText(/download report/i))
        


        await act(async () => {
            await flushPromises();
        });

        // Expect the panel to show the report has been exported
        expect(screen.getByText(/Report Exported/i)).toBeTruthy();

    })

    it('selects a bulk ammendments file and validates, returning an OK response, displaying a modal, then the file is accepted and imported', async () => {
        renderAndImport(bulkAmendmentsMatch, render)

        fireEvent.click(screen.getByText(/submit/i))

        await act(async () => {
            await flushPromises();
        });

        // Bulk amendment file validates and responds with success
        expect(screen.getByText(/validation completed with no errors/i)).toBeTruthy();

        fireEvent.click(screen.getByTestId(/accept-button/i))
        
        await act(async () => {
            await flushPromises();
        });

        // Bulk amendment file imports and responds with success
        expect(screen.getAllByText(/Bulk Amendments: File Uploaded Successfully/i)).toBeTruthy();

        // Close the modal
        fireEvent.click(screen.getByText(/close/i))

        // Return to import overview
        fireEvent.click(screen.getByText(/return to import overview/i))

    })

    it('selects a bulk ammendments file and validates, returning an unmatched response, displaying a modal, it is then rejected', async () => {
        renderAndImport(bulkAmendmentsMatch, render, "Bulk Amendments Reject")

        fireEvent.click(screen.getByText(/submit/i))

        await act(async () => {
            await flushPromises();
        });

        // Bulk amendment file validates and responds with success
        expect(screen.getAllByText(/Unmatched items in Bulk Amendments file/i)).toBeTruthy();

        fireEvent.click(screen.getByText(/reject/i))

        // Modal is closed when reject button is clicked
        expect(screen.queryByText(/reject/i)).toBeNull()
    })
})