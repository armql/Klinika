import axios from "axios";

// const target = process.env.ASPNETCORE_HTTPS_PORT
//   ? `https://localhost:${process.env.ASPNETCORE_HTTPS_PORT}`
//   : process.env.ASPNETCORE_URLS
//   ? process.env.ASPNETCORE_URLS.split(";")[0]
//   : "https://localhost:7045";

// Creates an instance of axios
const axios_instance = axios.create({
  baseURL: "http://localhost:3001", // for .net use target target
  timeout: 10000,
});

axios_instance.interceptors.request.use(
  (config) => {
    // console.log("Request was sent");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios_instance.interceptors.response.use(
  (response) => {
    // console.log("Response was received");
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios_instance;
