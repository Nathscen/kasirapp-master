import React, { useState, useEffect } from "react";
import { Table, Button, Container, Pagination, Form } from "react-bootstrap";
import axios from "axios";

const ManageCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [error, setError] = useState(null); // Menggunakan variabel error
  const [page, setPage] = useState(1);
  const [perPage] = useState(5); // Menentukan jumlah baris per halaman
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsIm5hbWEiOiJhZG1pbiIsInJvbGUiOjEsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzA2Njc5Nzk4fQ.7c25nDj03rJ7js-G6qB6pb5RPd1sMrbWYKJTyvDbNts";
        const response = await axios.get(
          "http://127.0.0.1:8080/admin/list_customer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCustomers(response.data.data); // Mengambil data dari respons
        setFilteredCustomers(response.data.data); // Menyimpan data awal tanpa filter
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError("Error fetching customers"); // Menyimpan pesan kesalahan dalam variabel error
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = (id) => {
    console.log("Deleting customer with id:", id);
    // Tambahkan logika penghapusan data pelanggan di sini
  };

  const pageCount = Math.ceil(filteredCustomers.length / perPage);
  const pages = [...Array(pageCount).keys()].map((i) => i + 1);

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filtered = customers.filter((customer) =>
      customer.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  return (
    <div className="mt-4">
      <Container>
        {error && <p className="text-danger">{error}</p>}{" "}
        {/* Menampilkan pesan kesalahan jika terjadi */}
        <div className="d-flex justify-content-end mb-3">
          <Form.Control
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div style={{ overflowX: "auto" }}>
          {" "}
          {/* Mengatur scroll horizontal */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Pelanggan</th>
                <th>Email</th>
                <th>Nama</th>
                <th>No. Telepon</th>
                <th>Alamat</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer) => (
                <tr key={customer.id_pelanggan}>
                  <td>{customer.id_pelanggan}</td>
                  <td>{customer.email}</td>
                  <td>{customer.nama}</td>
                  <td>{customer.no_telp}</td>
                  <td>{customer.alamat}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(customer.id_pelanggan)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Pagination>
          {pages.map((pageNumber) => (
            <Pagination.Item
              key={pageNumber}
              active={pageNumber === page}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </div>
  );
};

export default ManageCustomer;
