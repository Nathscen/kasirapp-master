import React from "react";
import { Container, Table } from "react-bootstrap";

const workerData = [
  { id: 1, name: "John Doe", position: "Software Engineer", status: "Active" },
  { id: 2, name: "Alex Ray", position: "Consultant", status: "Onboarding" },
  { id: 3, name: "Kate Hunington", position: "Designer", status: "Awaiting" },
];

function ManageWorker() {
  return (
    <Container className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Position</th>
            <th>Status</th>
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
              <td>{worker.position}</td>
              <td>
                <span
                  className={`badge bg-${
                    worker.status === "Active"
                      ? "success"
                      : worker.status === "Onboarding"
                      ? "primary"
                      : "warning"
                  } text-uppercase`}
                >
                  {worker.status}
                </span>
              </td>
              <td>
                <button className="btn btn-link">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ManageWorker;
