import axios from "axios";

const API_URL = "http://localhost:5001/api/auth";

const login = async (id, password) => {
  const response = await axios.post(`${API_URL}/login`, { id, dob: password });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token); // Store the token
  }

  return response.data;
};

export default { login };
