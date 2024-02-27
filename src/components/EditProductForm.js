import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditProductForm() {
  const { productId } = useParams(); // Menggunakan useParams untuk mendapatkan nilai productId dari URL
  const [product, setProduct] = useState({
    nama_produk: "",
    harga: "",
    stok: "",
    image: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/admin/get_produk/${productId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsIm5hbWEiOiJyaGV6YSIsInJvbGUiOjIsImVtYWlsIjoicmhlemFAZ21haWwuY29tIiwiaWF0IjoxNzA1NjMwNzIzfQ.oei98eWYpv_HadoOWyItxBP0VM5gzbpr0HWanZviE8c",
            },
          }
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    setProduct({
      ...product,
      image: event.target.files[0],
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nama_produk", product.nama_produk);
      formData.append("harga", product.harga);
      formData.append("stok", product.stok);
      formData.append("file", product.image);

      await axios.patch(
        `http://127.0.0.1:8080/admin/edit_produk/${productId}`,
        formData,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsIm5hbWEiOiJhZG1pbiIsInJvbGUiOjEsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzA1NDkxOTQ5fQ.pOr6cIx8R5btGAfTCWCTZ43DRBUk4RNO0xA0CG88LbM",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Menampilkan SweetAlert ketika produk berhasil diperbarui
      Swal.fire("Success", "Product updated successfully!", "success");

      console.log("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h3 className="text-center mb-5 mt-5">Edit Product</h3>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group as={Col} controlId="productImage">
          <Form.Label>Product Image</Form.Label>
          <Form.Control type="file" name="image" onChange={handleImageChange} />
        </Form.Group>

        <Form.Group as={Col} controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="nama_produk"
            value={product.nama_produk || ""}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="productPrice">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="number"
            name="harga"
            value={product.harga || ""}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="productStock">
          <Form.Label>Product Stock</Form.Label>
          <Form.Control
            type="number"
            name="stok"
            value={product.stok || ""}
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
    </div>
  );
}

export default EditProductForm;
