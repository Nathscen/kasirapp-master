import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import QRCode from "qrcode.react";

const QRCodeComponent = () => {
  const qrCodeData = "https://bit.ly/santaidulubro"; // Change this to the desired URL

  return (
    <Container>
      <Row className="justify-content-md-center">
        <h3 className="mb-4 text-center">
          Please make payment by scanning the QR code !!
        </h3>
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <div style={{ width: "100%", maxWidth: "300px" }}>
            <QRCode
              value={qrCodeData}
              size={256}
              level="L"
              className="mx-auto"
              bgColor="#ffffff"
              fgColor="#000000"
              renderAs="svg"
            />
          </div>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-4">
        <Col md={6} className="d-flex justify-content-center align-items-center mt-4">
          <Button variant="primary" size="lg" className="mx-2">
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default QRCodeComponent;
