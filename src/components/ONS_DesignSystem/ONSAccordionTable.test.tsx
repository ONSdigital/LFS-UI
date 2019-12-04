import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import {ONSAccordionTable} from "./ONSAccordionTable";
import Adapter from 'enzyme-adapter-react-16';
import {DASHBOARD_HEADERS} from "./ONS_TestData/headers";
import { ONSPagination } from './ONSPagination';
import { ONSPanel } from './ONSPanel';

interface tableRow {
    id: string
    status: string
}

describe("ONS Accordion Table Test", () => {
    Enzyme.configure({ adapter: new Adapter() });
    
    let emptyData: any = []

    const singleRowData = [{id:"1", status:"3"}] 

    const manyRowData = [{id:"1", status:"3"},
                          {id:"1", status:"3"},
                          {id:"1", status:"3"},
                          {id:"1", status:"3"}]

    const tableRow = (rowData: any) => {
        let row: tableRow = rowData.row;
        return (
            <>
                <td className="table__cell ">
                    {row.id}
                </td>
                <td className="table__cell ">
                    {row.status}
                </td>
            </>
    )}

    const DashboardExpandedRow = (rowData: any) => {
        let row: tableRow = rowData.row;
        return (
            <>
                <p>heyyyyyyy</p> 
            </>
        )
    };

    const singleRowProps = {
        Headers: DASHBOARD_HEADERS,
        data: singleRowData,
        Row: tableRow,
        expandedRowEnabled: false,
        expandedRow: DashboardExpandedRow,
        noDataMessage: "no data mate"
    }

    const emptyProps = {
        Headers: DASHBOARD_HEADERS,
        data: emptyData,
        Row: tableRow,
        expandedRowEnabled: false,
        expandedRow: DashboardExpandedRow,
        noDataMessage: "no data mate"
    }

    const manyRowProps = {
        Headers: DASHBOARD_HEADERS,
        data: manyRowData,
        Row: tableRow,
        expandedRowEnabled: true,
        expandedRow: DashboardExpandedRow,
        noDataMessage: "no data mate",
        pagination: true,
        paginationSize: 1,
        scrollable: true
    }

    const uManyRowProps = {
        //pagination is undefined
        Headers: DASHBOARD_HEADERS,
        data: manyRowData,
        Row: tableRow,
        expandedRowEnabled: true,
        expandedRow: DashboardExpandedRow,
        noDataMessage: "no data mate",
        pagination: true,
        paginationSize: undefined
    }

    function wrapper(render: any, props: any) {
        return render(
            <ONSAccordionTable
                Headers= {props.Headers}
                data= {props.data}
                Row= {props.Row}
                expandedRowEnabled= {props.expandedRowEnabled}
                expandedRow= {props.expandedRow}
                noDataMessage= {props.noDataMessage}
                pagination= {props.pagination}
                paginationSize= {props.paginationSize}
                scrollable= {props.scrollable}>
            </ONSAccordionTable>
        )
    }

    it("should render correctly", () => expect(wrapper(shallow, singleRowProps).exists()).toEqual(true));

    it('simulates click events', () => {
        let thisWrapper = wrapper(mount, singleRowProps)
        let thisRow = thisWrapper.find('tr.selectableTableRow')
        thisRow.simulate('click');
        expect(thisRow.find('rowExpanded')).toBeTruthy();
    })

    it('simulates keypress events', () => {
        let thisWrapper = wrapper(mount, uManyRowProps)
        let thisRow = thisWrapper.find('tr.selectableTableRow').at(0)
        thisRow.simulate('keypress', {key: 'Enter'});
        expect(thisRow.find('rowExpanded')).toBeTruthy();   
        thisRow.simulate('keypress')
        expect(thisRow.find('rowExpanded')).not.toEqual(true);
    })

    it('simulates pageChange event', () => {
        let thisWrapper = wrapper(shallow, manyRowProps)
        let offset = thisWrapper.state('offset')
        thisWrapper.find(ONSPagination).dive().find("li.pagination__item--next").find('button').simulate('click')
        expect(thisWrapper.state('offset')).not.toEqual(offset)            
    })

    it('should display a message if the data is empty', () => {
        const thisWrapper = wrapper(mount, emptyProps)
        expect(thisWrapper.find(ONSPanel).find('p').text()).toEqual(emptyProps.noDataMessage)
    })
})