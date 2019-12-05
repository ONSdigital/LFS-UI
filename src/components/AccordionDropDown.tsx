import React, {useState} from "react";

interface Props {
    caption?: string
    expandableHeader: any
    children: any
}

export function AccordionDropDown(props: Props) {
    let [rowExpanded, setRowExpanded] = useState(false);

    function handleClickOnRow() {
        setRowExpanded(!rowExpanded);
    }

    function handleEnterKeyPressOnRow() {
        setRowExpanded(!rowExpanded);
    }

    return (
        <table id="basic-table" className="table ">
            <>
                <thead className="table__head">
                <tr className="table__row">
                    <th colSpan={2} key={1} scope="col" className="table__header ">{props.caption}</th>
                </tr>
                </thead>
                <tbody className={"table__body expandedRowEnabled "}>
                {
                    <>
                        <tr className={"table__row selectableTableRow"}
                            onClick={(() => handleClickOnRow())}
                            tabIndex={0}
                            title="Click to Expand"
                            onKeyPress={() => (handleEnterKeyPressOnRow())}>
                            <td className="table__cell ">
                                <div className={"accordion-table-chevron "}>
                                    <img
                                        className={"accordion-table-chevron-svg " + (rowExpanded ? "accordion-table-chevron-rotate" : "")}
                                        src={"/img/icons--chevron-right.svg"}
                                        alt="Expanded Table chevron"/>
                                </div>
                            </td>
                            <td className="table__cell ">
                                <props.expandableHeader/>
                            </td>

                        </tr>
                        <tr hidden={!rowExpanded}>
                            <td className="table__cell expandedRow"/>
                            <td colSpan={2}
                                className="table__cell expandedRow">
                                {props.children}
                            </td>
                        </tr>
                    </>
                }
                </tbody>
            </>
        </table>
    );
}