import React from "react";
import { Table, Button, Container } from "react-bootstrap";

const ManageCustomer = () => {
  const customers = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Doe", email: "jane.doe@example.com" },
  ];

  const handleDelete = (id) => {
    console.log("Deleting customer with id:", id);
  };

  return (
    <div className="mt-4">
        <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(customer.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Container>
    </div>
    
  );
};

export default ManageCustomer;
