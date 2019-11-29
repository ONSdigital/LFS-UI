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

    it("Has null order to start (Column order hasn't been clicked yet)", () => {
        let wrapperStyle = wrapper(mount, Props).find('div').prop('style')
        expect(wrapperStyle).toHaveProperty('display', "inline-block")
    })

    it("Image is shown as descending after one click as shown by image)", () => {
        wrapper(mount, Props).find('ONSColumnOrder').simulate('click');
        let wrapperStyle = wrapper(mount, Props).find(ONSColumnOrder).prop('style')
        console.log(wrapperStyle)
        expect(Props.onClick).toHaveProperty('callCount', 1);
    })

    // it("Image is shown as ascending after two clicks as shown by image)", () => {
    //     wrapper(mount, Props).find('ONSColumnOrder').simulate('click')
    //     let wrapperStyle = wrapper(mount, Props).find('img').find({id: 'asc'}).prop('style')
    //     expect(Props.onClick).toHaveProperty('callCount', 2);
    //     // expect(wrapperStyle).toHaveProperty("marginBottom", undefined)
        
    // })

    

    //maybe check if the up or down is actually doing anything

})