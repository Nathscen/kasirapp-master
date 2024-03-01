import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://127.0.0.1:8080/register",
      data: {
        username: username,
        email: email,
        confirm_password: password,
      },
    })
      .then((data) => {
        Swal.fire({
          title: "Register Berhasil",
          text: data.data.message,
          icon: "success",
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Register Gagal",
          text: error.response.data.message,
          icon: "warning",
          timer: 1500,
        });
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="d-flex align-items-center" style={{ height: "100vh" }}>
      <Container className="border p-5 w-50" style={{ background: "#FFFFFF" }}>
        <Form
          onSubmit={handleSubmit}
          className="d-flex justify-content-center align-items-center flex-column gap-3"
        >
          <h2 className="text-center">Register</h2>
          <Form.Group className="mb-3 w-100">
            <Form.Control
              type="email"
              id="registerEmail"
              className="form-control mb-3 w-100"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 w-100">
            <Form.Control
              type="text"
              id="registerUsername"
              className="form-control mb-3 w-100"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 w-100">
            <Form.Control
              type={showPassword ? "text" : "password"}
              id="registerPassword"
              className="form-control mb-3 w-100"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="primary" onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </Form.Group>

          <Button type="submit" className="w-50">
            Register
          </Button>
          <p className="text-center mt-3">
            Already have an account ?
            <Button variant="link" as={Link} to="/login">
              Login
            </Button>
          </p>
        </Form>
      </Container>
    </div>
  );
};

export default RegisterForm;
