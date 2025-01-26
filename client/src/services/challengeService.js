import axios from "axios";

export const getAllChallenges = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/challenge`);
  return res;
};

export const getOneChallenge = async (challengeId) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/challenge/${challengeId}`
  );
  return res;
};
