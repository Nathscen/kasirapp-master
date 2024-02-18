
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { NavbarComponent } from "../components";
import ManageTransaction from "../components/ManageTransaction";

function ManageTransactionPage() {
  return (
    <div>
      <NavbarComponent />
      <Container fluid>
        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9}>
            <ManageTransaction />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ManageTransactionPage;
