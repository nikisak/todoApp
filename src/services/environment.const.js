export const USER_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
};

export const TODO_ENDPOINTS = {
  ADD: "/addtodo",
  UPDATE: "/updatetodo",
  DELETE: "/deletetodo",
};

const BASE_URL = "http://localhost:8009";

export const composeURL = (ENDPOINT) => BASE_URL + ENDPOINT;
