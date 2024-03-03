import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { BsPeople, BsBox, BsCashStack } from "react-icons/bs";
import axios from "axios";

const Grafik = () => {
  const [incomeData, setIncomeData] = useState(null);
  const [customerCount, setCustomerCount] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const [totalStock, setTotalStock] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mengambil token dari local storage
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token tidak ditemukan di local storage");
          return;
        }

        // Menyertakan token dalam header permintaan
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Mengambil data pendapatan dari API
        const incomeResponse = await axios.get(
          "http://127.0.0.1:8080/admin/get_total_pendapatan",
          config
        );
        console.log("Income Data:", incomeResponse.data); // Logging response
        setIncomeData(incomeResponse.data.data);

        // Mengambil data jumlah pelanggan dari API
        const customerResponse = await axios.get(
          "http://127.0.0.1:8080/admin/list_customer",
          config
        );
        console.log("Customer Data:", customerResponse.data); // Logging response
        setCustomerCount(customerResponse.data.data.banyak_pelanggan);

        // Mengambil data jumlah produk dari API
        const productResponse = await axios.get(
          "http://127.0.0.1:8080/admin/list_produk",
          config
        );
        console.log("Product Data:", productResponse.data); // Logging response
        setProductCount(productResponse.data.length);
        setTotalStock(productResponse.data.data.total_stok);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {/* Card untuk menampilkan data pelanggan (customer) */}
      <Card
        style={{ width: "300px", margin: "10px", backgroundColor: "#C9D7DD" }}
      >
        <Card.Body>
          <BsPeople size={40} />
          <Card.Title>Data Customer</Card.Title>
          {customerCount !== null && (
            <Card.Text>Jumlah pelanggan: {customerCount}</Card.Text>
          )}
        </Card.Body>
      </Card>

      {/* Card untuk menampilkan data produk (product) */}
      <Card
        style={{ width: "300px", margin: "10px", backgroundColor: "#C9D7DD" }}
      >
        <Card.Body>
          <BsBox size={40} />
          <Card.Title>Data Product</Card.Title>
          {productCount !== null && (
            <Card.Text>Jumlah produk: {productCount}</Card.Text>
          )}
          {totalStock !== null && (
            <Card.Text>Total stok: {totalStock}</Card.Text>
          )}
        </Card.Body>
      </Card>

      {/* Card untuk menampilkan data pendapatan (income) */}
      {incomeData && (
        <Card
          style={{ width: "300px", margin: "10px", backgroundColor: "#C9D7DD" }}
        >
          <Card.Body>
            <BsCashStack size={40} />
            <Card.Title>Data Income</Card.Title>
            <Card.Text>
              Pendapatan Kotor: ${incomeData.pendapatan_kotor}
            </Card.Text>
            <Card.Text>
              Pendapatan Bersih: ${incomeData.pendapatan_bersih}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Grafik;
