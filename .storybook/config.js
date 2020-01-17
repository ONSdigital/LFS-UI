import {addDecorator} from "@storybook/react";
// automatically import all files ending in *.stories.js
// configure(require.context('../src', true, /\.stories\.tsx?$/), module);
import React from "react";
import results from "../.jest-test-results.json";
import {withTests} from "@storybook/addon-jest";


addDecorator(
    withTests({
        results,
    })
);
addDecorator(storyFn => <div style={{ margin: 30 }}>{storyFn()}</div>);
