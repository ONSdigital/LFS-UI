import React, {Component} from 'react';

interface Props {
    label: string,
    small: boolean
    status: string
}

export class ONSStatus extends Component <Props, {}>{

    render() {
        let className = "status status--" + this.props.status + (this.props.small ? " status--small": "");
        return(
            <span className={className}>{this.props.label}</span>
        )
    }
}
