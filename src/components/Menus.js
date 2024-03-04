import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, tambahProduk }) => {
  const handleTambahProduk = () => {
    tambahProduk(menu);
  };

  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow" style={{ backgroundColor: "#9BB8E9" }}>
        <Card.Img variant="top" src={menu.link_gambar} />
        <Card.Body>
          <Card.Title>{menu.nama_produk}</Card.Title>
          <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
          <Button
            variant="primary"
            style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
            onClick={handleTambahProduk}
          >
            Add Item
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
