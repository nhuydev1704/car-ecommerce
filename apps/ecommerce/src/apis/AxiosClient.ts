import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const AxiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'content-type': 'application/json',
    },
});

// handle request to convert all api requests to snake_case
// @ts-ignore
AxiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
    const newConfig = { ...config };

    if (newConfig.headers && newConfig.headers['Content-Type'] === 'multipart/form-data') return newConfig;

    return newConfig;
});

// handle response to convert all api responses to camelCase
AxiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response && response.data) {
            if (!response.data.status || response.data.code === 400 || response.data.code === 403) {
                switch (response.data.code) {
                    case 400:
                        // handle error
                        break;
                    case 403:
                        // handle error
                        break;
                    default:
                        // Notification('error', response?.data?.message);
                        break;
                }
            }
            // cover response to camelCase
            return response.data;
        }

        return response;
    },
    (error) => {
        // Handle errors
        return error;
    }
);

export default AxiosClient;
