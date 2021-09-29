import React from "react"
import { Link } from "react-router-dom"

const ActorItem = ({actor}) => {
  return (
    <div className="actor__item">
      <Link to={`/actor/${actor.id}`} className="actor__info">
        <div className="actor__item-img">
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w780/${actor.profile_path}`
                : "https://www.executiveflight.nl/wp-content/uploads/default-person.jpg"
            }
            alt=""
          />
        </div>
        <div className="actor__item-name">{actor.name}</div>
      </Link>
    </div>
  )
}

export default ActorItem
