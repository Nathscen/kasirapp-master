import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Dropdown,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const NavbarComponent = () => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [history]);

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <FontAwesomeIcon icon={faBars} className="mr-2" />
        <Navbar.Brand as={Link} to="/" className="mr-auto">
          <strong>Simplecash</strong>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Dropdown className="ml-3" as={ButtonGroup}>
              <Button variant="primary" as={Link} to="/manage-product">
                Manage Product
              </Button>
              <Dropdown.Toggle
                split
                variant="primary"
                id="dropdown-split-basic"
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/add-product">
                  Add Product
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {isLoggedIn && (
              <Dropdown className="ml-3">
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Profile
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
