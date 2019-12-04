import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { ONSTable } from "./ONSTable";
import Adapter from 'enzyme-adapter-react-16';
import {tableData} from './ONS_TestData/dataSources'

describe("ONS Table Test", () => {
    Enzyme.configure({ adapter: new Adapter() });
    

    const Props = {
        Title: "Da Table",
        Data: tableData,
        Pagination: false
    }

    function wrapper(render: any, props: any) {
        return render(
            <ONSTable
                Title={props.Title}
                Data={props.Data}
                Headers={props.Headers}
                Pagination={props.Pagination}
                Steps={props.Steps}
                pageChange={props.pageChange}
                Create={props.Create}
                openModal={props.openModal}
                openUploadmodal={props.openUploadmodal}>
            </ONSTable>
        )
    }

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));
    
})