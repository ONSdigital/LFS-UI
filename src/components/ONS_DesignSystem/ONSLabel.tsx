import React, {Component, Fragment} from 'react';

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
        <Fragment>
          <br/>
          <span className="label__description">{this.props.description}</span>
        </Fragment>
      }
      </label>
    );
  }
}
