import React from "react";
import Enzyme, {mount, shallow} from "enzyme";
import {ONSAccordionTable} from "./ONSAccordionTable";
import Adapter from "enzyme-adapter-react-16";
import {DASHBOARD_HEADERS} from "./ONS_TestData/headers";
import {ONSPagination} from "./ONSPagination";
import {ONSPanel} from "./ONSPanel";

interface tableRow {
    id: string
    status: string
}

describe("ONS Accordion Table Test", () => {
    Enzyme.configure({adapter: new Adapter()});

    let emptyData: any = [];

    const singleRowData = [{id: "1", status: "3"}];

    const manyRowData = [{id: "1", status: "3"},
        {id: "1", status: "3"},
        {id: "1", status: "3"},
        {id: "1", status: "3"}];

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
        );
    };

    const DashboardExpandedRow = (rowData: any) => {
        let row: tableRow = rowData.row;
        return (
            <>
                <p>heyyyyyyy</p>
            </>
        );
    };

    const singleRowProps = {
        Headers: DASHBOARD_HEADERS,
        data: singleRowData,
        Row: tableRow,
        expandedRowEnabled: true,
        expandedRow: DashboardExpandedRow,
        noDataMessage: "no data mate 1"
    };

    const falseExSingleRowProps = {
        Headers: DASHBOARD_HEADERS,
        data: singleRowData,
        Row: tableRow,
        expandedRowEnabled: false,
        expandedRow: DashboardExpandedRow,
        noDataMessage: "no data mate 2"
    };

    const emptyProps = {
        Headers: DASHBOARD_HEADERS,
        data: emptyData,
        Row: tableRow,
        expandedRowEnabled: false,
        expandedRow: DashboardExpandedRow,
        noDataMessage: "no data mate 3"
    };

    const trueEmptyProps = {
        Headers: DASHBOARD_HEADERS,
        data: emptyData,
        Row: tableRow,
        expandedRowEnabled: true,
        expandedRow: DashboardExpandedRow,
        noDataMessage: "no data mate 3"
    };

    const manyRowProps = {
        Headers: DASHBOARD_HEADERS,
        data: manyRowData,
        Row: tableRow,
        expandedRowEnabled: true,
        expandedRow: DashboardExpandedRow,
        noDataMessage: "no data mate 4",
        pagination: true,
        paginationSize: 1,
        scrollable: true
    };

    const uManyRowProps = {
        //pagination is undefined
        Headers: DASHBOARD_HEADERS,
        data: manyRowData,
        Row: tableRow,
        expandedRowEnabled: true,
        expandedRow: DashboardExpandedRow,
        noDataMessage: "no data mate 5",
        pagination: true,
        paginationSize: undefined
    };

    const captionProps = {
        Headers: DASHBOARD_HEADERS,
        data: singleRowData,
        Row: tableRow,
        expandedRowEnabled: true,
        expandedRow: DashboardExpandedRow,
        noDataMessage: "no data mate 1",
        caption: "Table Title"
    };

    function wrapper(render: any, props: any) {
        return render(
            <ONSAccordionTable
                Headers={props.Headers}
                data={props.data}
                Row={props.Row}
                expandedRowEnabled={props.expandedRowEnabled}
                expandedRow={props.expandedRow}
                noDataMessage={props.noDataMessage}
                pagination={props.pagination}
                paginationSize={props.paginationSize}
                scrollable={props.scrollable}
                caption={props.caption}>
            </ONSAccordionTable>
        );
    }

    it("should render correctly", () => expect(wrapper(shallow, singleRowProps).exists()).toEqual(true));

    it("should render with the correct headers", () => {
        expect(wrapper(mount, falseExSingleRowProps).find("ONSAccordionTable").getElement().props.Headers).toEqual(falseExSingleRowProps.Headers);
    });

    it("should render with the correct headers", () => {
        expect(wrapper(mount, trueEmptyProps).find("ONSAccordionTable").getElement().props.noDataMessage).toEqual(trueEmptyProps.noDataMessage);
    });

    it("should render wit Caption above Table", () => {
        expect(wrapper(mount, captionProps).find("caption").text()).toEqual(captionProps.caption);
    });

    it("simulates click events", () => {
        let exWrapper = wrapper(mount, singleRowProps);
        let exRow = exWrapper.find("tr.selectableTableRow");
        exRow.simulate("click");
        expect(exRow.find("rowExpanded")).toBeTruthy();

        let unexWrapper = wrapper(mount, falseExSingleRowProps);
        let unexRow = unexWrapper.find("tr.nonSelectableTableRow");
        unexRow.simulate("click");
        expect(unexRow.find("rowExpanded")).not.toEqual(true);

    });

    it("simulates keypress events", () => {
        let thisWrapper = wrapper(mount, uManyRowProps);
        let thisRow = thisWrapper.find("tr.selectableTableRow").at(0);
        thisRow.simulate("keypress", {key: "Enter"});
        expect(thisRow.find("rowExpanded")).toBeTruthy();
        thisRow.simulate("keypress");
        expect(thisRow.find("rowExpanded")).not.toEqual(true);
    });

    it("simulates pageChange event", () => {
        let thisWrapper = wrapper(shallow, manyRowProps);
        let offset = thisWrapper.state("offset");
        thisWrapper.find(ONSPagination).dive().find("li.pagination__item--next").find("button").simulate("click");
        expect(thisWrapper.state("offset")).not.toEqual(offset);
    });

    it("should display a message if the data is empty", () => {
        const thisWrapper = wrapper(mount, emptyProps);
        expect(thisWrapper.find(ONSPanel).find("p").text()).toEqual(emptyProps.noDataMessage);
    });
});