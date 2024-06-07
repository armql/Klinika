import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {authState} from "../util/authState.ts";

const axios_instance = axios.create({
    baseURL: "/api/",
    timeout: 40000,
});

axios_instance.interceptors.request.use((config) => {
    const token = authState.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axios_instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response) {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const response = await axios_instance.get("Auth/refreshToken");
                    const decoded = jwtDecode(response.data.jwtToken);
                    const userData = {
                        id: decoded[
                            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                            ],
                        role: decoded[
                            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                            ],
                    };
                    authState.setData(userData);
                    authState.setToken(response.data.jwtToken);
                    originalRequest.headers.Authorization = `Bearer ${response.data.jwtToken}`;
                    return axios_instance(originalRequest);
                } catch (err) {
                    console.log(err);
                }
            }
        } else {
            console.log(error);
        }
        return Promise.reject(error);
    }
);

export default axios_instance;