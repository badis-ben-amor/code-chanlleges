import axios from "axios";

export const login = async ({ email, password }) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/login`,
    {
      email,
      password,
    },
    { withCredentials: true }
  );
  return res;
};

export const register = async (credential) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/register`,
    { credential }
    // , { withCredentials: true }
  );
  return res;
};

export const refresh = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/refresh`,
    {},
    { withCredentials: true }
  );
  return res;
};

export const logout = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/logout`,
    {}
    // ,{ withCredentials: true }
  );
  return res;
};
