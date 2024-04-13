import axios from "axios";

// Creates an instance of axios
const axios_instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000, // 10 seconds
});

// Add a request interceptor
axios_instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    console.log("Request was sent");
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios_instance.interceptors.response.use(
  (response) => {
    // Do something with response data
    console.log("Response was received");
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axios_instance;
