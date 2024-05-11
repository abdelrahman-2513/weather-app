import "./leftBar.css"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// antdesign elements -------------------------------------------------------------------------------------------------------------------
import { Input, Space } from "antd"

// Api ----------------------------------------------------------------------------------------------------------------------------------
import { getWeatherDataByLocation, getWeatherDefault } from "../../axios/axios.instanse";
// Components ---------------------------------------------------------------------------------------------------------------------------
import LoadingComponent from "../Loading/Loading";
const { Search } = Input;


function LeftBar() {
    const QueryClient = useQueryClient()
    const weatherQuery = useQuery({ queryKey: ['weather'], queryFn: getWeatherDefault })
    const { isFetching, isError } = weatherQuery;
    const weatherMutation = useMutation({
        mutationKey: ['weatherMutation'],
        mutationFn: getWeatherDataByLocation,

        onSuccess: (res) => {

            QueryClient.setQueryData(['weather'], res.data)
        },
        onError: (err, variables, context) => {
            QueryClient.setQueryData(['weather'], (oldData) => {
                return oldData
            })

        }
    })
    const onSearch = (value) => {
        if (value)
            weatherMutation.mutate(value);
    };
    if (isFetching || weatherMutation.isPending) return <div className="left-bar-container">
        <LoadingComponent />
    </div>

    return (
        <div className="left-bar-container">
            <Space direction="vertical">
                <Search
                    placeholder="Cairo"
                    onSearch={onSearch}
                    className="search-bar"
                    required={true}
                />
            </Space>
            <div className="middle-container">
                <img src={weatherQuery.data?.current.condition.icon} alt="temprature icon" />
                <h3> {weatherQuery.data?.current.condition.text}</h3>
                <h3> {weatherQuery.data?.current.temp_c}&deg;C</h3>
                <div className="date-container">
                    <h4>{weatherQuery.data?.location.localtime.split(" ")[0]}</h4>
                    <h4>
                        {
                            weatherQuery.data?.location.localtime.split(' ')[1].split(":")[0] === "0" ?
                                `12:${weatherQuery.data?.location.localtime.split(' ')[1].split(":")[1]} AM`
                                :
                                weatherQuery.data?.location.localtime.split(' ')[1].split(":")[0] <= 12 ?
                                    `${weatherQuery.data?.location.localtime.split(' ')[1]} AM`
                                    :
                                    `${parseInt(weatherQuery.data?.location.localtime.split(' ')[1].split(":")[0], 10) - 12}:${weatherQuery.data?.location.localtime.split(' ')[1].split(":")[1]} PM`
                        }
                    </h4>
                </div>
            </div>
            <div className="foot-container">
                <h2>{weatherQuery.data?.location.name}, {weatherQuery.data?.location.country}</h2>
            </div>
        </div>
    )
}

export default LeftBar
