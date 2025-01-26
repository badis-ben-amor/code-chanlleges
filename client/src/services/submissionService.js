import axios from "axios";

export const submitSolution = async ({
  accessToken,
  challengeId,
  selectedOption,
}) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/submission`,
    {
      challengeId,
      selectedOption,
    },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res;
};
