import React, {Component} from 'react';
import {ONSPanel} from '../components/ONS_DesignSystem/ONSPanel';

export class Unauthorized extends Component {
  displayName = Unauthorized.name

  render() {
    return (
      <div>
        <ONSPanel status="error">
          <p>You are not authorised to see this page</p>
        </ONSPanel>
      </div>
    );
  }
}
