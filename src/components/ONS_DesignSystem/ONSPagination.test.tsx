import React from 'react';
import { shallow, mount } from 'enzyme';
import {ONSPagination} from "./ONSPagination";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

describe("ONS Pagination Test", () => {
    Enzyme.configure({ adapter: new Adapter() });

    const Props = {
        
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



})