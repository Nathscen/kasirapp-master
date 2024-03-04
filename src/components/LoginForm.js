import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import client from "../utils/axioshelper";

const LoginForm = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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

      const role = response.data.data.data_user.role;
      if (role === 1) {
        history.push("/dashboard");
      } else if (role === 2) {
        history.push("/menu");
      } else if (role === 3) {
        history.push("/add-customer");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setErrMsg("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="d-flex align-items-center" style={{ height: "100vh" }}>
      <Container className="border p-5 w-50" style={{ background: "#FFFFFF" }}>
        <Form
          className="d-flex justify-content-center align-items-center flex-column gap-3"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center">LOGIN</h2>
          <Form.Group className="mb-3 w-100" controlId="email">
            <Form.Control
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={errMsg !== ""}
            />
            <Form.Control.Feedback type="invalid">
              Invalid email or password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 w-100" controlId="password">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={errMsg !== ""}
            />
            <Form.Control.Feedback type="invalid">
              Invalid email or password.
            </Form.Control.Feedback>
          </Form.Group>

          {errMsg && <p className="text-center text-danger">{errMsg}</p>}

          <Button
            className="w-50"
            style={{ background: "#365486" }}
            variant="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#365486" }}>
              Register
            </Link>
          </p>
        </Form>
      </Container>
    </div>
  );
};

export default LoginForm;
