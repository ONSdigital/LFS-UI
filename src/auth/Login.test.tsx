import React from "react";
// Testing Modules
import Enzyme, {mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {waitForState} from "enzyme-async-helpers";
import sinon from "sinon";
// Project Modules
import {Cookies} from "react-cookie";
import {Login} from "./Login";
// Mocked Auth
jest.mock("./auth");

describe("Login Page Test", () => {
    Enzyme.configure({adapter: new Adapter()});

    // Function to fill in Login Form
    let fillInLoginFormAndSubmit = (wrapper: any, username: string, password: string) => {
        // Fill in Username Input Field
        wrapper.find("input#username").simulate("change", {target: {value: username}});

        expect(wrapper.find("input#username").instance().value).toEqual(username);

        // Fill in Password Input Field
        wrapper.find("input#password").simulate("change", {target: {value: password}});

        expect(wrapper.find("input#password").instance().value).toEqual(password);

        // Submit form
        wrapper.find("#loginForm").simulate("submit");
    };

    let mockUser: any = null;
    let mockSetUser = jest.fn();
    const cookie = new Cookies;
    let cookieSpy = sinon.spy(cookie, "set");


    function wrapper(render: any) {
        return render(
            <Login setUser={mockSetUser} user={mockUser} cookies={cookie}/>
        );
    }

    it("should render correctly", () => expect(wrapper(shallow).exists()).toEqual(true));

    it("Should shows the user an Error when incorrect details are entered", async () => {
        let loginPage = wrapper(mount);

        fillInLoginFormAndSubmit(loginPage, "Admin", "bacon");

        // @ts-ignore
        // Wait for Panel to be shown
        await waitForState(loginPage, state => state.panel.visible === true);

        // Check that setUser is being passed the null for incorrect user details
        expect(mockSetUser).toHaveBeenCalledWith(null);

        // Check username input field have been set back to blank
        expect(loginPage.find("input#username").instance().value).toEqual("");

        // Check that error Panel has error message shown
        expect(loginPage.find(".panel__body").text()).toEqual("Credentials entered are incorrect");
    });

    it("Should pass back the new user to the Props when correct details are entered", async () => {
        let loginPage = wrapper(mount);

        fillInLoginFormAndSubmit(loginPage, "Admin", "password");

        // @ts-ignore
        // Wait for Panel to be shown
        await waitForState(loginPage, state => state.panel.visible === true);

        // Check username input field have been set back to blank
        expect(loginPage.find("input#username").instance().value).toEqual("");

        // Check that setUser is being passed the user details
        expect(mockSetUser).toHaveBeenCalledWith({name: "Admin"});

        // Check that the cookie provider passed in is called
        expect(cookieSpy.called).toBeTruthy();
    });

    it("Should Show a successful logout message when redirected from the logout page", () => {
        delete window.location;
        // @ts-ignore - added so it doesnt have all other unused parameters
        window.location = {search: "logout"};

        // Check that search params in pathname is mocked correctly
        expect(window.location.search).toEqual("logout");

        let loginPage = wrapper(mount);

        // Check that Panel has shows the successful log out message
        expect(loginPage.find(".panel__body").text()).toEqual("Successfully Logged Out");

    });


});