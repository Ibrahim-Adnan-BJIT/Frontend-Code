import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Button, Container, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

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
  const handleHealthData = () => {
    // Navigate to the profile page
    navigate("/health-data");
  };
  const handleRecommendation = () => {
    // Navigate to the profile page
    navigate("/recommendation");
  };
  const handletrack = () => {
    // Navigate to the profile page
    navigate("/create-track");
  };
  const handleIncomplteteTrack = () => {
    // Navigate to the profile page
    navigate("/incomplete-track");
  };
  const handleCompletedProgress = () => {
    // Navigate to the profile page
    navigate("/complete-track");
  };

  return (
    <Navbar bg="light" variant="dark" expand="lg" className="text-center">
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
          <NavDropdown.Item onClick={handleHealthData}>
            Health Data
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleRecommendation}>
            Recommendations
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handletrack}>
            Track a Progress
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleIncomplteteTrack}>
            Incomplete Progress
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleCompletedProgress}>
            Completed Progress
          </NavDropdown.Item>
        </NavDropdown>

        {/* Wrap the title inside a Link */}
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Navbar.Brand as="h1" style={{ marginLeft: "38px" }}>
            Expo Health Management System
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="navbarToggleExternalContent" />
        <Navbar.Collapse
          id="navbarToggleExternalContent"
          className="justify-content-end"
        >
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Button
              variant="outline-dark"
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
