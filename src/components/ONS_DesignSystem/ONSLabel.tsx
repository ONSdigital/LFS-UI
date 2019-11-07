import React, {Component} from 'react';

interface Props{
  label: string,
  description? : string,
  id?: string
}

export class ONSLabel extends Component <Props, {}>{
  constructor(props : Props) {
    super(props);
  }

    render() {
    return (
      <label className="label" id={this.props.id}>{this.props.label}
      {
        this.props.description !== undefined &&
        [<br/>,
        <span className="label__description">{this.props.description}</span>]
      }
      </label>
    );
  }
}
