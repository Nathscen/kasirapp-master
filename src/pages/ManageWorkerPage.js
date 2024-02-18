import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavbarComponent } from "../components";
import Sidebar from "../components/Sidebar";
import ManageWorker from "../components/ManageWorker";

function ManageWorkerPage() {
  return (
    <div>
      <NavbarComponent />
      <Container fluid>
        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9}>
            <ManageWorker />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ManageWorkerPage;
