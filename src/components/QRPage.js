import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const QRPage = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-5 mb-5">
        <Col md={6} className="text-center">
          <Image src="assets/images/qr-code.jpeg" fluid />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <Button variant="primary" className="mt-3">
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default QRPage;
