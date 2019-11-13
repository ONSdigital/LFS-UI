import React, {ChangeEvent, Component} from 'react';

interface Props{
  label?: string,
  id?: string,
  onChange? : (e: ChangeEvent<HTMLSelectElement>, ...args: any[]) => void,
  value: string,
  options: Option[]
}

interface Option{
  label:string,
  value?:string
  id?: string
}

interface State{
  value: string
}

export class ONSSelect extends Component <Props, State>{
  value: string = this.props.value !== undefined ? this.props.value : "";
  constructor(props : Props) {
    super(props);
    this.state = {value: props.value !== undefined ? this.props.value : ""};
  }

  handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if(this.props.onChange !== undefined){
      this.props.onChange(e);
    }
    this.value = e.target.value;
    this.setState({value: e.target.value})
  };

    render() {
      return (
        <p className="field">
          {this.props.label !== undefined &&
            <label className="label">{this.props.label}</label>
          }
          <select id="select" name="select" defaultValue="" className="input input--select" onChange={(e) => this.handleChange(e)}>
            <option value="" disabled>
              Select an option
            </option>
            {this.props.options.map((option, index) =>
              <option value={option.value} key={index} id={option.id}>
                {option.label}    
              </option>
            )}
          </select>
        </p>
      );
  }
}
