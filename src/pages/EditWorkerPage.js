import React from "react";
import { NavbarComponent } from "../components";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import EditWorkerForm from "../components/EditWorkerForm";

function EditWorkerPage() {
  return (
    <div>
      <NavbarComponent />
      <Container fluid>
        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9}>
            <EditWorkerForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EditWorkerPage;
