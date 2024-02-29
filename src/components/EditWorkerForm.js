import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";

function EditWorkerForm() {
  let { workerId } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWorkerData() {
      try {
        const url = `http://127.0.0.1:8080/admin/get_worker/${workerId}`;
        const token = localStorage.getItem("token");
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsername(data.username);
        setEmail(data.email);
      } catch (error) {
        console.error("Error fetching worker data:", error);
        setError("Error fetching worker data");
      }
    }

    fetchWorkerData();
  }, [workerId]); // Ensure useEffect runs when workerId changes

  const handleEdit = async () => {
    const url = `http://127.0.0.1:8080/admin/edit_worker/${workerId}`;
    const token = localStorage.getItem("token"); // Ambil token dari local storage

    const data = {
      username: username, // Update username field
      email: email, // Update email field
    };

    try {
      const response = await fetch(url, {
        method: "PATCH", // Change method to PATCH
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setError(null);

      Swal.fire({
        icon: "success",
        title: "Worker Updated!",
        text: "Worker information has been updated successfully.",
      });
    } catch (error) {
      console.error("There was an error!", error);
      setError("Error updating worker");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit();
  };

  return (
    <div>
      <Form className="mt-5" onSubmit={handleSubmit}>
        <h3 className="text-center mb-5">Edit Worker</h3>
        <Form.Group as={Row} className="mb-3" controlId="username">
          <Form.Label column sm={2}>
            Username
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="email">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Update Worker</Button>
          </Col>
        </Form.Group>
      </Form>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default EditWorkerForm;
