import { Col, Container, Row } from "react-bootstrap";
import { NavbarComponent } from "../components";
import Sidebar from "../components/Sidebar";
import React from "react";
import Grafik from "../components/Grafik";

function DashboardPage() {
  return (
    <div>
      <NavbarComponent />
      <Container fluid>
        <Row>
          <Col>
            <Sidebar />
          </Col>
          <Col md={9} className="mt-3">
            <Grafik />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DashboardPage;
