import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function register({ username, email, password }) {
  const response = await api.post("/api/auth/register", {
    email,
    password,
    username,
  });

  return response.data;
}

export async function login({ username, email, password }) {
  const response = await api.post("/api/auth/login", {
    username,
    email,
    password,
  });

  return response.data;
}

export async function getme() {
  try {
    const response = await api.get("/api/auth/get-Me");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function logout() {
  const response = await api.post("/api/auth/logout");

  return response.data;
}
