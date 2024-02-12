import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      price: "",
      stock: "",
      image: null,
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
    this.props.onAddProduct(this.state);
    this.setState({
      productName: "",
      price: "",
      stock: "",
      image: null,
    });
  }

  render() {
    return (
      <div>
        <h2 className="text-center mt-5">Add Product</h2>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="image">
              <Form.Label><strong>Image</strong></Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="productName">
              <Form.Label><strong>Product Name</strong></Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={this.state.productName}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label><strong>Price</strong></Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="stock">
              <Form.Label><strong>Stock</strong></Form.Label>
              <Form.Control
                type="number"
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
