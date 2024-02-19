import React from "react";
import { Form, Button, Col } from "react-bootstrap";

export default function EditProductForm({ onSubmit, initialProductValues }) {
  const [product, setProduct] = React.useState(initialProductValues);

  const handleInputChange = (event) => {
    setProduct({
      ...product,
      [event.target]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    setProduct({
      ...product,
      image: event.target.files[0],
    });
  };

  return (
    <Form onSubmit={(event) => onSubmit(event, product)}>
      <Form.Group as={Col} controlId="productImage">
        <Form.Label>Product Image</Form.Label>
        <Form.Control type="file" name="image" onChange={handleImageChange} />
      </Form.Group>

      <Form.Group as={Col} controlId="productName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={product}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group as={Col} controlId="productPrice">
        <Form.Label>Product Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={product}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group as={Col} controlId="productStock">
        <Form.Label>Product Stock</Form.Label>
        <Form.Control
          type="number"
          name="stock"
          value={product}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group as={Col} className="mt-3">
        <Button variant="primary" type="submit">
          Update Product
        </Button>
      </Form.Group>
    </Form>
  );
}
