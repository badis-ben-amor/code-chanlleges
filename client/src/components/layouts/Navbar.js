import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { loginThunk, logoutThunk } from "../../redux/slices/authSlice";
import { PersonCircle, Trophy, List } from "react-bootstrap-icons";

function Navbare() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isRejected, user, isAuthenticated, isLoading } = useSelector(
    (state) => state.user
  );

  const { isLoading: isLoadingAuth, isSuccess: isSuccessAuth } = useSelector(
    (state) => state.auth
  );
  const hangAdminButton = () => {
    dispatch(loginThunk({ email: "fff@gmail.com", password: "fff" }));
    navigate("/admin");
  };

  const handleLogout = () => {
    dispatch(logoutThunk()).then(() => {
      dispatch(logout());
      window.location.href = "/login";
    });
  };

  return (
    <Navbar bg="success" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Trophy size={24} className="me-2" /> Code Challenges
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ marginLeft: "100px" }}>
            <Nav.Link className="me-5" href="/challenges">
              <List size={20} className="me-2" />
              Challenges
            </Nav.Link>
            <Nav.Link className="me-5" href="/leaderboard">
              <Trophy size={20} className="me-2" />
              Leaderboard
            </Nav.Link>
            <Nav.Link className="me-5" href="/admin">
              <PersonCircle size={20} className="me-2" /> Admin
            </Nav.Link>
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
                    <PersonCircle size={18} className="me-2" />
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
