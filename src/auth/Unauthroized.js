import React, { Component } from 'react';

export class Unauthorized extends Component {
  displayName = Unauthorized.name

  render() {
    return (
      <div>
          <p>This is the unauthorized screen</p>
      </div>
    );
  }
}
