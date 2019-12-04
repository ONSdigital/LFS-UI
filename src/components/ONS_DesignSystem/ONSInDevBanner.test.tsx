import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import {ONSInDevBanner} from "./ONSInDevBanner";
import Adapter from 'enzyme-adapter-react-16';

describe("ONS In Dev Banner Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    it("should render correctly", () => expect(shallow(<ONSInDevBanner></ONSInDevBanner>).exists()).toEqual(true));
})