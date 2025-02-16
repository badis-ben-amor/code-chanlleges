import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChallengesThunk } from "../redux/slices/challengeSlice";
import { Badge, Button, Container, ListGroup } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Challenges = () => {
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
    <Container className="mt-4">
      <h1 className="mb-4">Challenges</h1>
      <ListGroup>
        {challenges.map((challenge) => (
          <ListGroup.Item
            key={challenge._id}
            className="d-flex justify-content-between align-items-center bg-dark"
          >
            <div>
              <h5>{challenge.title}</h5>
              <p className="mb-1">{challenge.description}</p>
              <div>
                <Badge
                  bg={
                    challenge.difficulty === "easy"
                      ? "success"
                      : challenge.difficulty === "hard"
                      ? "danger"
                      : "primary"
                  }
                  style={{ fontSize: "15px" }}
                >
                  {challenge.difficulty}
                </Badge>
                {challenge.tags.map((tag, i) => (
                  <Badge
                    key={i}
                    bg="warning"
                    className="ms-2"
                    text="dark"
                    style={{ fontSize: "15px" }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <Link to={challenge._id}>
              <Button className="ms-2" variant="info">
                Try Solve It <ArrowRightCircle />
              </Button>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Challenges;
