import React, { Component } from 'react';
import { ONSPanel } from '../components/ONSPanel';

export class Unauthorized extends Component {
  displayName = Unauthorized.name

  render() {
    return (
      <div>
        <ONSPanel label="" status="error">
          <p>You are not authorised to see this page</p>
        </ONSPanel>
      </div>
    );
  }
}
