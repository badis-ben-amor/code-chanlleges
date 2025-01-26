import axios from "axios";

export const fetchAllChallengesAdmin = async (accessToken) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/admin/challenge`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res;
};

export const createOneChallengeAdmin = async ({
  challengeData,
  accessToken,
}) => {
  const res = axios.post(
    `${process.env.REACT_APP_API_URL}/admin/challenge`,
    { challengeData },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res;
};

export const updateChallengeAdmin = async ({
  challengeId,
  challengeData,
  accessToken,
}) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL}/admin/challenge/${challengeId}`,
    { challengeData },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res;
};

export const deleteChallengeAdmin = async ({ challengeId, accessToken }) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/admin/challenge/${challengeId}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res;
};
