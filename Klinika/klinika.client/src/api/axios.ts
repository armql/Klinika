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
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
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
    async (error) => {
        if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
            error.config.__isRetryRequest = true;
            const refreshToken = localStorage.getItem('refreshToken');
            return axios_instance
                .post('Auth/refreshToken', {
                    jwtToken: localStorage.getItem('jwtToken'),
                    refreshToken: refreshToken
                })
                .then((response) => {
                    localStorage.setItem('jwtToken', response.data.jwtToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                    axios_instance.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.jwtToken;
                    return axios_instance(error.config);
                });
        }
        return Promise.reject(error);
    }
);

export default axios_instance;
