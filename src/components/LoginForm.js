import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import client from "../utils/axioshelper";

const LoginForm = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await client.post("/login", payload);
      console.log(response.data.data.data_user);
      console.log(response.data.data.token);

      localStorage.setItem("token", response.data.data.token);
      client.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.data.token}`;

      // Redirect to home page after successful login
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex align-items-center" style={{ height: "100vh" }}>
      <Container className="border p-5 w-50" style={{ background: "#9BB8E9" }}>
        <Form
          className="d-flex justify-content-center align-items-center flex-column gap-3"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center text-white">Login</h2>
          <Form.Group className="mb-3 w-100">
            <Form.Control
              type="text"
              id="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 w-100">
            <Form.Control
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            className="w-50"
            style={{ background: "#365486" }}
            variant="primary"
            type="submit"
          >
            Login
          </Button>
          <p className="text-center mt-3">
            Don’t have an account ?
            <Button variant="link" as={Link} to="/register">Register</Button>
          </p>
        </Form>
      </Container>
      {errMsg && <p>{errMsg}</p>}
    </div>
  );
};

export default LoginForm;
