import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Button, Container, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();

    // Navigate to the homepage
    navigate("/");
  };

  const handleSeeAppointments = () => {
    // Navigate to the see-appointments page
    navigate("/see-appointments");
  };

  const handleProfile = () => {
    // Navigate to the profile page
    navigate("/profile");
  };

  return (
    // Remove the block comment syntax inside JSX
    <Navbar
      bg="light" // Set background color to light
      variant="dark"
      expand="lg"
      className="text-center"
    >
      {/* Apply text-center class directly */}
      <Container fluid>
        <NavDropdown
          title={
            <span>
              <FontAwesomeIcon icon={faBars} className="mr-1" /> Menu
            </span>
          }
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item onClick={handleSeeAppointments}>
            See Appointments
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleProfile}>Profile</NavDropdown.Item>
        </NavDropdown>
        <Navbar.Brand as="h1" style={{ marginLeft: "38px" }}>
          Expo Health Management System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarToggleExternalContent" />
        <Navbar.Collapse
          id="navbarToggleExternalContent"
          className="justify-content-end"
        >
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Button
              variant="outline-dark" // Set button color to dark
              className="mr-2"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
