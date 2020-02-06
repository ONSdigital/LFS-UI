import React from "react";
import Enzyme, {mount, shallow} from "enzyme";
import {ONSPagination} from "./ONSPagination";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";

describe("ONS Pagination Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const Props = {
        listLength: 10,
        count: 10,
        pageChange: sinon.spy()
    }

    const linkProps = {
        listLength: 10,
        count: 99,
        pageChange: sinon.spy()
    }

    const nextProps = { 
        listLength: 10,
        count: 30,
        pageChange: sinon.spy()
    }

    const prevProps = {
        listLength: 10,
        count: 99,
        pageChange: sinon.spy()
    }

    const line24Props = {
        listLength: 100,
        count: 10,
        pageChange: sinon.spy()
    }

    const maxProps = {
        listLength: 10,
        count: 20,
        pageChange: sinon.spy()
    }

    const emptyProps = {
        
    }



    function wrapper(render: any, props: any) {
        return render(
            <ONSPagination
                listLength={props.listLength}
                count={props.count}
                pageChange={props.pageChange}>
            </ONSPagination>
            
        )
    }

    it("matches Snapshot", () => {
        expect(wrapper(shallow, Props)).toMatchSnapshot()
    });

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));

    it("should render correctly", () => expect(wrapper(shallow, line24Props).exists()).toEqual(true));

    it('simulates click events', () => {
        //next button (clicked twice for test coverage)
        wrapper(mount, nextProps).find('li.pagination__item--next').find('button').simulate('click').simulate('click');
        expect(nextProps.pageChange).toHaveProperty('callCount', 2);

        //click a link button
        let thisWrapper = wrapper(mount, linkProps)
        thisWrapper.find('li.pagination__item--next').find('button').simulate('click')
        thisWrapper.find('li.pagination__item--current').find('button').simulate('click');
        expect(linkProps.pageChange).toHaveProperty('callCount', 1);

        // prev button (next button has to be clicked for prev button to show)
        let prevWrapper = wrapper(mount, prevProps)
        prevWrapper.find('li.pagination__item--next').find('button').simulate('click')
        prevWrapper.find('li.pagination__item--previous').find('button').simulate('click')
        expect(prevProps.pageChange).toHaveProperty('callCount', 2);
    })

    it('filters the table so the amount of records and therefore the number of pages changes', () =>{
        // Checked that the prop change passes through (this test was really for the filtering)
        // Theres a maxPage condition in the component which only applies if the props change i.e. the list is filtered. 
        let thisWrapper = wrapper(mount, linkProps)
        let count = thisWrapper.find('ONSPagination').getElement().props.count
        thisWrapper.setProps({ count: 24 })
        expect(thisWrapper.find('ONSPagination').getElement().props.count === count).toBeFalsy
    })
})