import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import client from '../utils/axioshelper';


const LoginForm = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await client.post("/login", payload); // Use axios directly
      console.log(response.data.data.data_user);
      console.log(response.data.data.token);

      localStorage.setItem("token", response.data.data.token);
      client.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.data.token}`;

      // Redirect to appropriate page based on user role
      const role = response.data.data.data_user.role;
      if (role === 1) {
        history.push("/dashboard");
      } else if (role === 2) {
        history.push("/kasir");
      }
    } catch (err) {
      console.log(err);
      setLoading(false); // Set loading state to false
      setErrMsg("Failed to login. Please check your credentials."); // Generic error message
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
          <Form.Group className="mb-3 w-100" controlId="email">
            <Form.Control
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={errMsg !== ""} // Set isInvalid if error message exists
            />
            <Form.Control.Feedback type="invalid">Invalid email or password.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 w-100" controlId="password">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={errMsg !== ""} // Set isInvalid if error message exists
            />
            <Form.Control.Feedback type="invalid">Invalid email or password.</Form.Control.Feedback>
          </Form.Group>

          {errMsg && <p className="text-center text-danger">{errMsg}</p>}

          <Button
            className="w-50"
            style={{ background: "#365486" }}
            variant="primary"
            type="submit"
            disabled={loading} // Disable button while loading
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
