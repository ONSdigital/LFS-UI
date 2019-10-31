import React, {Component, ChangeEvent, CSSProperties} from 'react';

interface Props {
    label: string,
    id: string,
    onChange: ((...props: any[]) => void) | undefined,
    checked?: boolean,
    style?: CSSProperties
}

interface State {
    value: boolean
}

export class ONSRadioButton extends Component <Props, State> {
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
        return (
            <p className="radios__item" style={this.props.style}>
                <span className="radio">
                    <input
                        type="radio"
                        id={this.props.id}
                        className={"radio__input js-radio"}
                        checked={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                        value={this.props.id}
                        name={this.props.label}
                    />
                    <label className="radio__label " htmlFor={this.props.id}>
                        {this.props.label}
                    </label>
                </span>
            </p>
        );
    }
}


