import React from "react";
import { Form, Button, Container } from "react-bootstrap";

const AddCustomerForm = () => {
  return (
    <div className="d-flex align-items-center" style={{ height: "100vh" }}>
      <Container className="border p-5 w-50" style={{ background: "#9BB8E9" }}>
        <Form className="d-flex justify-content-center align-items-center flex-column gap-3">
          <h3 className="text-center text-white">Customer Data</h3>
          <Form.Group className="mb-3 w-100" controlId="formName">
            <Form.Control type="text" placeholder="Name" />
          </Form.Group>

          <Form.Group className="mb-3 w-100" controlId="formEmail">
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>

          <Form.Group className="mb-3 w-100" controlId="formAddress">
            <Form.Control type="text" placeholder="Address" />
          </Form.Group>

          <Form.Group className="mb-3 w-100" controlId="formPhone">
            <Form.Control type="tel" placeholder="Phone number" />
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
