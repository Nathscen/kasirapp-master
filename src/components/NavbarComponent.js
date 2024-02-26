import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="mr-auto">
          <strong>
            <h3 style={{ color: "white" }}>Simplecash</h3>
          </strong>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
