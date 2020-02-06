import "jest-styled-components";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import "@testing-library/jest-dom/extend-expect";
import { configure } from "@testing-library/dom";
import '@testing-library/jest-dom'

import fetch from './__mocks__/fetch';

configure({ testIdAttribute: "data-test" });

// @ts-ignore 
global.fetch = fetch;

Enzyme.configure({ adapter: new Adapter() });

// @ts-ignore 
if (global.document)
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    // @ts-ignore 
    commonAncestorContainer: {
      nodeName: "BODY",
      ownerDocument: document,
    },
})


export {};