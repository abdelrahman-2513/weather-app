import { axiosInstance } from "./axios.instanse"

export const getCairoWeather = () => {
    axiosInstance.get("?q=cairo").then((res) => {
        return res.data;
    }).catch(err => {
        console.log(err);
    })
}