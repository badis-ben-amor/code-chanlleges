import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllChallengesThunk } from "../../redux/slices/challengeSlice";
import { Link } from "react-router-dom";

const FeaturedChallenges = () => {
  const dispatch = useDispatch();
  const { challenges: challengesData } = useSelector(
    (state) => state.challenge
  );

  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    dispatch(getAllChallengesThunk());
  }, [dispatch]);

  useEffect(() => {
    setChallenges(challengesData);
  }, [challengesData]);

  return (
    <Container className="my-5">
      <h2 className="test-center mb-4 fw-bold text-dark">
        Featured Challenges
      </h2>
      <Row>
        {challenges.slice(0, 3).map((challenge) => (
          <Col key={challenge._id} md={4} sm={6} className="mb-4">
            <Card className="border border-light shadow">
              <Card.Body>
                <Card.Title>{challenge.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {challenge.difficulty}
                </Card.Subtitle>
                <Card.Text>{challenge.description}</Card.Text>
                <Link to={`/challenges/${challenge._id}`}>
                  <Button variant="primary">View Challenge</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedChallenges;
