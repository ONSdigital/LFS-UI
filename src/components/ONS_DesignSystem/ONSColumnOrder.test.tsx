import React from 'react';
import { shallow, mount } from 'enzyme';
import {ONSColumnOrder} from "./ONSColumnOrder";
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import Enzyme from 'enzyme';

describe("ONS Column Order Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const Props = {
        onClick: sinon.spy()
    }

    function wrapper(render: any, props: any) {
        return render(
            <ONSColumnOrder
                onClick={props.onClick}
            ></ONSColumnOrder>
        )
    }

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));

    it('simulates click events', () => {
        wrapper(mount, Props).find('ONSColumnOrder').simulate('click');
        expect(Props.onClick).toHaveProperty('callCount', 1);
    })

    //maybe check if the up or down is actually doing anything

})