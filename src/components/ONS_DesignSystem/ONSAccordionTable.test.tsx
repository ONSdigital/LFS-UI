import React from 'react';
import { shallow, mount } from 'enzyme';
import {ONSAccordionTable} from "./ONSAccordionTable";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import {DASHBOARD_HEADERS} from "./ONS_DesignSystem_TestData/headers";

interface VarDefTableRow {
    variable: string
    description: string
    type: string
    validFrom: Date
    length: number
    precision: number
    alias: string
    editable: boolean
    expanded: boolean
    imputation: boolean
    dv: boolean
    }

describe("ONS Accordion Table Test", () => {
    Enzyme.configure({ adapter: new Adapter() });
    
    const rowData = [{label:1, status:3},
                     {label:2, status:3}]
    
    

    const VarDefTableRow = (rowData: any) => {
        let row: VarDefTableRow = rowData.row;
        return (
            <>
                <td className="table__cell ">
                    {row.variable}
                </td>
                <td className="table__cell ">
                    {row.description}
                </td>
            </>
    )}

    const Props = {
        Headers: DASHBOARD_HEADERS,
        data: rowData,
        Row:""
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

    it("should render correctly", () => expect(wrapper(shallow, Props).exists()).toEqual(true));
})