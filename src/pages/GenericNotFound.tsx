import React, { Component } from 'react';
import {ONSButton} from "../components/ONSButton";

export class GenericNotFound extends Component{
  displayName = GenericNotFound.name;

  render() {
    return (
      <div className="container">
          <h1>Page Not Found</h1>
          <p>The page you are trying to access does not exist</p>
          <ONSButton label={"Return to Dashboard"} primary={true} small={false} onClick={() => window.location.href="/"}/>
      </div>
      
    );
  }
}
