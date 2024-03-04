import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { BsPeople, BsBox, BsCashStack } from "react-icons/bs";
import axios from "axios";

const Grafik = () => {
  const [incomeData, setIncomeData] = useState(null);
  const [customerCount, setCustomerCount] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const [totalStock, setTotalStock] = useState(null);
  const [bestSellerData, setBestSellerData] = useState([]);

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

        // Mengambil data best seller dari API
        const bestSellerResponse = await axios.get(
          "http://127.0.0.1:8080/admin/get_bestseller",
          config
        );
        console.log("Best Seller Data:", bestSellerResponse.data); // Logging response
        setBestSellerData(bestSellerResponse.data.data.data_best_seller);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk menambahkan koma pada angka
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
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
            <div>
              <Card.Text>Jumlah produk: {productCount}</Card.Text>
              <Card.Text>Total stok: {totalStock}</Card.Text>
            </div>
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
              Pendapatan Kotor: Rp.{" "}
              {numberWithCommas(incomeData.pendapatan_kotor)}
            </Card.Text>
            <Card.Text>
              Pendapatan Bersih: Rp.{" "}
              {numberWithCommas(incomeData.pendapatan_bersih)}
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      {/* Card untuk menampilkan data best seller */}
      <div style={{ width: "100%" }}>
        <h2 style={{ textAlign: "left", marginLeft: "10px" }}>Best Seller</h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {bestSellerData.map((item, index) => (
            <Card
              key={index}
              style={{
                width: "calc(33.33% - 20px)", // Mengatur lebar card agar menampilkan tiga card dalam satu baris
                margin: "10px",
                backgroundColor: "#C9D7DD",
              }}
            >
              <Card.Img variant="top" src={item.link_gambar} />
              <Card.Body>
                <Card.Title>{item.nama_produk}</Card.Title>
                <Card.Text>
                  Harga: Rp. {numberWithCommas(item.harga_produk)}
                </Card.Text>
                <Card.Text>Jumlah Terjual: {item.total_harga}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grafik;
