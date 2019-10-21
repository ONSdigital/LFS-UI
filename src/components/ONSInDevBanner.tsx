import React, { Component } from 'react';

interface Props{

}

export class ONSInDevBanner extends Component <Props, {}>{

    render() {
    return (
      <div className="phase-banner">
        <div className="container">
          <div className="grid grid--flex grid--gutterless grid--vertical-center grid--no-wrap">
            <div className="grid__col col-auto u-flex-no-grow">
              <h3 className="phase-banner__badge">In Dev</h3>
            </div>
            <div className="grid__col col-auto u-flex-shrink">
              <p className="phase-banner__desc u-fs-s u-mb-no">This is a new service – your <a href={"#feedback"}>feedback</a> will help us improve it.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
