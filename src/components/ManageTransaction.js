import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Pagination,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";

function ManageTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("id_penjualan");
  const [sortOrder, setSortOrder] = useState("asc");
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

  const handleRefund = (transactionId) => {
    console.log("Refunding transaction with ID:", transactionId);
    // Implement logic for refunding transaction
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const changeSortBy = (sortField) => {
    if (sortField === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sortField);
      setSortOrder("asc");
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] - b[sortBy];
    } else {
      return b[sortBy] - a[sortBy];
    }
  });

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = sortedTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <Container className="mt-5">
      {error && <p className="text-danger">{error}</p>}
      <DropdownButton
        id="dropdown-basic-button"
        title={`Sort By: ${sortBy} (${sortOrder.toUpperCase()})`}
        onSelect={() => changeSortBy(sortBy)}
        className="mb-3"
        style={{ width: "200px" }}
        variant="secondary"
      >
        <Dropdown.Item onClick={() => changeSortBy("id_penjualan")}>
          ID Penjualan
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeSortBy("pelanggan_id_pelanggan")}>
          ID Pelanggan
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeSortBy("total_harga")}>
          Total Harga
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeSortBy("created_at")}>
          Tanggal Transaksi
        </Dropdown.Item>
      </DropdownButton>
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
          {currentTransactions.map((transaction) => (
            <tr key={transaction.id_penjualan}>
              <td>{transaction.id_penjualan}</td>
              <td>{transaction.pelanggan_id_pelanggan}</td>
              <td>{transaction.total_harga}</td>
              <td>{new Date(transaction.created_at).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleRefund(transaction.id_penjualan)}
                >
                  Refund
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({
          length: Math.ceil(transactions.length / transactionsPerPage),
        }).map((_, index) => (
          <Pagination.Item key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
}

export default ManageTransaction;
