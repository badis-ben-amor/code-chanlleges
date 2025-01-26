import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const FeaturedChallenges = () => {
  return (
    <Container className="my-5">
      <h2 className="test-center mb-4 fw-bold text-dark">
        Featured Challenges
      </h2>
      <Row>
        <Col md={4} sm={6} className="mb-4">
          <Card className="border border-light shadow">
            <Card.Body>
              <Card.Title>Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Difficulty
              </Card.Subtitle>
              <Card.Text>description</Card.Text>
              <Button variant="primary">View Challenge</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FeaturedChallenges;
