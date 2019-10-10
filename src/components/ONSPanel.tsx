import React, { Component } from 'react';

interface Props{
  label: string,
  children: any,
  header?: string,
  status? : string,
  spacious?: boolean,
  id?: string
}

export class ONSPanel extends Component <Props, {}>{

    render() {
      let className = "panel panel--" + (this.props.status === "success" ? "success" : this.props.status === "error" ? "error": "info") + " panel--simple " + (this.props.spacious ? "panel--spacious" : "");
      return (
        <div id={this.props.id} className={className}>
          {this.props.header !== undefined &&
            <div className="panel__header">
              <h1 className="panel__title u-fs-r--b">{this.props.header}</h1>
            </div>
          }
          <div className="panel__body">
              {this.props.children}
            </div>
        </div> 
      );
  }
}
