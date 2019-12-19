import React, {Component} from 'react';
import {Header} from './Header';
import {Footer} from './Footer';
import {HeaderNavigation} from "./HeaderNavigation";

interface Props {
    loggedIn: boolean
}

export class Layout extends Component <Props, {}> {
    displayName = Layout.name;

    render() {
      return (
        <div style={{height: "100%"}}>
          <div style={{minHeight: "100%"}}>
            <Header title="Labour Force Survey" loggedIn={this.props.loggedIn}>
                <HeaderNavigation loggedIn={this.props.loggedIn}/>
            </Header>
            {this.props.children}
          </div>
          <footer style={{height: "50px"}}>
              <Footer/>
          </footer>
        </div>
      );
    }
}
