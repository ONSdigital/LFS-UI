import React, {Component, ChangeEvent, CSSProperties} from 'react';

interface Props {
    label?: string,
    id: string,
    onChange: ((...props: any[]) => void) | undefined,
    checked?: boolean,
    style?: CSSProperties
}

interface State {
    value: boolean
}

export class ONSCheckbox extends Component <Props, State> {
    value: boolean = this.props.checked === true;

    constructor(props: Props) {
        super(props);
        this.state = {value: props.checked === true};
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (this.props.onChange !== undefined) {
            this.props.onChange(e);
        }
        this.value = e.target.checked;
        this.setState({value: e.target.checked})

    };

    componentWillReceiveProps(newProps: Props) {
        if (newProps.checked !== undefined) {
            this.setState({value: newProps.checked})
        }
    }

    render() {
        if (this.props.label !== undefined) {
            return (
                <p className="checkboxes__item" style={this.props.style}>
                    <span className="checkbox ">
                        <input
                            type="checkbox"
                            id={this.props.id}
                            checked={this.state.value}
                            onChange={(e) => this.handleChange(e)}
                            className="checkbox__input js-checkbox "
                            value={this.props.id}
                            name={this.props.label}
                        />
                        <label className="checkbox__label " htmlFor={this.props.id}>
                            {this.props.label}
                        </label>
                    </span>
                </p>
            );
        } else {
            return (
                <span style={{width: "unset"}} className="checkbox" >
                    <input
                        type="checkbox"
                        id={this.props.id}
                        className="checkbox__input js-checkbox "
                        checked={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                        style={{position: "unset"}}
                    />
                </span>
            );
        }

    }
}
