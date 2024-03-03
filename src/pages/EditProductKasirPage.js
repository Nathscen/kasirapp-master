import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavbarComponent } from "../components";
import SidebarKasir from "../components/SidebarKasir";
import EditProductPetugas from "../components/EditProductPetugas";

export default class EditProductKasirPage extends Component {
  render() {
    return (
      <div>
        <NavbarComponent />
        <Container fluid>
          <Row>
            <Col md={3}>
              <SidebarKasir />
            </Col>
            <Col md={9}>
              <EditProductPetugas />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
