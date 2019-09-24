import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

export class Home extends Component{
  displayName = Home.name
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <p>This is the Dashboard</p>
    );
  }
}
