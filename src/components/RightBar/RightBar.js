import "./rightBar.css"
import { useMutationState, useQuery, useQueryClient } from "@tanstack/react-query"


// Components -----------------------------------------------------------------------
import Card from "../Card/Card"
import NightSkyBackground from "../NightSky/NightSky"
import DaySky from "../DaySky/DaySky";


function RightBar() {
    const queryClient = useQueryClient();
    const weatherMutation = useMutationState({ filters: { mutationKey: ['weatherMutation'] }, select: (mutation) => mutation.state.status, }, queryClient).slice().pop();
    const weatherQuery = useQuery({ queryKey: ['weather'] });
    const { isFetching, data } = weatherQuery;
    const isPending = weatherMutation && weatherMutation === "pending" ? true : false;
    return (
        <div className={data?.current.is_day ? "right-bar-container day" : "right-bar-container night"}>

            {data?.current.is_day ? <DaySky /> : <NightSkyBackground />}
            <div className="cards-container">
                <Card title={"Humidity"} value={data?.current?.humidity + "%"} img={"humidity"} loading={isFetching || isPending} />
                <Card title={"Pressure"} value={data?.current?.pressure_in.toFixed(2) + " inHg"} img={"fresh-air"} loading={isFetching || isPending} />
                <Card title={"Wind Degree"} value={data?.current?.wind_degree + "\u00b0"} img={"thermometer"} loading={isFetching || isPending} />
                <Card title={"Wind Speed"} value={data?.current?.wind_kph + " kph"} img={"windy"} loading={isFetching || isPending} />
                <Card title={"Gust"} value={data?.current?.gust_kph + " kph"} img={"gust"} loading={isFetching || isPending} />
                <Card title={"Wind Direction"} value={data?.current?.wind_dir} img={"cardinal-points"} loading={isFetching || isPending} />

            </div>
        </div>
    )
}

export default RightBar
