import React from "react";

interface Props {
    label?: string
    onClick: Function,
    items: any[]
}

export const ONSTabs = (props: Props) => (
    <div className={"tabs"}>
        {
            props.label !== undefined &&
            <label className="label">{props.label}</label>
        }
        <ul className="tabs__list tabs__list--row" role="tablist">
            {
                props.items.map((item: any, index: number) =>
                    <li key={index} id={"tabIdItem" + index} className="tab__list-item tab__list-item--row">
                        <a href={"#tabId"} onClick={() => props.onClick(item.name)}
                           className={"tab tab--row " + (item.active ? "tab--selected" : "")}
                           aria-selected={item.active ? "true" : "false"}
                           role="tab" tabIndex={1}>{item.name}</a>
                    </li>
                )
            }
        </ul>
    </div>
);
