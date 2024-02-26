import React from "react";
import { NavbarComponent } from "../components";
import { Col, Container, Row } from "react-bootstrap";
import ManageProductKasir from "../components/ManageProductKasir";
import SidebarKasir from "../components/SidebarKasir";

function ManageProductKasirPage() {
  return (
    <div>
      <NavbarComponent />
      <Container fluid>
        <Row>
          <Col md={3}>
            <SidebarKasir />
          </Col>
          <Col md={9}>
            <ManageProductKasir />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ManageProductKasirPage;
