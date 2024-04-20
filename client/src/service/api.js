import axios from "axios";
import { API_NOTIFICATION, SERVICE_URL } from "../constants/config.js";

const API_URL = "http://localhost:3007";

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    function (error) {
        return Promise.reject(processError(error));
    }
);

const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
    } else {
        return { isSuccess: false, status: response?.status, code: response?.code,msg:response?.msg, };
    }
};

const processError = (error) => {
    if (error.response) {
        console.log("error in response:", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION.responseFailure,
        };
    } else if (error.request) {
        console.log("error in request:", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION.requestFailure,
        };
    } else {
        console.log("error in network:", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION.networkError,
        };
    }
};

const API = {};
for (const [key, value] of Object.entries(SERVICE_URL)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) => axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            },
        })
    
    }


export { API };
