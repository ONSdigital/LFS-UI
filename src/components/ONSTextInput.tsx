import React, {ChangeEvent, Component} from 'react';

interface Props {
    label?: string,
    id?: string,
    password?: boolean,
    onChange?: (e: ChangeEvent<HTMLInputElement>, ...args: any[]) => void,
    placeholder?: string,
    fit?: boolean,
    autoFocus?: boolean,
}

interface State {
    value: string
}

export class ONSTextInput extends Component <Props, {}> {
    value: string = "";

    constructor(props: Props) {
        super(props);
        this.state = {value: ""};
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (this.props.onChange !== undefined) {
            this.props.onChange(e, this.props.label);
        }
        this.value = e.target.value;

    };

    render() {
        return (
            <p className="field">
                {this.props.label !== undefined && <label className="label">{this.props.label}</label>}
                <input style={{width: this.props.fit === true ? "unset" : ""}}
                       autoFocus={this.props.autoFocus === true}
                       type={this.props.password === true ? "password" : "text"} id={this.props.id}
                       className="input input--text input-type__input " placeholder={this.props.placeholder}
                       onChange={(e) => this.handleChange(e)}/>
            </p>
        );
    }
}
