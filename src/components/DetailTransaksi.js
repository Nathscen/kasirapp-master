import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

const DetailTransaksi = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <Card>
            <Card.Header as="h5" className="bg-primary text-white text-center">
              Sales Receipt
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Customer Name:</Col>
                  <Col>John Doe</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Item Name:</Col>
                  <Col>Product 1</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Item Quantity:</Col>
                  <Col>2</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Item Price:</Col>
                  <Col>$100</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>$200</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailTransaksi;
