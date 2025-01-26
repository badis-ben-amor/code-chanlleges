import React, { useState } from "react";
import { Button, Nav, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button
        onClick={handleShow}
        className="mb-2 color_blue_01"
        style={{ position: "fixed", top: "78px", left: "0px", zIndex: 1000 }}
      >
        <i className="bi bi-list" />
        {/* Open */}
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Admin Panel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav defaultActiveKey="/admin/dashboard" className="flex-column  ">
            <Nav.Link
              as={Link}
              to="dashboard"
              className="d-flex justify-content-center align-items-center mb-2 "
              onClick={handleClose}
            >
              <Button variant="success">
                <i className="bi bi-speedometer2 me-2"></i> Dashboard
              </Button>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/challenges"
              className="d-flex justify-content-center align-items-center mb-2"
              onClick={handleClose}
            >
              <i className="bi bi-list-task me-2" />
              Challenges
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/users"
              className="d-flex justify-content-center align-items-center mb-2"
              onClick={handleClose}
            >
              <i className="bi bi-people me-2" /> Users
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/settings"
              className="d-flex justify-content-center align-items-center mb-2"
              onClick={handleClose}
            >
              <i className="bi bi-gear me-2" />
              Settings
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/logout"
              className="d-flex justify-content-center align-items-center mt-auto"
              onClick={handleClose}
            >
              <i className="bi bi--box-arrow-right me-2" />
              Logout
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
