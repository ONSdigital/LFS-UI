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

<<<<<<< Updated upstream
export class ONSButton extends Component <Props, {}> {
    
    spacing = () => {
        let buttonStyle = {
            marginRight: String(this.props.marginRight) + "px",
          };
        return buttonStyle
=======
export const ONSButton = (props: Props) => {

    let spacing = () => {
        return {
            marginRight: String(props.marginRight) + "px",
        }
    };

    let className = "btn ";
    if (props.exportExcelBtn) {
        console.log(props.label)
        console.log("========="+ props.loading)
        className = className + " " + (props.loading ? "btn--secondary btn--loader is-loading  " : " btn--excel")
    } else {
        console.log(props.label)
        console.log("-------"+ props.loading)
        console.log("-------"+ props.field)
        console.log("-------"+ props.primary)
        console.log("-------"+ props.small)

        className = className +
            (props.loading ? "btn--loader is-loading " : "") +
            (props.field ? "field " : "") +
            (props.primary ? "" : "btn--secondary ") +
            (props.small ? "btn--small " : "");
>>>>>>> Stashed changes
    }

    render() {
        let className = "btn " + (this.props.loading ? "btn--loader is-loading " : "") + (this.props.field ? "field ": "") + (this.props.primary ? "" : "btn--secondary ") + (this.props.small ? "btn--small " : "");
        return (
            <button id={this.props.id} style={this.spacing()} type="button" disabled={this.props.loading} className={className} onClick={this.props.onClick} >
                <span className="btn__inner">{this.props.label}</span>
            </button>
        );
    }
}
