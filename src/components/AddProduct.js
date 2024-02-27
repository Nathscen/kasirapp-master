import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      price: "",
      stock: "",
      image: null,
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === "image") {
      this.setState({
        image: event.target.files[0],
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    // Validasi apakah field-field yang diperlukan sudah diisi
    if (
      !this.state.productName ||
      !this.state.price ||
      !this.state.stock ||
      !this.state.image
    ) {
      this.setState({ error: "Please fill out all the fields." });
      return;
    }

    const formData = new FormData();
    formData.append("nama_produk", this.state.productName);
    formData.append("harga", this.state.price);
    formData.append("stok", this.state.stock);
    formData.append("file", this.state.image);

    console.log("Form Data:", formData); // Log form data to inspect

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsIm5hbWEiOiJhZG1pbiIsInJvbGUiOjEsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzA1NjQ1NzAzfQ.83drLyuMv2lRYB0nVup6GSuTjrHsbQobSCFUeKcSsls";

    axios
      .post("http://127.0.0.1:8080/admin/add_produk", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Ensure correct content type
        },
      })
      .then((response) => {
        // Handle response, for example show success message
        console.log("Product added successfully");
        // Reset form state
        this.setState({
          productName: "",
          price: "",
          stock: "",
          image: null,
          error: null,
        });
      })
      .catch((error) => {
        // Handle error, for example show error message
        console.error("Error adding product:", error);
        if (error.response) {
          console.error("Server error:", error.response.data); // Log server response data if available
        }
        this.setState({ error: "An error occurred while adding the product." });
      });
  }

  render() {
    return (
      <div>
        <h2 className="text-center mt-5">Add Product</h2>
        <Container>
          {this.state.error && (
            <p className="text-danger">{this.state.error}</p>
          )}
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="image">
              <Form.Label>
                <strong>Image</strong>
              </Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="productName">
              <Form.Label>
                <strong>Product Name</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={this.state.productName}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>
                <strong>Price</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="stock">
              <Form.Label>
                <strong>Stock</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="stock"
                value={this.state.stock}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default AddProduct;
