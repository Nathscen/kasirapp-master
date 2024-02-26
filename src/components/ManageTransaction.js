import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Pagination,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

function ManageTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10); // Jumlah transaksi per halaman
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("id_penjualan"); // Default sort by id_penjualan
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order ascending

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsIm5hbWEiOiJhZG1pbiIsInJvbGUiOjEsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzA2Njc5Nzk4fQ.7c25nDj03rJ7js-G6qB6pb5RPd1sMrbWYKJTyvDbNts";
        const response = await axios.get(
          "http://127.0.0.1:8080/admin/list_transaksi",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTransactions(response.data.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Error fetching transactions");
      }
    };

    fetchTransactions();
  }, []);

  // Menghitung index transaksi pertama dan terakhir pada halaman saat ini
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Mengubah metode sort dan order
  const changeSortBy = (sortField) => {
    if (sortField === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sortField);
      setSortOrder("asc");
    }
  };

  // Fungsi untuk melakukan sorting
  const sortedTransactions = [...currentTransactions].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] - b[sortBy];
    } else {
      return b[sortBy] - a[sortBy];
    }
  });

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
          Created At
        </Dropdown.Item>
      </DropdownButton>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID Penjualan</th>
            <th>ID Pelanggan</th>
            <th>Total Harga</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
            <tr key={transaction.id_penjualan}>
              <td>{transaction.id_penjualan}</td>
              <td>{transaction.pelanggan_id_pelanggan}</td>
              <td>{transaction.total_harga}</td>
              <td>{transaction.created_at}</td>
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
