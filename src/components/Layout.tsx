import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Header } from './Header';
import { Footer } from './Footer';
import { HeaderNav } from './HeaderNav';

interface Props {
  currentPage: any
}

export class Layout extends Component <Props, {}> {
  displayName = Layout.name

  render() {

    var links = [
      {
        link: "/Dashboard",
        label: "Dashboard",
        pageID: 2
      },
      {
        link: "/Outputs",
        label: "Outputs",
        pageID: 3
      },
      {
        link: "/File_Upload",
        label: "Upload",
        pageID: 4
      },
      {
        link: "/Period",
        label: "Period",
        pageID: 5
      },
      {
        link: "/link-to-item5",
        label: "Link 5",
        pageID: 0
      },
      {
        link: "/link-to-item6",
        label: "Link 6",
        pageID: 0
      },
      {
        link: "/Admin",
        label: "Admin",
        pageID: 9
      }
    ]

    return (
      <div style={{height: "100%"}}>
      <div style={{minHeight: "100%"}}>
        <Container fluid>
          <Row>
            <Header title="Labour Force Survey">
              <HeaderNav links={links} currentPage={this.props.currentPage}/>
            </Header>
            <br/>
          </Row>
          <Row>
            <Col>
              <br/>
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
