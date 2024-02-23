import React from 'react';
import { Container, Table } from 'react-bootstrap';

const transactionData = [
  { id: 1, date: '2022-01-01', type: 'Payment', amount: '100.00', status: 'Completed' },
  { id: 2, date: '2022-02-15', type: 'Refund', amount: '50.00', status: 'Pending' },
  { id: 3, date: '2022-03-20', type: 'Payment', amount: '200.00', status: 'Failed' },
];

function ManageTransaction() {
  return (
    <Container className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID Transaction</th>
            <th>Date</th>
            <th>Total Price</th>
            <th>Total Items</th>
          </tr>
        </thead>
        <tbody>
          {transactionData.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.date}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ManageTransaction;