import React, {ChangeEvent, Component} from 'react';

interface Props{
  label: string,
  description: string,
  fileName: string,
  fileID: string,
  accept: string,
  onChange? : (e: ChangeEvent<HTMLInputElement>, ...args: any[]) => void
}

export class ONSUpload extends Component <Props, {}>{

    value: string = "";
    constructor(props : Props) {
        super(props);
        this.state = {value: ""};
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(this.props.onChange !== undefined){
            this.props.onChange(e, this.props.label);
        }
        this.value = e.target.value;

    };

    render() {
      return (
        <div className="field">
            <p className="field">
                <label className="label" >{this.props.label}
                <br/>
                  <span className="label__description">{this.props.description}</span>
                </label>
                <input type="file" id={this.props.fileID} className="input input--text input-type__input input--upload" name={this.props.fileName} accept={this.props.accept} onChange={(e) => this.handleChange(e)}/>
            </p>
        </div>
      );
  }
}
