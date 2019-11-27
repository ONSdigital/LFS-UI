import React from 'react';
import { shallow, mount } from 'enzyme';
import {ONSStatus} from "./ONSStatus";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

describe("ONS Status Test", () => {
    Enzyme.configure({ adapter: new Adapter() })

    const statusProps = {
        label: "success",
        small: true,
        status: "success"
    }

    const smallStatusProps = {
        label: "error",
        small: false,
        status: "error"
    }

    function wrapper(render: any, props: any) {
        return render(
            <ONSStatus  label={props.label}
                        small={props.small}
                        status={props.status}>
            </ONSStatus>
        )
    }
    
    it("should render correctly", () => expect(wrapper(shallow, statusProps).exists()).toEqual(true));
    
    it('displays a small status', () => {
        expect(wrapper(mount, smallStatusProps).find('span').hasClass('status--error')).toEqual(true)
    })
})