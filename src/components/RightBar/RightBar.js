import { useQuery } from "@tanstack/react-query"
import Card from "../Card/Card"
import NightSkyBackground from "../NightSky/NightSky"
import "./rightBar.css"
import LoadingComponent from "../Loading/Loading";
import DaySky from "../DaySky/DaySky";

function RightBar() {
    const weatherQuery = useQuery({ queryKey: ['weather'] });
    const { isFetching, data } = weatherQuery;
    console.log(data)
    if (isFetching) return <div className="right-bar-container"><LoadingComponent /> </div>
    return (
        <div className={data?.current.is_day ? "right-bar-container day" : "right-bar-container night"}>

            {data?.current.is_day ? <DaySky /> : <NightSkyBackground />}
            <div className="cards-container">
                <Card title={"Humidity"} value={25} />
                <Card title={"Humidity"} value={25} />
                <Card title={"Humidity"} value={25} />
                <Card title={"Humidity"} value={25} />
                <Card title={"Humidity"} value={25} />
                <Card title={"Humidity"} value={25} />
            </div>
        </div>
    )
}

export default RightBar
