import React from 'react';
import { shallow, mount } from 'enzyme';
import {ONSProgressBar} from "./ONSProgressBar";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import {getUploadStatusStyle} from "../../utilities/Common_Functions";

describe("ONS Progress Bar Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const Props = {
        statusCode: 1,
        percentage: 69
    }

    function wrapper(render: any, props: any) {
        return render(
            <ONSProgressBar
                statusCode={props.statusCode}
                percentage={props.percentage}
            />
            
        )
    }

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));

    it("shows the correct status", () => {
        let wrapperStyle = wrapper(mount, Props).find("div.progress-bar-filler").prop('style')
        expect(wrapperStyle).toHaveProperty('background', getUploadStatusStyle(Props.statusCode).hexCode);
    })

    it('shows the correct percentage on the bar', () => {
        let wrapperStyle = wrapper(mount, Props).find("div.progress-bar-filler").prop('style')
        expect(wrapperStyle).toHaveProperty('width', Props.percentage + "%");
    })

})