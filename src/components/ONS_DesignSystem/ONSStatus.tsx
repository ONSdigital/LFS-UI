import React from "react";

interface Props {
    label: string,
    small: boolean
    status: string
    testId?: string
}

export const ONSStatus = (props: Props) => {
    let className = "status status--" + props.status + (props.small ? " status--small" : "");
    return (
        <span data-testid={props.testId} className={className}>{props.label}</span>
    );
};
