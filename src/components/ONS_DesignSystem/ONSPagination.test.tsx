import React from 'react';
import { shallow, mount } from 'enzyme';
import {ONSPagination} from "./ONSPagination";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import sinon from 'sinon'

describe("ONS Pagination Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const Props = {
        steps: 5,
        count: 2,
        pageChange: sinon.spy()
    }

    const countGreaterProps = {
        steps: 1,
        count: 5,
        pageChange: sinon.spy()
    }

    const emptyProps = {
        
    }



    function wrapper(render: any, props: any) {
        return render(
            <ONSPagination
                steps={props.steps}
                count={props.count}
                pageChange={props.pageChange}>
            </ONSPagination>
            
        )
    }

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));

    it("should render correctly", () => expect(wrapper(shallow, countGreaterProps).exists()).toEqual(true));
    it("should render correctly", () => expect(wrapper(shallow, emptyProps).exists()).toEqual(true));

    it.skip('simulates click events', () => {
        console.log(wrapper(mount, Props).find('li.pagination__item--previous'))
        console.log(wrapper(mount, Props).find('li.pagination__item--previous').find('button'))
        wrapper(shallow, Props).find('button').simulate('click');
        expect(Props.pageChange).toHaveProperty('callCount', 1);
    })
})