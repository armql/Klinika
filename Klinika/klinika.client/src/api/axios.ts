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
        const auth = localStorage.getItem('auth');
        if (auth) {
            const parsedAuth = JSON.parse(auth);
            const token = parsedAuth.state.data.jwtToken;
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
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
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const auth = localStorage.getItem('auth');
            if (auth) {
                const parsedAuth = JSON.parse(auth);
                const jwtToken = parsedAuth.state.data.jwtToken;
                const refreshToken = parsedAuth.state.data.refreshToken;

                try {
                    const response = await axios_instance.post('Auth/refreshToken', {
                        jwtToken: jwtToken,
                        refreshToken: refreshToken
                    });
                    parsedAuth.state.data.jwtToken = response.data.jwtToken;
                    parsedAuth.state.data.refreshToken = response.data.refreshToken;
                    localStorage.setItem('auth', JSON.stringify(parsedAuth));
                    axios_instance.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.jwtToken;
                    originalRequest.headers['Authorization'] = 'Bearer ' + response.data.jwtToken;
                    return axios_instance(originalRequest);
                } catch (refreshError) {
                    console.log('Token refresh failed', refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axios_instance;