import React, { Component } from 'react';
import { ONSTable } from '../components/ONSTable';

interface State {
  Outputs: Data | null,
  OutputData : Data | null
}

interface Data{
  Rows : Row,
  Count : number
}

interface Row{
  [key: number]: Cell
}

interface Cell{
  [key: string]: object
}

export class Outputs extends Component <{}, State>{
  displayName = Outputs.name;
  constructor(props: any) {
    super(props);
    this.state = {Outputs: null, OutputData: null};
    this.getOutputs();
  }

  getOutputs = () => {
    fetch('/jsons/Outputs.json')
        .then(response => response.json())
        .then(response => this.setMockOutputData(response))
  };

  setMockOutputData = (response: any) => {
    //-------Delete this when using api
    let outputs = response.Rows as object[];
    outputs = outputs.slice(0, 20);
    this.setState({OutputData: response, Outputs: {Rows: outputs as any, Count: response.Count}})
  };

  mockOutputs = (offset: number, steps: number) => {
    //-------Use fetch method to api here to get from DB
    if(this.state.OutputData !== null){
      let outputs = this.state.OutputData.Rows as object[];
      outputs = outputs.slice(offset, offset+steps);
      this.setState({Outputs: {Rows: outputs as any, Count: this.state.OutputData.Count}});
    }
  };


  outputHeaders = () => {
    let headers = [];
    headers.push(
      {
        label: "Variable",
        column_name: "Variable",
        filter: false,
        order: true,
      },
      {
        label: "Select All",
        column_name: "Tick_All",
        filter: false,
        order: false,
        onChange: this.fullChange
      }
    );

    if(this.state.OutputData){
      let keys = Object.keys(this.state.OutputData.Rows[0]);
      for(let i = 2; i<keys.length; i++){
        headers.push(
          {
            label: keys[i],
            column_name: keys[i],
            filter: false,
            order: false,
            onChange: this.singleChange
          }
        )
      }
    }
    return(
      headers
    );
  };

  singleChange = (e: any, row: number, column: string, offset: number) => {
    if(this.state.Outputs && this.state.OutputData){
      let data = this.state.Outputs; let outputData = this.state.OutputData;
      data.Rows[row][column] = e.target.checked;
      outputData.Rows[row+offset][column] = e.target.checked;
      this.setState({Outputs:data, OutputData:outputData})
    }
    //-------Add code here to save to database
    //-------You can get the variable name with data.Rows[row]["Variable"]
  };

  fullChange = (e: any, row: number, column: string, offset: number) => {
    if(this.state.Outputs && this.state.OutputData){
      let data = this.state.Outputs; let outputData = this.state.OutputData;
      let keys = Object.keys(data.Rows[row]);
      for( let i = 2; i < keys.length; i++){
        data.Rows[row][keys[i]] = e.target.checked;
        outputData.Rows[row+offset][keys[i]] = e.target.checked;
      }    
      data.Rows[row][column] = e.target.checked;
      outputData.Rows[row+offset][column] = e.target.checked;  
      this.setState({Outputs:data, OutputData:outputData})
    }
    //-------Add code here to save to database
    //-------You can get the variable name with data.Rows[row]["Variable"]
  };


  render() {
    return (
      <div className="container">
        <ONSTable Data={this.state.Outputs} Title="Outputs" Headers={this.outputHeaders()} Pagination={true} Steps={20} pageChange={this.mockOutputs}/>
      </div>
    );
  }
}
