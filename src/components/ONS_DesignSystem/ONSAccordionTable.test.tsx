import React from "react";
import Enzyme, {mount, shallow} from "enzyme";
import {ONSAccordionTable} from "./ONSAccordionTable";
import Adapter from "enzyme-adapter-react-16";
import {DASHBOARD_HEADERS} from "./ONS_TestData/headers";
import {ONSPagination} from "./ONSPagination";
import {ONSPanel} from "./ONSPanel";
import {fireEvent, render, screen} from "@testing-library/react";
import {default as flushPromises} from "../../tests/util/flushPromises";

interface tableRow {
    id: string
    status: string
}

describe("ONS Accordion Table Test", () => {
    Enzyme.configure({adapter: new Adapter()});

    let emptyData: any = [];

    const singleRowData = [{id: "1", status: "3"}];

    const manyRowData = [
        {id: 1, status: "1"},
        {id: 2, status: "2"},
        {id: 3, status: "3"}];

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
        noDataMessage: "data mate 1"
    };

    const falseExSingleRowProps = {
        Headers: DASHBOARD_HEADERS,
        data: singleRowData,
        Row: tableRow,
        expandedRowEnabled: false,
        expandedRow: DashboardExpandedRow,
        noDataMessage: "info in your data mate 2"
    };

    const emptyProps = {
        Headers: DASHBOARD_HEADERS,
        data: emptyData,
        Row: tableRow,
        expandedRowEnabled: false,
        expandedRow: DashboardExpandedRow,
        noDataMessage: "error in your data mate 3"
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

    const manyRowPropsNoExpansion = {
        Headers: DASHBOARD_HEADERS,
        data: manyRowData,
        Row: tableRow,
        expandedRowEnabled: false,
        noDataMessage: "no data mate 4",
        pagination: false
    };

    const manyRowPropsNoExpansionPagination = {
        Headers: DASHBOARD_HEADERS,
        data: manyRowData,
        Row: tableRow,
        expandedRowEnabled: false,
        noDataMessage: "no data mate 4",
        pagination: true,
        paginationSize: 2,
    };

    const uManyRowProps = {
        //pagination is undefined
        Headers: DASHBOARD_HEADERS,
        data: manyRowData,
        Row: tableRow,
        expandedRowEnabled: true,
        expandedRow: DashboardExpandedRow,
        expandedAdditionalRows: true,
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
                {...props}>
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

    it("should render with Caption above Table", () => {
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

    it("should reorder the table when you click a sortable column header ", async () => {
        wrapper(render, manyRowPropsNoExpansion);

        // ---------------------- Check default order ----------------------
        // Get list Items
        let list = screen.queryAllByTestId(/table-row/i);
        let listItemOne = list[0];
        let listItemThree = list[2];

        // Check if status column for first item is in default order
        let secondColumnValue = listItemOne.children[0].textContent;
        expect(secondColumnValue).toEqual("1");

        // Check if status column for third item has in default order
        secondColumnValue = listItemThree.children[0].textContent;
        expect(secondColumnValue).toEqual("3");

        // ---------------------- Change order to descending by second column ----------------------

        // Click on the header to change order
        await fireEvent.click(screen.getByText(/Status/i));
        await flushPromises();

        // Get list Items again
        list = screen.queryAllByTestId(/table-row/i);
        listItemOne = list[0];
        listItemThree = list[2];

        // Check if status column for first item is descending by Status column
        secondColumnValue = listItemOne.children[1].textContent;
        expect(secondColumnValue).toEqual("3");

        // Check if status column for third item is descending by Status column
        secondColumnValue = listItemThree.children[1].textContent;
        expect(secondColumnValue).toEqual("1");

        // ---------------------- Change order to ascending by second column ----------------------

        // Click on the header to change order Again
        await fireEvent.click(screen.getByText(/Status/i));
        await flushPromises();

        // Get list Items
        list = screen.queryAllByTestId(/table-row/i);
        listItemOne = list[0];
        listItemThree = list[2];

        // Check if status column for first item is ascending by Status column
        secondColumnValue = listItemOne.children[1].textContent;
        expect(secondColumnValue).toEqual("1");

        // Check if status column for third item is ascending by Status column
        secondColumnValue = listItemThree.children[1].textContent;
        expect(secondColumnValue).toEqual("3");
    });

    it("should reorder the table when you click a sortable column header across pages in a pagination table", async () => {
        wrapper(render, manyRowPropsNoExpansionPagination);

        // Click the next button in the pagination
        await fireEvent.click(screen.getByText(/Next/i));
        await flushPromises();

        // Get list Items for the next page
        let list = screen.queryAllByTestId(/table-row/i);
        let listItemOne = list[0];

        // Check if status column for first item on the second page is the default third item
        let secondColumnValue = listItemOne.children[1].textContent;
        expect(secondColumnValue).toEqual("3");

        // Click on the header to change order
        await fireEvent.click(screen.getByText(/Status/i));
        await flushPromises();


        // Get list Items for the next page
        list = screen.queryAllByTestId(/table-row/i);
        listItemOne = list[0];

        // list.forEach((item) => console.log(item.children[0].textContent + " - " + item.children[1].textContent))

        // Check if status column for first item on the second page is ascending by Status column
        secondColumnValue = listItemOne.children[1].textContent;
        expect(secondColumnValue).toEqual("1");
    });
});