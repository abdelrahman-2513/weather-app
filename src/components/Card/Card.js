import "./Card.css"
import { Card as AntCard, Avatar } from "antd"
const { Meta } = AntCard;
function Card({ title, value, img, loading }) {
    return (

        <AntCard
            style={{
                width: 300,
                marginTop: 16,
                background: '#6c63ff',
                height: 150
            }}
            loading={loading}
            hoverable={true}
        >
            <Meta
                avatar={<Avatar src={`/imgs/${img}.png`} />}
                title={title}
                description={value} />
        </AntCard>


    )
}

export default Card
