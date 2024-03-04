import React, { Component } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalBayar from "./TotalBayar";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalHarga: 0,
    };
  }

  componentDidUpdate(prevProps) {
    // Cek apakah props keranjangs telah berubah
    if (prevProps.keranjangs !== this.props.keranjangs) {
      // Hitung total harga saat props keranjangs berubah
      const totalHarga = this.props.keranjangs.reduce(
        (total, item) => total + item.total_harga,
        0
      );
      // Update state dengan total harga baru
      this.setState({ totalHarga });
    }
  }

  render() {
    const { keranjangs } = this.props;
    const { totalHarga } = this.state;

    return (
      <Col md={3} className="mt-3">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {keranjangs && keranjangs.length !== 0 && (
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush">
              {keranjangs.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col xs={2}>
                      <h4>
                        <Badge pill variant="success"></Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h5>{item.nama_produk}</h5>
                      <p>Rp. {numberWithCommas(item.harga)}</p>
                    </Col>
                    <Col>
                      <strong className="float-right">
                        Rp. {numberWithCommas(item.total_harga)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        )}

        {keranjangs && (
          <TotalBayar
            totalHarga={totalHarga}
            keranjangs={keranjangs}
            {...this.props}
          />
        )}
      </Col>
    );
  }
}
