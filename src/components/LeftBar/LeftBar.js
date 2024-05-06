import "./leftBar.css"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// antdesign elements -------------------------------------------------------------------------------------------------------------------
import { Input, Space } from "antd"

import { getWeatherDataByLocation, getWeatherDefault } from "../../axios/axios.instanse";
const { Search } = Input
function LeftBar() {
    const QueryClient = useQueryClient()
    const weatherQuery = useQuery({ queryKey: ['weather'], queryFn: getWeatherDefault })
    const weatherMutation = useMutation({
        mutationFn: getWeatherDataByLocation,
        onSuccess: (data) => {
            // QueryClient.invalidateQueries({ queryKey: ["weather"] })
            QueryClient.setQueryData(['weather'], data)
        },
        onError: (err) => {
            console.log(err)
        }
    })
    const onSearch = (value) => {
        weatherMutation.mutate(value);
        console.log(value)
    };

    if (weatherQuery.isFetched) console.log(weatherQuery.data)

    return (
        <div className="left-bar-container">
            <Space direction="vertical">
                <Search
                    placeholder="Cairo"
                    onSearch={onSearch}
                    className="search-bar"
                />
            </Space>
            <div className="middle-container">
                <img src={weatherQuery.data?.current.condition.icon} />
                <h3> {weatherQuery.data?.current.condition.text}</h3>
                <h3> {weatherQuery.data?.current.temp_c + " C"}</h3>
                <div className="date-container">
                    <h4>{weatherQuery.data?.location.localtime.split(" ")[0]}</h4>
                    <h4>{weatherQuery.data?.location.localtime.split(' ')[1]}{weatherQuery.data?.location.localtime.split(' ')[1].split(":")[0] <= 12 ? " AM" : " PM"}</h4>
                </div>
            </div>
            <div className="foot-container">
                <h2>{weatherQuery.data?.location.name}, {weatherQuery.data?.location.country}</h2>
            </div>
        </div>
    )
}

export default LeftBar
