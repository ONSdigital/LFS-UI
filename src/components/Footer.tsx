import React, {Component} from 'react';
import {ONSInDevBanner} from './ONS_DesignSystem/ONSInDevBanner';

export class Footer extends Component {
  displayName = Footer.name;

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
