import axios from "axios";
// import process from "process";

// const target = process.env.ASPNETCORE_HTTPS_PORT
//   ? `https://localhost:${process.env.ASPNETCORE_HTTPS_PORT}`
//   : process.env.ASPNETCORE_URLS
//   ? process.env.ASPNETCORE_URLS.split(";")[0]
//   : "https://localhost:7045";

// Creates an instance of axios
const axios_instance = axios.create({
  baseURL: "/api/",
  timeout: 40000,
});

axios_instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios_instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios_instance;
