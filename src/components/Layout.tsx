import React, {Component} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
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
        <Container fluid>
          <Row>
            <Header title="Labour Force Survey" loggedIn={this.props.loggedIn}>
              <HeaderNavigation loggedIn={this.props.loggedIn}/>
            </Header>
            <br/>
          </Row>
          <Row>
            <Col>
              {this.props.children}
            </Col>
          </Row>
        </Container>
      </div>
      <footer style={{height: "50px"}}>
        <Footer/>
      </footer>
      </div>
    );
  }
}
