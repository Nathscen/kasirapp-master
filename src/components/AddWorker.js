import React, { useState } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function AddWorker() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Ambil token dari local storage

      const response = await axios.post(
        "http://127.0.0.1:8080/admin/add_worker",
        {
          username: name,
          email: email,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Jika respons dari server menunjukkan bahwa pekerja telah berhasil ditambahkan
      if (response.status === 200) {
        // Tampilkan SweetAlert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Worker added successfully",
        });

        // Reset form state
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      // Handle error, for example show error message
      console.error("Error adding worker:", error);
    }
  };

  return (
    <Container>
      <Col>
        <Form onSubmit={handleSubmit} className="mt-5">
          <h3 className="text-center mb-5">Add Worker</h3>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Worker
          </Button>
        </Form>
      </Col>
    </Container>
  );
}

export default AddWorker;
