import React from "react";
import { Card } from "react-bootstrap";
import { BsPeople, BsBox, BsCashStack } from "react-icons/bs";

const Grafik = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {/* Card untuk menampilkan data pelanggan (customer) */}
      <Card
        style={{ width: "300px", margin: "10px", backgroundColor: "#C9D7DD" }}
      >
        <Card.Body>
          <BsPeople size={40} />
          <Card.Title>Data Customer</Card.Title>
          <Card.Text>Jumlah pelanggan: 1000</Card.Text>
        </Card.Body>
      </Card>

      {/* Card untuk menampilkan data produk (product) */}
      <Card
        style={{ width: "300px", margin: "10px", backgroundColor: "#C9D7DD" }}
      >
        <Card.Body>
          <BsBox size={40} />
          <Card.Title>Data Product</Card.Title>
          <Card.Text>Jumlah produk: 500</Card.Text>
          <Card.Text>Produk terlaris: Product A</Card.Text>
        </Card.Body>
      </Card>

      {/* Card untuk menampilkan data pendapatan (income) */}
      <Card
        style={{ width: "300px", margin: "10px", backgroundColor: "#C9D7DD" }}
      >
        <Card.Body>
          <BsCashStack size={40} />
          <Card.Title>Data Income</Card.Title>
          <Card.Text>Total pendapatan: $5000</Card.Text>
          <Card.Text>Pendapatan bulan ini: $1000</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Grafik;
