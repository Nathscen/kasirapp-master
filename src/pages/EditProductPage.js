import React from "react";
import { NavbarComponent } from "../components";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import EditProductForm from "../components/EditProductForm";

function EditProductPage() {
  return (
    <div>
      <NavbarComponent />
      <Container fluid>
        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9} className="mt-3">
            <EditProductForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EditProductPage;
