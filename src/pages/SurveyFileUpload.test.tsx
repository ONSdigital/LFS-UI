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
import WS from "jest-websocket-mock";
import MockDate from "mockdate";

// @ts-ignore
global.fetch = fetch;
MockDate.set('2015-01-21');


describe("GB and NI survey file uploads", () => {
    Enzyme.configure({adapter: new Adapter()});

    let server: WS;

    beforeEach(() => {
        server = new WS("ws://127.0.0.1:8000/ws", {jsonProtocol: true});
    });

    afterEach(() => {
        cleanup();
        server.close();
    });

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

    /*
    Function to Mock a file in the File Selection, then press the Submit button
     */
    async function selectAndImportFile(getByTestId: any, getByLabelText: any, fileName: string) {
        const inputEl = getByLabelText(/import/i);

        const file = new File(["(⌐□_□)"], fileName, {
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

    it("displays file upload history in the table", async () => {
        const {getByTestId, getByText} = wrapper(render, Props);

        await act(async () => {
            await flushPromises();
        });

        expect(getByText(/Insert survey row failed/i)).toBeTruthy();
    });

    it("displays message in table when survey has not been imported before", async () => {
        const {getByTestId, getByText} = wrapper(render, PropsNI);

        await act(async () => {
            await flushPromises();
        });

        expect(getByText(/Survey has not been previously imported/i)).toBeTruthy();
    });

    it("displays \"no file selected\" panel when the upload doesnt contain a file", async () => {
        const {getByTestId, getByText} = wrapper(render, Props);

        fireEvent.click(getByTestId("import-button"));

        let panel = await getByTestId(/import=panel/i);
        expect(panel.textContent).toEqual("No File Selected");
    });

    it("selects a file and uploads, returning an OK response and displaying a success panel", async () => {
        const {getByTestId, getByLabelText, getByText} = wrapper(render, Props);

        await selectAndImportFile(getByTestId, getByLabelText, "GB_File.sav");

        let panel = await getByTestId(/import=panel/i);
        expect(panel.textContent).toContain("Survey Uploaded, Starting Import");
    });

    it("selects a file and fails to upload, returning an ERROR response and displaying a error panel", async () => {
        const {getByTestId, getByLabelText, getByText} = wrapper(render, Props);

        await selectAndImportFile(getByTestId, getByLabelText, "GB_File_invalid_file.sav");

        let panel = await getByTestId(/import=panel/i);
        expect(panel.textContent).toEqual("Error Occurred while Uploading File: Error Occurred");
    });

    it("selects a file and it can't connect to the server, it should display the error panel", async () => {
        const {getByTestId, getByLabelText, getByText} = wrapper(render, Props);

        await selectAndImportFile(getByTestId, getByLabelText, "GB_File_server_not_online.sav");

        let panel = await getByTestId(/import=panel/i);
        expect(panel.textContent).toEqual("Error Occurred while Uploading File: Unable to Connect to Server");
    });

    test("when an import is successful the page should redirect back to the Manage Batch page with the summary", async () => {
        delete window.location;
        // @ts-ignore - added so it doesnt have all other unused parameters
        window.location = {href: "/survey-import/gb/1/1/2019"};

        server.on("connection", socket => {
            console.log("Server Connection");

            socket.on("message", function incoming(message) {
                console.log("Received from client:  %s", message);
                server.send({fileName: "file12", percent: 100, status: 2, errorMessage: ""});
            });
        });

        const {getByTestId, getByLabelText, getByText} = wrapper(render, Props);

        await server.connected;

        await selectAndImportFile(getByTestId, getByLabelText, "GB_File.sav");

        // Send a Import Complete status
        await server.send({fileName: "file12", percent: 100, status: 2, errorMessage: ""});

        await flushPromises();

        expect(window.location.href).toEqual("/manage-batch/monthly/2019/1/GB-1-1-2019");
        server.close();
    });

    test("when you load the page and a import is successful but an new Import is not been started, it should NOT redirect back to the Manage Batch page", async () => {
        delete window.location;
        // @ts-ignore - added so it doesnt have all other unused parameters
        window.location = {href: "/survey-import/gb/1/1/2019"};

        /*:
        On connection to the server it will return a mock response with the status of a file.
        This would usually be returned after the message is sent from the client (UI)
        but here it is returned immediately on connection for the test
        */
        server.on("connection", _ => {
            server.send({fileName: "file12", percent: 100, status: 2, errorMessage: ""});
            // socket.close({ wasClean: false, code: 1003, reason: "NOPE" });
        });

        const {getByTestId, getByLabelText, getByText} = wrapper(render, Props);

        await server.connected;

        await flushPromises();

        // Make sure the page has not changed
        expect(window.location.href).toEqual("/survey-import/gb/1/1/2019");
    });

    it("selects a file and an unknown error is returned, display error", async () => {
        const {getByTestId, getByLabelText, getByText} = wrapper(render, PropsNI);

        await selectAndImportFile(getByTestId, getByLabelText, "NI_File_unknown_error.sav");

        let panel = await getByTestId(/import=panel/i);
        expect(panel.textContent).toEqual("File Failed to Upload");
    });

    it("selects a file and an error is returned, display error with message", async () => {
        const {getByTestId, getByLabelText, getByText} = wrapper(render, PropsNI);

        await selectAndImportFile(getByTestId, getByLabelText, "NI_File_weird_error.sav");

        let panel = await getByTestId(/import=panel/i);
        expect(panel.textContent).toEqual("Error Occurred while Uploading File: Something strange has Occurred here");
    });

    test("that the websocket is called very 3 seconds", async () => {
        jest.useFakeTimers();

        server.on("connection", socket => {
            console.log("Server Connection");

            socket.on("message", function incoming(message) {
                console.log("Received from client:  %s", message);
                server.send({fileName: "file12", percent: 100, status: 2, errorMessage: ""});
            });
        });

        wrapper(render, Props);

        jest.advanceTimersByTime(1000);

        await server.connected;

        // Check the server has received the first request
        expect(server.messages.length).toEqual(1);

        jest.advanceTimersByTime(2500);

        // Check the server has received the second request from the setTimeout
        expect(server.messages.length).toEqual(2);

        jest.advanceTimersByTime(6000);

        expect(server.messages.length).toEqual(4);

        jest.useRealTimers();
    });
});