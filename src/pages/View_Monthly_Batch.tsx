import React, { Component } from 'react';
import { ONSTable } from '../components/ONSTable';
import { ONSPanel } from '../components/ONSPanel';
import { ONSButton } from '../components/ONSButton';
import { getMonth, getYear, qList } from '../utilities/Common_Functions';
import { TableWithModal } from '../components/TableWithModal' 
import { ONSMetadata } from '../components/ONSMetadata';

interface State {
  UploadsData: Data | null
  Batch_ID: string
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
      },{
        label: "",
        column_name: "button",
        filter: false,
        order: false
      }]
    )
  };

  thelist = () => {
    return(
      [{
        L: "Batch_ID",
        R: this.state.Batch_ID,
        
      },{
        L: "Year",
        R: getYear(this.state.Batch_ID),
        
      },{
        L: "Period",
        R: getMonth(this.state.Batch_ID),
         
      }]
    )
  };

  showSummary = (payload : any) => {
    console.log(payload)
  };

  render() {
    return (
      <div className="container">
        <div>
          <header className="header header--internal">  
            <text style={{fontWeight: "bold"}}> Manage Monthly Uploads</text>
          </header>
          <br></br>
          <ONSMetadata List={this.thelist()}></ONSMetadata>
        </div>
        <br></br>
        <table>
          <TableWithModal table="batch"></TableWithModal>
          <ONSPanel label="This is the Dashboard" status="info" spacious={false}>
            <p>Every File Must be Uploaded to Run Process</p>
          </ONSPanel>
          <br></br>
        </table>
        <div>
          <ONSButton label="Run Monthly Process" small={false} primary={true} marginRight={10} />
          {(() => {if(qList.some(item => String(getMonth(this.state.Batch_ID)) === String(item))){
            return(
              <ONSButton label="Run Inetrim Weighting" small={false} primary={false} />
              )
          }
          })()}
        </div>
      </div>
    );
  }
}
