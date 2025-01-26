import axios from "axios";

export const getActivity = async (accessToken) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}api/activity`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res;
};
