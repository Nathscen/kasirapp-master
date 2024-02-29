import React, { useState, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";


const NavbarComponent = () => {
  // State untuk menyimpan peran pengguna yang masuk
  const [userRole, setUserRole] = useState("");

  // Mengambil peran pengguna dari local storage saat komponen dimuat
  useEffect(() => {
    const userRoleFromLocalStorage = localStorage.getItem("userRole");
    if (userRoleFromLocalStorage) {
      setUserRole(userRoleFromLocalStorage);
    }
  }, []);

  // Fungsi untuk mengonversi kode peran menjadi label peran
  const getRoleLabel = (roleCode) => {
    switch (roleCode) {
      case "1":
        return "Admin";
      case "2":
        return "Owner";
      case "3":
        return "Petugas";
      default:
        return "";
    }
  };

  return (
    <Navbar expand="lg" variant="dark">
      <Container>
        <Navbar.Brand className="mr-auto">
          <strong>
            <h3 style={{ color: "white" }}>Simplecash</h3>
          </strong>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {userRole && (
              <span style={{ color: "white", marginRight: "10px" }}>
                Logged in as: {getRoleLabel(userRole)}
              </span>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
