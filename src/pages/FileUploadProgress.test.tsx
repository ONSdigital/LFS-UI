import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {cleanup, render} from "@testing-library/react";
import WS from "jest-websocket-mock";
import {FileUploadProgress} from "./FileUploadProgress";
import flushPromises from "../tests/util/flushPromises";


describe("File Upload Progress", () => {
    Enzyme.configure({adapter: new Adapter()});

    let server: WS;

    beforeEach(() => {
        server = new WS("ws://127.0.0.1:8000/ws", {jsonProtocol: true});
    });

    afterEach(() => {
        cleanup();
        server.close();
    });

    const props = {
        importName: "File",
        fileName: "file12",
        hidden: false,
        fileUploading: jest.fn(),
        setPanel: jest.fn(),
        redirectOnComplete: jest.fn()
    };

    function wrapper(render: any, props: any) {
        return render(
            <FileUploadProgress {...props}/>
        );
    }

    it("should return update and show the progress from the Websocket messages", async () => {
        const {getByText} = wrapper(render, props);

        server.on("connection", socket => {
            console.log("Server Connection");

            socket.on("message", function incoming(message) {
                console.log("Received from client:  %s", message);
                server.send({fileName: "file12", percent: 20, status: 1, errorMessage: ""});
            });
        });

        await server.connected;

        // Check that the mocked server receives the request the the status of the file import
        await expect(server).toReceiveMessage({
            "fileName": "file12"
        });

        await flushPromises();

        let importStatus = getByText(/Importing/i);

        // Confirm import status is shown on screen from the websocket response
        expect(importStatus.textContent).toEqual("Importing: 20%");
        console.log();

        // Send a Import Complete status
        await server.send({fileName: "file12", percent: 100, status: 2, errorMessage: ""});

        await flushPromises();

        expect(importStatus.textContent).toEqual("Import Complete");
    });

    it("should display an error based on a error from the websocket", async () => {
        const {getByText} = wrapper(render, props);

        server.on("connection", socket => {
            console.log("Server Connection");

            socket.on("message", function incoming(message) {
                console.log("Received from client:  %s", message);
                server.send({fileName: "file12", percent: 20, status: 1, errorMessage: ""});
            });
        });

        await server.connected;

        // Check that the mocked server receives the request the the status of the file import
        await expect(server).toReceiveMessage({
            "fileName": "file12"
        });

        await flushPromises();

        let importStatus = getByText(/Importing/i);

        // Confirm import status is shown on screen from the websocket response
        expect(importStatus.textContent).toEqual("Importing: 20%");
        console.log();

        // Send a Import Failed status
        await server.send({fileName: "file12", percent: 100, status: 3, errorMessage: "\"File Was not a good file\""});

        await flushPromises();

        expect(importStatus.textContent).toEqual("Failed");

        // Confirm that Error message is being passed to the Set Panel Function
        expect(props.setPanel).toBeCalledWith("\"File Was not a good file\"", "error", true);
    });
});