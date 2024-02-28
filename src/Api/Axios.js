import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://amazon-api-backend-x66p.onrender.com/",
});

export { axiosInstance };
