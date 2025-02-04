import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneChallengeThunk } from "../redux/slices/challengeSlice";
import { submitSolutionThunk } from "../redux/slices/submissionSlice";
import { useParams } from "react-router-dom";
import { Button, Card, Container, ListGroup } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";

const ChallengeDetails = () => {
  const params = useParams();
  const { challengeId } = params;
  const dispatch = useDispatch();
  const { challenge: challengeData } = useSelector((state) => state.challenge);
  const { accessToken } = useSelector((state) => state.auth);
  const { isCorrect, isLoading } = useSelector((state) => state.submission);

  const [challenge, setChallenge] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getOneChallengeThunk(challengeId));
  }, [dispatch]);

  useEffect(() => {
    setChallenge(challengeData);
  }, [challengeData]);

  const handleSubmit = () => {
    dispatch(
      submitSolutionThunk({
        challengeId,
        selectedOption: selectedOption,
      })
    );
    setSubmitted(true);
  };

  return (
    <Container>
      <h1>{challenge.title}</h1>
      <Card>
        <Card.Body>
          <Card.Title>Description</Card.Title>
          <Card.Text>{challenge.description}</Card.Text>
          <Card.Title>Difficulty</Card.Title>
          <Card.Text>{challenge.difficulty}</Card.Text>
        </Card.Body>
      </Card>

      <h3>Choose an Option</h3>
      <ListGroup>
        {challenge.options?.map((option, i) => (
          <ListGroup.Item
            key={i}
            onClick={() => setSelectedOption(option)}
            active={selectedOption?._id === option._id}
            style={{ cursor: "pointer" }}
          >
            {option.option}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="mt-3">
        <Button onClick={handleSubmit} disabled={!selectedOption || isLoading}>
          {/* <Button onClick={handleSubmit} disabled={!selectedOption || submitted}> */}
          Submit
        </Button>
      </div>

      {submitted && !isLoading && (
        <Fade>
          <div className="mt-3">
            {isCorrect ? (
              <p style={{ color: "green" }}>Correct! 🎉</p>
            ) : (
              <p style={{ color: "red" }}>Incorrect ❌</p>
            )}
          </div>
        </Fade>
      )}
    </Container>
  );
};

export default ChallengeDetails;
