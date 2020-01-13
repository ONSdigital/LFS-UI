import React from "react";
// Testing Modules
import Enzyme, {mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";
// Project Modules
import {Cookies} from "react-cookie";
import Logout from "./Logout";
import {BrowserRouter} from "react-router-dom";

describe("Logout Page Test", () => {
    Enzyme.configure({adapter: new Adapter()});

    let mockUser: any = null;
    let mockSetUser = jest.fn();
    const cookie = new Cookies;
    let cookieSpy = sinon.spy(cookie, "remove");

    beforeEach(() =>{
        delete window.location;
        // @ts-ignore - added so it doesnt have all other unused parameters
        // Mock the window.location for the Logout page
        window.location = {href: "/logout"};
    });

    function wrapper(render: any) {
        return render(
            <BrowserRouter>
                <Logout setUser={mockSetUser} user={mockUser} cookies={cookie}/>
            </BrowserRouter>
        );
    }

    it("should render correctly", () => expect(wrapper(shallow).exists()).toEqual(true));

    it("Should remove the users cookie on logout", async () => {
        // Mount the logout page
        wrapper(mount);

        // Check that setUser is being passed a null to clear user
        expect(mockSetUser).toHaveBeenCalledWith(null);

        // Check that the cookie provider passed in is called
        expect(cookieSpy.called).toBeTruthy();
    });

    test("On logout, setUser should be being passed a null to remove the user from state", async () => {
        // Mount the logout page
        wrapper(mount);

        // Check that setUser is being passed a null to remove user from state
        expect(mockSetUser).toHaveBeenCalledWith(null);
    });

    it("Should redirect the user to the login page with logout as a parameter", () => {
        // Mount the logout page
        wrapper(mount);

        // Check that window.location is changed to redirect the user to the login page.
        expect(window.location.href).toEqual("/?logout");
    });


});