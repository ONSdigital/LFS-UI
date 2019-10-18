import React, { Component } from 'react';
import { ONSPanel } from '../components/ONSPanel';
import { ONSTextInput } from '../components/ONSTextInput';
import { ONSUpload } from '../components/ONSUpload';

export class Home extends Component{
  displayName = Home.name;

  render() {
    return (
      <div className="container">
        <p>Hello</p>
        <ONSPanel label="This is the Dashboard" status="info" spacious={true}>
          <p>This is the Dashboard</p>
        </ONSPanel>
        <ONSPanel label="You got to the Dashboard" status="success">
          <p>You got to the Dashboard</p>
        </ONSPanel>
        <ONSPanel label="" status="error">
          <p>Nothing Loaded</p>
        </ONSPanel>

        <ONSTextInput label="Text Input" placeholder="Type here ...." />

        <ONSUpload label="Upload CSV" description="File types accepted are .csv" fileName="file" fileID="file" accept=".txt"/> 
      </div>
      
    );
  }
}
