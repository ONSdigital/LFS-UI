import React from "react";

interface Props {
    label: string,
    children: any,
    status?: string,
    spacious?: boolean,
    id?: string,
    hidden?: boolean,
    testID?: string
}

export const ONSPanel = (props: Props) => {
    let className = "panel panel--" + (props.status === "success" ? "success" : props.status === "error" ? "error" : "info") + " panel--simple " + (props.spacious ? "panel--spacious" : "");
    return (
        <div data-testid={props.testID} id={props.id} className={className} hidden={props.hidden}>
            <div className="panel__body">
                {props.children}
            </div>
        </div>
    );
};

