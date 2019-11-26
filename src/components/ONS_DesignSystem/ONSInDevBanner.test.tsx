import React from 'react';
import { shallow, mount } from 'enzyme';
import {ONSInDevBanner} from "./ONSInDevBanner";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

describe("ONS In Dev Banner Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    it("should render correctly", () => expect(shallow(<ONSInDevBanner></ONSInDevBanner>).exists()).toEqual(true));
})