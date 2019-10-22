import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Header } from './Header';
import { Footer } from './Footer';
import { HeaderNav } from './HeaderNav';

interface Props {
  loggedIn: boolean
}

export class Layout extends Component <Props, {}> {
  displayName = Layout.name;

  render() {

    let links = [
      {
        link: "/Dashboard",
        label: "Dashboard",
        current: true
      },
      {
        link: "/Outputs",
        label: "Outputs"
      },
      {
        link: "/File_Upload",
        label: "Upload"
      },
      {
        link: "/New_Run",
        label: "New Run"
      },
      {
        link: "/Link-to-item-5",
        label: "Link 5"
      },
      {
        link: "/link-to-item6",
        label: "Link 6"
      },
      {
        link: "/Admin",
        label: "Admin"
      }
    ];

    return (
      <div style={{height: "100%"}}>
      <div style={{minHeight: "100%"}}>
        <Container fluid>
          <Row>
            <Header title="Labour Force Survey" loggedIn={this.props.loggedIn}>
              <HeaderNav links={links} loggedIn={this.props.loggedIn}/>
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
