import React, { Component } from "react";
import AddProduct from "../components/AddProduct";
import Sidebar from "../components/Sidebar";
import { NavbarComponent } from "../components";
import { Col, Container, Row } from "react-bootstrap";

export default class AddProductPage extends Component {
  render() {
    return (
      <div>
        <NavbarComponent />
        <Container fluid>
          <Row>
            <Col md={3}>
              <Sidebar />
            </Col>
            <Col md={9}>
              <AddProduct />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
