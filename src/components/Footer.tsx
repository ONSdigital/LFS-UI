import React, { Component } from 'react';
import { ONSInDevBanner } from './ONSInDevBanner';
// import './Footer.css';

interface Props {
    
}

export class Footer extends Component {
  displayName = Footer.name
    constructor(props: Props) {
        super(props);
    }

    render() {
    return (
        <footer className="page__footer " data-ga-element="footer">
            <div className="container container--full-width">
                <div className="grid">
                    <ONSInDevBanner />
                </div>
            </div>
        </footer>
    );
  }
}
