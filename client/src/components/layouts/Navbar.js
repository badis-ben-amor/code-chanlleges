import React, { useEffect } from "react";
import { Button, Container, Nav, Navbar, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, logout } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { loginThunk, logoutThunk } from "../../redux/slices/authSlice";
import Swal from "sweetalert2";

function Navbare() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isRejected, user, isAuthenticated, isLoading, isSuccess, error } =
    useSelector((state) => state.user);

  const { isLoading: isLoadingAuth, isSuccess: isSuccessAuth } = useSelector(
    (state) => state.auth
  );

  // const handleClick = () => {
  //   Swal.fire({
  //     title: "You must reload the page",
  //     text: "",
  //     icon: "info",
  //     confirmButtonText: "OK",
  //     customClass: {
  //       title: "custom-title",
  //       text: "custom-text",
  //     },
  //   });
  // };

  const hangAdminButton = () => {
    dispatch(loginThunk({ email: "fff@gmail.com", password: "fff" }));
    // handleClick();
    navigate("/admin");
  };
  const handleLogout = () => {
    dispatch(logoutThunk())
      .then(() => {
        dispatch(logout());
        window.location.href = "/login";
      })
      .catch((error) => {
        Swal.fire({
          title: "Logout Failed",
          text: error || "",
          icon: "error",
          confirmButtonAriaLabel: "OK",
        });
      });
  };

  return (
    <Navbar bg="success" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Code Challenges</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/challenges">Challenges</Nav.Link>
            <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
          </Nav>
          <Nav>
            {(!isLoading || !isLoadingAuth) &&
            !isAuthenticated &&
            !isRejected ? (
              ""
            ) : isAuthenticated ? (
              <>
                <Nav.Link href="/profile">
                  <Button variant="outline-light">
                    {`Hello, ${user?.name}` || "My Account"}
                  </Button>
                </Nav.Link>
                <Nav.Link>
                  <Button variant="outline-light" onClick={handleLogout}>
                    Logout
                  </Button>
                </Nav.Link>
              </>
            ) : !isAuthenticated && isRejected ? (
              <>
                <Nav.Link>
                  <Button onClick={hangAdminButton} variant="outline-light">
                    Admin
                  </Button>
                </Nav.Link>
                <Nav.Link href="/login">
                  <Button variant="outline-light">Login</Button>
                </Nav.Link>
                <Nav.Link href="/register">
                  <Button variant="outline-light">Register</Button>
                </Nav.Link>
              </>
            ) : (
              ""
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbare;
