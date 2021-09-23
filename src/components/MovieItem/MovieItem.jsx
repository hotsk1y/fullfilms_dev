import React, { useCallback, useRef } from "react"
import { useEffect } from "react/cjs/react.development"
import "./MovieItem.scss"
import { Link } from "react-router-dom"

export default function MovieItem({ id, title, image }) {
  // console.log(`https://image.tmdb.org/t/p/w780/${image}`)

  let bgImage = useRef(
    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWcWg0E8pSjBNi0TtiZsqu8uD2PAr_K11DA&usqp=CAU`,
  )

  const imageUrl = useCallback(() => {
    if (image) {
      bgImage.current = `https://image.tmdb.org/t/p/w780/${image}`
    }
    return
  }, [image])

  const handleClick = () => {
    console.log(bgImage.current)
    console.log(title)
  }

  const styles = {
    background: `url(${bgImage.current}) no-repeat center center`,
  }

  useEffect(() => {
    imageUrl()
  }, [imageUrl, image])

  return (
    <div className="movie__item-wrapper">
      <Link to={`/${id}`} onClick={handleClick}>
        <div className="movie__item">
          <div className="movie__item-img" style={styles}></div>
          <div className="movie__item-title">{title}</div>
        </div>
      </Link>
    </div>
  )
}
