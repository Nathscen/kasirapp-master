import React, { Component } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

class ManageWorker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workers: [],
      searchTerm: "",
    };
  }

  componentDidMount() {
    // Ambil token dari local storage
    const token = localStorage.getItem("token");

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
    // Ambil token dari local storage
    const token = localStorage.getItem("token");

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

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const filteredWorkers = this.state.workers.filter((worker) =>
      worker.email.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );

    return (
      <Container className="mt-5">
        <Button variant="primary" className="mb-3" as={Link} to="/add-worker">
          Add Worker
        </Button>
        <Form className="mb-3 float-right">
          <Form.Control
            type="text"
            placeholder="Search by email"
            value={this.state.searchTerm}
            onChange={this.handleSearch}
          />
        </Form>
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
            {filteredWorkers.map((worker) => (
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
