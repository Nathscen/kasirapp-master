import { Col, Container, Row } from "react-bootstrap";
import { NavbarComponent } from "../components";
import Sidebar from "../components/Sidebar";
import React from "react";
import Grafik from "../components/Grafik";

function DashboardPage() {
  const salesData = [
    { label: "Jan", value: 100 },
    { label: "Feb", value: 150 },
    { label: "Mar", value: 200 },
    // tambahkan data penjualan bulan lainnya sesuai kebutuhan
  ];
  return (
    <div>
      <NavbarComponent />
      <Container fluid>
        <Row>
          <Col>
            <Sidebar />
          </Col>
          <Col md={9} className="mt-3">
            <Grafik data={salesData} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DashboardPage;
