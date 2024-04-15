import axios from "axios";
// import { target } from '../../vite.config';

// Creates an instance of axios
const axios_instance = axios.create({
  baseURL: "http://localhost:3001", // THIS IS EXPRESS
  // baseURL: target, // THIS IS SUPPOSEDLY ASP.NET
  timeout: 10000,
});

axios_instance.interceptors.request.use(
  (config) => {
    console.log("Request was sent");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios_instance.interceptors.response.use(
  (response) => {
    console.log("Response was received");
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios_instance;
