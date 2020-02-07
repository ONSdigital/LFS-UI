import React from "react";

import {Cookies} from "react-cookie";
import {Login} from "./Login";
import {act} from "react-dom/test-utils";

import {default as flushPromises} from "../tests/util/flushPromises";
import {fireEvent, render, screen} from "@testing-library/react";
import sinon from "sinon";
import fetch from "../tests/setup/__mocks__/fetch";
import MockDate from "mockdate";

// @ts-ignore
global.fetch = fetch;
MockDate.set('1955-07-18');

describe("Login Test", () => {

    let mockUser: any = null;
    let mockSetUser = jest.fn();
    const cookie = new Cookies;
    let cookieSpy = sinon.spy(cookie, "set");

    function wrapper(render: any) {
        return render(
            <Login setUser={mockSetUser} user={mockUser} cookies={cookie}/>
        );
    }

    it("allows the user to login successfully", async () => {

        wrapper(render);

        await act(async () => {
            await flushPromises();
        });

        // fill out the form
        await act(async () => {
            await fireEvent.change(screen.getByLabelText(/username/i), {
                target: {value: "Admin"}
            });

            await fireEvent.change(screen.getByTestId(/login-password-input/i), {
                target: {value: "password"}
            });
            await fireEvent.click(screen.getByTestId(/submit/i));
        });

        expect(mockSetUser).toHaveBeenCalledWith({name: "Admin"});

        expect(cookieSpy.called).toBeTruthy();
    });
});

// describe("Login Test", () => {
//     Enzyme.configure({ adapter: new Adapter() });

//     const cookie = new Cookies();
//     // @ts-ignore
//     cookie.HAS_DOCUMENT_COOKIE = false;

//     const Props = {
//     }

//     let setUser = jest.fn()

//     function wrapper(render: any, props: any) {
//         return render(
//             <Login setUser={setUser} user={null} cookies={cookie}/>
//         )
//     }

//     it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));


// })