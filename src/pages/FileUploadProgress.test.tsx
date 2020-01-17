import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {render} from "@testing-library/react";
import WS from "jest-websocket-mock";
import {FileUploadProgress} from "./FileUploadProgress";


describe("File Upload Progress", () => {
    Enzyme.configure({adapter: new Adapter()});


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

        const server = new WS("ws://127.0.0.1:8000/ws", { jsonProtocol: true });
        // const server = new WS("ws://127.0.0.1:8000/ws");
        let fileUploadPage = wrapper(render, props);

        await server.connected;

        server.on("message", (socket: any) => {
            console.log("onMessage");

            server.send({fileName: "file12", percent: 20, status: 3, errorMessage: "fileName not found - Mock"});

            // socket.close({ wasClean: false, code: 1003, reason: "NOPE" });
        });

        await expect(server).toReceiveMessage({
            "fileName": "file12"
        });

        console.log(fileUploadPage.screen)

        let importStatus = fileUploadPage.screen.getByText(/Import Progress/i);

        console.log(importStatus.textContent)

        expect(server).toHaveReceivedMessages([
            { type: "GREETING", payload: "hello" },
        ]);

        // const client1 = new WebSocket("ws://localhost:1234");
        // await server.connected;
        // const client2 = new WebSocket("ws://localhost:1234");
        //
        // const messages = {client1: [], client2: []};
        // client1.onmessage = e => {
        //     messages.client1.push(e.data);
        // };
        // client2.onmessage = e => {
        //     messages.client2.push(e.data);
        // };
        //
        // server.send("hello everyone");
        // expect(messages).toEqual({
        //     client1: ["hello everyone"],
        //     client2: ["hello everyone"]
        // });
    });
});