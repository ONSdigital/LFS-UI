import React from "react"

import { New_Batch } from "./New_Batch";

import {cleanup, fireEvent, render, screen} from "@testing-library/react";

import {BrowserRouter} from "react-router-dom";
import {act} from "react-dom/test-utils";

import fetch from "../tests/setup/__mocks__/fetch.js";
import {default as flushPromises} from "../tests/util/flushPromises";
import { ReactWrapper } from "enzyme";

// @ts-ignore
global.fetch = fetch;

describe("New batch creation - ", () => {
    
    afterEach(() => {
        cleanup();
    });
    
    function wrapper(render: any) {
        return render(
            <BrowserRouter>
                <New_Batch/>
            </BrowserRouter>
        );
    }
    
    it("renders the page", async () => {
        expect(wrapper(render)).toMatchSnapshot();
    });
    
    test("The page redirects successfully on a happy yearly path", async () => {
        wrapper(render)

        // Selecting from drop downs
        await fireEvent.change(screen.getByLabelText(/Batch Type/i), {
            target: {value: "yearly"}
        }); 

        await fireEvent.change(screen.getByLabelText(/Year/i), {
            target: {value: "2015"}
        }); 

        fireEvent.submit(screen.getByTestId(/New-Batch-Form/i))

        await act(async () => {
            await flushPromises();
        });
        
        // expect(screen.getByText(/this page has errors/i))
    })

    test("The page redirects successfully on a quarterly path", async () => {
        wrapper(render)

        // Selecting from drop downs
        await fireEvent.change(screen.getByLabelText(/Batch Type/i), {
            target: {value: "quarterly"}
        }); 

        fireEvent.submit(screen.getByTestId(/New-Batch-Form/i))

        await fireEvent.change(screen.getByLabelText(/Year/i), {
            target: {value: "2015"}
        }); 

        fireEvent.submit(screen.getByTestId(/New-Batch-Form/i))

        await fireEvent.change(screen.getByLabelText(/Period/i), {
            target: {value: "Q1"}
        }); 

        fireEvent.submit(screen.getByTestId(/New-Batch-Form/i))

        await act(async () => {
            await flushPromises();
        });
        
        // expect(screen.getByText(/this page has errors/i))
    })

    test("The page redirects successfully on a monthly path", async () => {
        wrapper(render)

        // Selecting from drop downs
        await fireEvent.change(screen.getByLabelText(/Batch Type/i), {
            target: {value: "monthly"}
        }); 
        
        fireEvent.submit(screen.getByTestId(/New-Batch-Form/i))

        await fireEvent.change(screen.getByLabelText(/Year/i), {
            target: {value: "2015"}
        }); 
        
        fireEvent.submit(screen.getByTestId(/New-Batch-Form/i))

        await fireEvent.change(screen.getByLabelText(/Period/i), {
            target: {value: "1"}
        }); 

        fireEvent.submit(screen.getByTestId(/New-Batch-Form/i))

        await act(async () => {
            await flushPromises();
        });
        
        // expect(screen.getByText(/this page has errors/i))
    })
    
})