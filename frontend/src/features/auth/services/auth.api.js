import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000",
  withCredentials: true,
});

async function register({ username, email, password }) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function login({ email, password }) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function logout() {
  try {
    const response = await api.get("/api/auth/logout");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function getMe() {
  try {
    const response = await api.get("/api/auth/getMe");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}


export default { register, login, logout, getMe };
