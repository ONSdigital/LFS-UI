import React, { Component } from 'react';

interface Props{
  label?: string,
  id?: string,
  placeholder? : string
}

export class ONSPasswordInput extends Component <Props, {}>{
  constructor(props : Props) {
    super(props);
  }

    render() {
    return (
      <p className="field">
        {this.props.label !== undefined &&
        <label className="label">{this.props.label}</label>
        }
        <input type="password" id={this.props.id} className="input input--text input-type__input " placeholder={this.props.placeholder} />
      </p>
    );
  }
}
