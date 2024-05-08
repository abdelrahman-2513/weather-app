import "./Card.css"
function Card({ title, value }) {
    return (
        <div className="card">
            <h2>{title}</h2>
            <h3>{value}</h3>
        </div>
    )
}

export default Card
