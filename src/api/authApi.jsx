import API from "../services/api";

export const loginUser = (credentials) =>
  API.post("/auth/login/", credentials);

export const refreshToken = (refresh) =>
  API.post("/auth/refresh/", { refresh });