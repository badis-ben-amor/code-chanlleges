import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>About Us</h5>
            <p>
              We provide a platform for coding challenges to enhance your skills
              and compete globally
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Challenges
                </a>
              </li>
              <li>
                <a href="#!" className="text-white">
                  Contact
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Follow Us</h5>
            <div>
              <a href="#!" className="text-white me-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#!" className="text-white me-3">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#!" className="text-white me-3">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </Col>
        </Row>
        <Row className="text-center mt-3">
          <Col>
            <p className="mb-0">
              &copy; {new Date().getFullYear()} CodeChallenge. All Right
              Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
