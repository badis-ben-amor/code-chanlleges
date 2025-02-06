// StepByStepLayout.js
import React, { useState } from "react";
import { Container, Card, Button, ListGroup } from "react-bootstrap";

const challengeDetails = () => {
  const challenge = {
    title: "Challenge Title",
    description: "Description of the challenge.",
    difficulty: "Medium",
    options: [
      { option: "Option 1", isCorrect: false },
      { option: "Option 2", isCorrect: true },
      { option: "Option 3", isCorrect: false },
    ],
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setCurrentStep(3); // Jump to results step
  };

  return (
    <Container>
      <h1>{challenge.title}</h1>
      {currentStep === 1 && (
        <Card>
          <Card.Body>
            <Card.Title>Description</Card.Title>
            <Card.Text>{challenge.description}</Card.Text>
            <Card.Title>Difficulty</Card.Title>
            <Card.Text>{challenge.difficulty}</Card.Text>
          </Card.Body>
        </Card>
      )}
      {currentStep === 2 && (
        <>
          <h3>Choose an Option</h3>
          <ListGroup>
            {challenge.options.map((option, index) => (
              <ListGroup.Item
                key={index}
                onClick={() => setSelectedOption(option.option)}
                active={selectedOption === option.option}
                style={{ cursor: "pointer" }}
              >
                {option.option}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
      {currentStep === 3 && (
        <div>
          {submitted ? (
            challenge.options.find((option) => option.option === selectedOption)
              ?.isCorrect ? (
              "Correct!"
            ) : (
              "Incorrect!"
            )
          ) : (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
        </div>
      )}

      <div className="mt-3">
        <Button onClick={handlePrev} disabled={currentStep === 1}>
          Previous
        </Button>
        <Button onClick={handleNext} className="ml-2">
          {currentStep === 3 ? "Finish" : "Next"}
        </Button>
      </div>
    </Container>
  );
};

export default challengeDetails;
