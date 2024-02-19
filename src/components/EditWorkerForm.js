import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";

function EditWorkerForm() {
  return (
    <div>
    <Form className="mt-5">
        <h3 className="text-center mb-5">Edit Worker</h3>
      <Form.Group as={Row} className="mb-3" controlId="name">
        <Form.Label column sm={2}>
          Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="Enter worker name" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="email">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="email" placeholder="Enter worker email" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Update Worker</Button>
        </Col>
      </Form.Group>
    </Form>
    </div>
  );
}

export default EditWorkerForm;
