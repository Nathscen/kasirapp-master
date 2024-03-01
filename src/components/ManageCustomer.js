import React, { useState, useEffect } from "react";
import { Table, Button, Container, Pagination, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

const ManageCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk nilai teks pencarian

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:8080/admin/list_customer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCustomers(response.data.data.data_customer); // Mengubah respons di sini
        console.log("Data pelanggan berhasil diambil:", response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError("Error fetching customers");
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://127.0.0.1:8080/admin/delete_customer/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setCustomers(
          customers.filter((customer) => customer.id_pelanggan !== id)
        );
        Swal.fire("Deleted!", "Customer has been deleted.", "success");
      } else {
        Swal.fire("Error!", "Failed to delete customer.", "error");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      Swal.fire("Error!", "Failed to delete customer.", "error");
    }
  };

  const pageCount = Math.ceil(customers.length / perPage);
  const pages = [...Array(pageCount).keys()].map((i) => i + 1);

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentCustomers = customers.slice(startIndex, endIndex);

  // Logika untuk menyaring data berdasarkan teks pencarian
  const filteredCustomers = currentCustomers.filter((customer) =>
    customer.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  // Fungsi untuk menangani perubahan teks pencarian
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    console.log("Search term:", e.target.value); // Tambahkan log di sini
  };

  return (
    <div className="mt-4">
      <Container>
        {error && <p className="text-danger">{error}</p>}
        <div style={{ overflowX: "auto" }}>
          <Form className="mb-3">
            <Form.Group controlId="formSearch">
              <Form.Control
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearchTermChange} // Memanggil fungsi handleSearchTermChange saat nilai berubah
              />
            </Form.Group>
          </Form>
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
              {filteredCustomers.map((customer) => (
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
