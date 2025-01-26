import axios from "axios";

export const getAllUserAdmin = async (accessToken) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/user`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res;
};

export const getOneUserAdmin = async (userId, accessToken) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/admin/user/${userId}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res;
};

export const createUserAdmin = async (userData, accessToken) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/admin/user`,
    { userData },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res;
};

export const updateUserAdmin = async (userData, userId, accessToken) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL}/admin/user/${userId}`,
    { userData },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res;
};

export const deleteUserAdmin = async (userId, accessToken) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/admin/user/${userId}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res;
};
