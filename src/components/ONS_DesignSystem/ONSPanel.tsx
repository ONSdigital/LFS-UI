import React, {Component} from 'react';

interface Props{
  label: string,
  children: any,
  status? : string,
  spacious?: boolean,
  id?: string,
  hidden?: boolean
}

export class ONSPanel extends Component <Props, {}>{

    render() {
      let className = "panel panel--" + (this.props.status === "success" ? "success" : this.props.status === "error" ? "error": "info") + " panel--simple " + (this.props.spacious ? "panel--spacious" : "");
      return (
        <div id={this.props.id} className={className} hidden={this.props.hidden}>
          <div className="panel__body">
              {this.props.children}
          </div>
        </div> 
      );
  }
}
