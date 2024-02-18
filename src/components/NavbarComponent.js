import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand as={Link} to="/" className="mr-auto">
          <strong><h3 style={{ color: "white" }}>Simplecash</h3></strong>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
