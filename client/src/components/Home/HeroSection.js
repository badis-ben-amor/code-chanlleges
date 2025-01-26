import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import img_01 from "../../assets/code_01.avif";

function HeroSection() {
  return (
    <section className="hero-section bg-light py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h3 className=" fw-bold">Level Up Your Coding Skills</h3>
            <p className="lead">
              join our communiy to solve challenges, learn new skills, and
              showcase your talent to the world
            </p>
            <div className="mt-4">
              <Button
                href="/challenges"
                variant="primary"
                size="lg"
                className="me-2"
              >
                Get Started
              </Button>
              <Button variant="outline-seconday" size="lg">
                Learn More
              </Button>
            </div>
          </Col>
          <Col md={6} className="text-center">
            <img
              src={img_01}
              alt="Coding Illustration"
              className="w-50 h-auto"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HeroSection;
