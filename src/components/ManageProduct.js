import React, { Component } from "react";
import { Container, Table, Button, Row, Col, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class ManageProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [], // Menambahkan state untuk menyimpan hasil filter
    };
  }

  componentDidMount() {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsIm5hbWEiOiJhZG1pbiIsInJvbGUiOjEsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzA1NTcyODQ1fQ.HvG_Fz_5XcBMalVYjbT4u9Vv_SW_nHTFaydXBWCuxwc";
    axios
      .get("http://127.0.0.1:8080/admin/list_produk", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response from API:", response.data);
        this.setState({
          products: response.data.data,
          filteredProducts: response.data.data,
        }); // Mengatur kedua state
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  handleDelete = async (productId) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIyLCJuYW1hIjoic2FrdXJhIiwicm9sZSI6MSwiZW1haWwiOiJzYWt1cmFAZ21haWwuY29tIiwiaWF0IjoxNzA4ODQ5Mzk5fQ.oujHkXukgj_bTCx7YSSx5_6NwOWb_7aXzLGlra9uvBU";
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8080/admin/delete_produk/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        this.setState((prevState) => ({
          products: prevState.products.filter(
            (product) => product.id_produk !== productId
          ),
        }));
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      } else {
        Swal.fire("Error!", "Failed to delete product.", "error");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire("Error!", "Failed to delete product.", "error");
    }
  };

  handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase(); // Mengambil nilai input dan mengonversi menjadi lowercase
    const filteredProducts = this.state.products.filter((product) =>
      product.nama_produk.toLowerCase().includes(searchTerm)
    ); // Mencocokkan produk dengan nama yang mengandung kata kunci pencarian
    this.setState({ filteredProducts }); // Mengatur state filteredProducts dengan hasil filter
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Button
              variant="primary"
              className="mb-3 mt-3 ml-3"
              as={Link}
              to="/add-product"
            >
              Add Product
            </Button>
          </Col>
          <Col xs={6}>
            <Form.Control
              type="text"
              placeholder="Search by product name"
              onChange={this.handleSearch}
              className="mb-3 mt-3 ml-3"
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID Product</th>
                  <th>Photo</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.filteredProducts.map((product) => (
                  <tr key={product.id_produk}>
                    <td>{product.id_produk}</td>
                    <td>
                      <img
                        src={product.link_gambar}
                        alt="Product"
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{product.nama_produk}</td>
                    <td>{`@Rp. ${product.harga.toLocaleString()}`}</td>
                    <td>{product.stok}</td>
                    <td>
                      <Button
                        variant="success"
                        className="mr-2"
                        as={Link}
                        to={`/edit-product/${product.id_produk}`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => this.handleDelete(product.id_produk)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ManageProduct;
