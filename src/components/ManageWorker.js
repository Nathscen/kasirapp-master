import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";

const workerData = [
  { id: 1, name: "John Doe"},
  { id: 2, name: "Alex Ray"},
  { id: 3, name: "Kate Hunington"},
];

function ManageWorker() {
  const handleDelete = (workerId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        workerData(workerData.filter((worker) => worker.id !== workerId));
        Swal.fire("Deleted!", "The worker has been deleted.", "success");
      }
    });
  };

  return (
    <Container className="mt-5">
      <Button variant="primary" className="mb-3" as={Link} to="/add-worker">
        Add Worker
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workerData.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.id}</td>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                    alt=""
                    style={{
                      width: "45px",
                      height: "45px",
                      objectFit: "cover",
                    }}
                    className="rounded-circle me-3"
                  />
                  <div>
                    <p className="fw-bold mb-1">{worker.name}</p>
                    <p className="text-muted mb-0">john.doe@gmail.com</p>
                  </div>
                </div>
              </td>
              <td></td>
              <td>
                <Button
                  variant="primary"
                  className="text-decoration-none mr-2"
                  as={Link}
                  to="/edit-worker"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(worker.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ManageWorker;
