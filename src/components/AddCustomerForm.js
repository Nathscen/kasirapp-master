import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";

const AddCustomerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Retrieve token from local storage on component mount
    const token = localStorage.getItem("token");
    if (token) {
      // Set token in Axios headers if it exists
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.phoneNumber
    ) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/petugas/add_penjualan",
        {
          nama: formData.name,
          email: formData.email,
          no_telp: formData.phoneNumber,
          alamat: formData.address,
        }
      );

      if (response.status === 200) {
        const token = response.data.token; // Assuming the token is returned from server
        localStorage.setItem("token", token); // Save token to local storage
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set token in Axios headers
        setSuccessMessage("Customer data has been successfully added.");
        setFormData({
          name: "",
          email: "",
          address: "",
          phoneNumber: "",
        });
      } else {
        setErrorMessage("Failed to add customer data. Please try again later.");
      }
    } catch (error) {
      setErrorMessage("Failed to add customer data. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="d-flex align-items-center" style={{ height: "100vh" }}>
      <Container className="border p-5 w-50" style={{ background: "#FFFFFF" }}>
        <Form
          className="d-flex justify-content-center align-items-center flex-column gap-3"
          onSubmit={handleSubmit}
        >
          <h3 className="text-center">Customer Data</h3>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form.Group className="mb-3 w-100" controlId="formName">
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
          </Form.Group>

          <Form.Group className="mb-3 w-100" controlId="formEmail">
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group className="mb-3 w-100" controlId="formAddress">
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
            />
          </Form.Group>

          <Form.Group className="mb-3 w-100" controlId="formPhone">
            <Form.Control
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone number"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            style={{ background: "#365486" }}
          >
            Next
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddCustomerForm;
