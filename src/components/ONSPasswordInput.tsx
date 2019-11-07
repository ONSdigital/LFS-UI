import React, {ChangeEvent, Component} from 'react';

interface Props {
    label?: string,
    id?: string,
    placeholder?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>, ...args: any[]) => void,
}

interface State {
    password: boolean
}

export class ONSPasswordInput extends Component <Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {password: true};
    }

    togglePassword = () => {
        this.setState({password: !this.state.password})
    };

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (this.props.onChange !== undefined) {
            this.props.onChange(e, this.props.label);
        }
    };


    render() {
        return (
            <p className="field">
                <label className="label" htmlFor="password">Password</label>
                <span className="checkbox checkbox--toggle">
            <input
                type="checkbox"
                id="password-toggle"
                className="checkbox__input"
                value=""
                name="show-password"
                onClick={this.togglePassword}
            />
            <label id="password-toggle-label" className="checkbox__label " htmlFor="password-toggle">
                Show password
            </label>
          </span>
                <label className="label" htmlFor="password"/>
                <input
                    type={this.state.password ? "password" : "text"} id="password"
                    className="input input--text input-type__input u-mt-xs"
                    onChange={(e) => this.handleChange(e)}
                />
            </p>

        );
    }
}
