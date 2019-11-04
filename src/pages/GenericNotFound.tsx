import React, {Component} from 'react';
import {ONSButton} from "../components/ONSButton";

interface Props {
    label?: string
}
export class GenericNotFound extends Component <Props, {}>{
  displayName = GenericNotFound.name;

  render() {
    return (
      <div className="container">
          <h1>Page Not Found</h1>
          <p>{this.props.label ? this.props.label : "The page you are trying to access does not exist" }</p>
          <ONSButton label={"Return to Dashboard"} primary={true} small={false} onClick={() => window.location.href="/"}/>
      </div>
      
    );
  }
}
