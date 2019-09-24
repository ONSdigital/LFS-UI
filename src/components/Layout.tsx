import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Header } from './Header';
import { Footer } from './Footer';
import { SectionNav } from './SectionNav';
import { HeaderNav } from './HeaderNav';

export class Layout extends Component {
  displayName = Layout.name

  render() {

    var links = [
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
        link: "/link-to-item3",
        label: "Link 3"
      },
      {
        link: "/link-to-item4",
        label: "Link 4"
      },
      {
        link: "/link-to-item5",
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
    ]

    return (
      <div style={{height: "100%"}}>
      <div style={{minHeight: "100%"}}>
        <Container fluid>
          <Row>
            <Header title="Labour Force Survey">
              <HeaderNav links={links}/>
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
