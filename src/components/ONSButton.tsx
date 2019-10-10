import React, { Component } from 'react';

interface Props{
  label: string,
  id?: string,
  primary: boolean,
  small: boolean,
  onClick?: (...props: any[]) => void
}

export class ONSButton extends Component <Props, {}>{
  constructor(props : Props) {
    super(props);
  }

    render() {
    let className = "field btn " + (this.props.primary ? "" : "btn--secondary ") + (this.props.small ? "btn--small " : "");
    return (
      <button type="button" className={className} onClick={this.props.onClick}>
          <span className="btn__inner">{this.props.label}</span>
      </button>
    );
  }
}
