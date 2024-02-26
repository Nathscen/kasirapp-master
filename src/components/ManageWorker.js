import React, { Component } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

class ManageWorker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workers: [],
    };
  }

  componentDidMount() {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIyLCJuYW1hIjoic2FrdXJhIiwicm9sZSI6MSwiZW1haWwiOiJzYWt1cmFAZ21haWwuY29tIiwiaWF0IjoxNzA4ODQ5Mzk5fQ.oujHkXukgj_bTCx7YSSx5_6NwOWb_7aXzLGlra9uvBU";
    axios
      .get("http://127.0.0.1:8080/admin/list_worker", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response from API:", response.data);
        this.setState({ workers: response.data.data });
      })
      .catch((error) => {
        console.error("Error fetching workers:", error);
      });
  }

  handleDelete = (workerId) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIyLCJuYW1hIjoic2FrdXJhIiwicm9sZSI6MSwiZW1haWwiOiJzYWt1cmFAZ21haWwuY29tIiwiaWF0IjoxNzA4ODQ5Mzk5fQ.oujHkXukgj_bTCx7YSSx5_6NwOWb_7aXzLGlra9uvBU";
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
        axios
          .delete(`http://127.0.0.1:8080/admin/delete_worker/${workerId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            this.setState({
              workers: this.state.workers.filter(
                (worker) => worker.iduser !== workerId
              ),
            });
            Swal.fire("Deleted!", "The worker has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting worker:", error);
          });
      }
    });
  };

  render() {
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
            {this.state.workers.map((worker) => (
              <tr key={worker.iduser}>
                <td>{worker.iduser}</td>
                <td>{worker.email}</td>
                <td>{worker.username}</td>
                <td>
                  <Button
                    variant="primary"
                    className="text-decoration-none mr-2"
                    as={Link}
                    to={`/edit-worker/${worker.iduser}`} // Disertakan ID pekerja dalam URL
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => this.handleDelete(worker.iduser)}
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
}
export default ManageWorker;
