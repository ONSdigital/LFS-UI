import React, { Component } from 'react';

interface Props{
  label: string,
  id?: string,
  primary: boolean,
  small: boolean,
  loading?: boolean,
  onClick?: (...props: any[]) => void
}

export class ONSButton extends Component <Props, {}>{

    render() {
    let className = "field btn " + (this.props.loading ? "btn--loader is-loading" : "") + (this.props.primary ? "" : "btn--secondary ") + (this.props.small ? "btn--small " : "");
    return (
      <button type="button" disabled={this.props.loading} className={className} onClick={this.props.onClick}>
          <span className="btn__inner">{this.props.label}</span>
      </button>
    );
  }
}
