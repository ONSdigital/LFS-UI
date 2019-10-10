import React, { Component } from 'react';

interface Props{
  label: string,
  description: string,
  fileName: string,
  fileID: string,
  accept: string
}

export class ONSUpload extends Component <Props, {}>{

    render() {
      return (
        <div className="field">
            <p className="field">
                <label className="label" >{this.props.label}
                <br/>
                  <span className="label__description">{this.props.description}</span>
                </label>
                <input type="file" id={this.props.fileID} className="input input--text input-type__input input--upload" name={this.props.fileName} accept={this.props.accept} />
            </p>
        </div>
      );
  }
}
