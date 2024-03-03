// ManageTransaction.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function ManageTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:8080/admin/list_transaksi",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTransactions(response.data.data);
        console.log("Data transaksi berhasil diambil:", response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Error fetching transactions");
      }
    };

    fetchTransactions();
  }, []);

  const handleRefund = async (transactionId) => {
    console.log("Refunding transaction with ID:", transactionId);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://127.0.0.1:8080/admin/detail_transaksi?idtransaksi=${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedTransaction(response.data.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    }
  };

  return (
    <Container className="mt-5">
      {error && <p className="text-danger">{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID Penjualan</th>
            <th>ID Pelanggan</th>
            <th>Total Harga</th>
            <th>Tanggal Transaksi</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id_penjualan}>
              <td>{transaction.id_penjualan}</td>
              <td>{transaction.pelanggan_id_pelanggan}</td>
              <td>{transaction.total_harga}</td>
              <td>{new Date(transaction.created_at).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="warning"
                  as={Link}
                  to={`/manage-transaction/${transaction.id_penjualan}`}
                  onClick={() => handleRefund(transaction.id_penjualan)}
                >
                  Refund
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Transaction ID: {selectedTransaction?.id_penjualan}</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {selectedTransaction?.detail_transaksi.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.nama_produk}</td>
                  <td>{detail.jumlah_produk}</td>
                  <td>{detail.sub_total}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default ManageTransaction;
