import React from "react"
import "./MovieItem.scss"
import { Link } from "react-router-dom"

export default function MovieItem({ id, title, image }) {

  const defaultBg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWcWg0E8pSjBNi0TtiZsqu8uD2PAr_K11DA&usqp=CAU"

  const styles = {
    background: `url(${
      image ? `https://image.tmdb.org/t/p/w780/${image}` : defaultBg
    }) no-repeat center center`,
  }

  return (
    <div className="movie__item-wrapper">
        <Link to={`/info/${id}`} className="movie__item" >
          <div className="movie__item-img" style={styles}></div>
          <div className="movie__item-title">{title}</div>
        </Link>
    </div>
  )
}
