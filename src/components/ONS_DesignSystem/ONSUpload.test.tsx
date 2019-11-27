import React from 'react';
import { shallow, mount } from 'enzyme';
import {ONSUpload} from "./ONSUpload";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

describe("ONS Upload Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const Props = {
    }

    function wrapper(render: any, props: any) {
        return render(
            <ONSUpload
                label={props.label}
                description={props.description}
                fileName={props.fileName}
                fileID={props.fileID}
                accept={props.accept}
                onChange={props.onChange}>
            </ONSUpload>
            
        )
    }

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));



})