import React, {Component} from 'react';

interface Props {
    label: string,
    id?: string,
    primary: boolean,
    small: boolean,
    field?: boolean,
    loading?: boolean,
    marginRight?: number,
    onClick?: (...props: any[]) => void
}




export class ONSButton extends Component <Props, {}> {
    
    spacing = () => {
        let buttonStyle = {
            marginRight: String(this.props.marginRight) + "px",
          };
        return buttonStyle
    }

    render() {
        let className = "btn " + (this.props.loading ? "btn--loader is-loading " : "") + (this.props.field ? "field ": "") + (this.props.primary ? "" : "btn--secondary ") + (this.props.small ? "btn--small " : "");
        return (
            <button style={this.spacing()} type="button" disabled={this.props.loading} className={className} onClick={this.props.onClick} >
                <span className="btn__inner">{this.props.label}</span>
            </button>
        );
    }
}
