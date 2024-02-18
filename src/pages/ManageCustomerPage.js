import React from "react";
import ManageCustomer from "../components/ManageCustomer";
import Sidebar from "../components/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import { NavbarComponent } from "../components";

function ManageCustomerPage() {
  return (
    <div>
        <NavbarComponent />
    <Container fluid>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9}>
          <ManageCustomer />
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default ManageCustomerPage;