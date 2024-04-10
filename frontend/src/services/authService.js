import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const login = async (username, password) =>
  axios.post(
    `${BASE_URL}/log-in`,
    { username, password },
    { withCredentials: true }
  );
export const autoLogin = async () =>
  axios.get(`${BASE_URL}/auto-login`, { withCredentials: true });

export const userLogout = async (id) =>
  axios.post(`${BASE_URL}/log-out/${id}`, {}, { withCredentials: true });

export const saveLoggedInUser = (id, username) => {
  sessionStorage.setItem("authenticatedId", id);
  sessionStorage.setItem("authenticatedUser", username);
};

export const getLoggedInUser = () => {
  const username = sessionStorage.getItem("authenticatedUser");
  return username;
};

export const getLoggedInUserId = () => {
  const id = sessionStorage.getItem("authenticatedId");
  return id;
};

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};
