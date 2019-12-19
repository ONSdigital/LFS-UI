import React from "react";
import Enzyme, {shallow} from "enzyme";
// import {Login} from "./Login";
import Adapter from "enzyme-adapter-react-16";
import {Cookies} from "react-cookie";
import {Login} from "./Login";

jest.mock("./Login");


describe("Login Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const cookie = new Cookies();
    // @ts-ignore
    cookie.HAS_DOCUMENT_COOKIE = false;

    const Props = {
    }

    let setUser = jest.fn()

    function wrapper(render: any, props: any) {
        return render(
            <Login setUser={setUser} user={null} cookies={cookie}/>
        )
    }

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));



})