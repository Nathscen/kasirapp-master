import React, { Component } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";

export default class ManageProductKasir extends Component {
  handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      // Add your logic here to delete the product
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Button variant="primary" className="mb-3 mt-3 ml-3" as={Link} to="/add-product">
              Add Product
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID Product</th>
                  <th>Photo</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Photo1.png</td>
                  <td>Ruler</td>
                  <td>@Rp. 30.000</td>
                  <td>15</td>
                  <td>
                    <Button variant="success" className="mr-2" as={Link} to="/edit-product">
                      Edit
                    </Button>
                    <Button variant="danger" onClick={this.handleDelete}>
                      Delete
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td colSpan={2}></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}
