import React, { Component, ChangeEvent } from 'react';

interface Props{
  label?: string,
  id?: string,
  onChange : ((...props: any[]) => void) | undefined,
  checked? : boolean
}

interface State{
  value: boolean
}

export class ONSCheckbox extends Component <Props, State>{
  value: boolean = this.props.checked === true ? true : false;
  constructor(props : Props) {
    super(props);
    this.state = {value: props.checked === true ? true : false};
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(this.props.onChange !== undefined){
      this.props.onChange(e);
    }
    this.value = e.target.checked;
    this.setState({value: e.target.checked})
    
  }

  componentWillReceiveProps(newProps: Props){
    if(newProps.checked !== undefined){
      this.setState({value: newProps.checked})
    }
  }

    render() {
    if(this.props.label !== undefined){
        return (
            <span className="checkbox ">
                <input
                    type="checkbox"
                    id={this.props.id}
                    checked={this.state.value}
                    onChange={(e) => this.handleChange(e)}
                    className="checkbox__input js-checkbox "
                    value="bacon"
                />
                <label id="bacon-label" className="checkbox__label">
                    {this.props.label}
                </label>
            </span>
        );
    }else{

    }
    return (
        <span style={{width:"unset"}} className="checkbox">
            <input
                type="checkbox"
                id={this.props.id}
                className="checkbox__input js-checkbox "
                checked={this.state.value}
                onChange={(e) => this.handleChange(e)}
                style={{position:"unset"}}
            />
        </span> 
    );
  }
}
