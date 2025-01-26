import axios from "axios";

export const getLeaderboard = async (accessToken) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}api/leaderboard`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return res;
};
