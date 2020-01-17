import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {cleanup, render} from "@testing-library/react";
import WS from "jest-websocket-mock";
import {FileUploadProgress} from "./FileUploadProgress";
import flushPromises from "../tests/util/flushPromises";


describe("File Upload Progress", () => {
    Enzyme.configure({adapter: new Adapter()});

    afterEach(cleanup);

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

    it("should return Websocket", async () => {
        const server = new WS("ws://127.0.0.1:8000/ws", {jsonProtocol: true});

        const {getByText} = wrapper(render, props);

        /*
        On connection to the server it will return a mock response with the status of a file.
        This would usually be returned after the message is sent from the client (UI)
        but here it is returned immediately on connection for the test
        */
        server.on("connection", _ => {
            server.send({fileName: "file12", percent: 20, status: 1, errorMessage: ""});
            // socket.close({ wasClean: false, code: 1003, reason: "NOPE" });
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
});