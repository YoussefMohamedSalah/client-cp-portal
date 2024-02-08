import axios from "axios";

export const http = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 30000,
    headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
    },
});

// Change request data/error here
http.interceptors.request.use(
    (config) => {
        const token: string | null = localStorage.getItem("access_token");
        if (token) {
            // @ts-expect-error
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default http;
