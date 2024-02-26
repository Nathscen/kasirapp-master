import React, { Component } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalBayar from "./TotalBayar";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} className="mt-3">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {keranjangs.length !== 0 && (
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush">
              {keranjangs.map(() => (
                <ListGroup.Item>
                  <Row>
                    <Col xs={2}>
                      <h4>
                        <Badge pill variant="success"></Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h5>idk</h5>
                      <p>Rp. {numberWithCommas}</p>
                    </Col>
                    <Col>
                      <strong className="float-right">
                        Rp. {numberWithCommas()}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        )}

        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
