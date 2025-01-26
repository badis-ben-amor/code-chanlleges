import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessToken } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleClick = () => {
    Swal.fire({
      title: "You must reload the page",
      text: "",
      icon: "info",
      confirmButtonText: "OK",
      customClass: {
        title: "custom-title",
        text: "custom-text",
      },
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginThunk({ email, password }));
    /*.unwrap()
      .then((data) => {
        if (data.user.role === "user") {
          window.location.href = "/";
          // dispatch(fetchUserProfileThunk);
          // navigate("/");
          // console.log(accessToken);
        } else {
          window.location.href = "/admin";
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Failed",
          text: error || "Invalid email or password",
          icon: "error",
          confirmButtonText: "OK",
        });
      });*/
  };

  return (
    <Container className="mt-5">
      {error && (
        <Row className="justify-content-center text-danger">{error}</Row>
      )}
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="p-4 shadow-lg">
            <Card.Body>
              <h3 className="text-center mb-4">Login</h3>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div className="d-grid">
                  {isLoading ? (
                    <div className="text-center">
                      <Spinner></Spinner>
                    </div>
                  ) : (
                    <Button variant="success" type="submit">
                      Sign In
                    </Button>
                  )}
                </div>
              </Form>
              <div className="text-center mt-3">
                <a href="#!" className="text-muted small">
                  Forgot your password?
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
