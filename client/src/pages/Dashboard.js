import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";
import { fetchUserProfileThunk } from "../redux/slices/userSlice";
import { getAllChallengesThunk } from "../redux/slices/challengeSlice";

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [challenges, setChallenges] = useState([]);

  const { user, isAuthenticate, isLoading, error } = useSelector(
    (state) => state.user
  );
  const {
    challenges: allChallenges,
    isLoading: challengesLoading,
    error: challengesError,
  } = useSelector((state) => state.challenges);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfileThunk);
    dispatch(getAllChallengesThunk);
  }, [dispatch]);

  useEffect(() => {
    setUserData(user);
    setChallenges(allChallenges);
  }, [user, allChallenges]);

  return (
    <Container>
      <h1>Dashboard</h1>
      {userData ? (
        <Row>
          <h2>Welcame, {userData.name}</h2>
          <p>Email: {userData.email}</p>
          <p>Points: {userData.points}</p>
          <p>Role: {userData.Role}</p>
        </Row>
      ) : (
        <p>loading...</p>
      )}
    </Container>
  );
};

export default Dashboard;
