import axios from "axios";

const URL = "https://api.weatherapi.com/v1/current.json";
const API_KEY = "bb02204f61204aee9e943108231507";

export const axiosInstance = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000 // Increase timeout for longer requests if needed
});

axiosInstance.interceptors.request.use(
    (config) => {
        config.params = {
            ...config.params,
            key: API_KEY,
            aqi: "no"
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getWeatherDefault = () => {
    return axiosInstance.get("", { params: { q: "cairo" } }).then(res => res.data).catch(err => err)
};
export const getWeatherDataByLocation = (loc) => {
    return axiosInstance.get("", { params: { q: loc } }).then(res => res.data).catch(err => err)
};