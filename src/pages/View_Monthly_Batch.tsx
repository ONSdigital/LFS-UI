import React, { Component } from 'react';
import { ONSTable } from '../components/ONSTable';
import { ONSPanel } from '../components/ONSPanel';
import { ONSButton } from '../components/ONSButton';
import { ONSStatus } from '../components/ONSStatus';


interface State {
  UploadsData: Data | null
  Batch_ID: String
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

export class View_Monthly_Batch extends Component <{}, State> {
  displayName = View_Monthly_Batch.name;
  constructor(props: any) {
    super(props);
    this.state = {UploadsData: null, Batch_ID: "Dec2019"};
    this.getUploads();
  }

  getUploads = () => {
    fetch('/jsons/Sources.json')
        .then(response => response.json())
        .then(response => this.setMockRoleData(response))
  }

  setMockRoleData = (response: any) => {
    this.setState({UploadsData: response})
  };

  getMonth = () => {
    var Month = this.state.Batch_ID.substring(0,3)
    console.log(Month)
    switch (Month){
      case 'Jan': Month = 'January'; break;
      case 'Feb': Month = 'February'; break;
      case 'Mar': Month = 'March'; break;
      case 'Apr': Month = 'April'; break;
      case 'May': break;
      case 'Jun': Month = 'June'; break;
      case 'Jul': Month = 'July'; break;
      case 'Aug': Month = 'August'; break;
      case 'Sep': Month = 'September'; break;
      case 'Oct': Month = 'October'; break;
      case 'Nov': Month = 'November'; break;
      case 'Dec': Month = 'December'; break;
    }
    return Month
  }

  getYear = () => {
    return this.state.Batch_ID.substring(3,7)
  }

  batchHeaders = () => {
    return(
      [{
        label: "Source",
        column_name: "source",
        filter: false,
        order: true
      },{
        label: "Week",
        column_name: "week",
        filter: false,
        order: false
      },{
        label: "Status",
        column_name: "status",
        filter: false,
        order: false
      }]
    )
  };
  
  

  render() {
    return (
      <div className="container">
        <div>
          <header className="header header--internal">  
            <text style={{fontWeight: "bold"}}> Manage Monthly Uploads</text>
          </header>
          <br></br>
          <text> Batch ID: {this.state.Batch_ID}</text>
          <br></br>
          <text> Year: {this.getYear()}</text>
          <br></br>
          <text> Month: {this.getMonth()} </text>
          <br></br>

        </div>
        <br></br>

        <table className="table-sortable">
          <ONSTable Data={this.state.UploadsData} Title="File Upload Status" Headers={this.batchHeaders()} Pagination={false}/>
          <ONSPanel label="This is the Dashboard" status="info" spacious={false}>
            <p>Every File Must be Uploaded, before Month Process can be Run</p>
          </ONSPanel>
          <br></br>
          
        </table>
        
        <div>
              <ONSButton label="Run Monthly Process" small={false} primary={true} marginRight={10}/>
              <ONSButton label="Run Interim weighting" small={false} primary={false}/>
          </div>
      </div>
      
    );
  }
}
