import React from "react"
import { useEffect, useState } from "react/cjs/react.development"
import Loader from "../../Loader/Loader"
import "./MovieBanner.scss"

const MovieBanner = ({ image, background, info }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const defaultBg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWcWg0E8pSjBNi0TtiZsqu8uD2PAr_K11DA&usqp=CAU"

  const styles = {
    poster: {
      background: `url(${
        image ? `https://image.tmdb.org/t/p/w780/${image}` : defaultBg
      }) no-repeat center center`,
    },
    banner: {
      background: `linear-gradient(to bottom, rgba(0,0,0, .65), rgba(0,0,0, 1)), url(${background}) no-repeat top 10% center`,
    },
  }

  useEffect(() => {
    if (image && background && info) {
        setIsLoaded(true)
    }
  }, [image, background, info])

  return (
    <>
      {isLoaded ? (
        <>
          <div className="banner" style={styles.banner}>
            <div className="banner__content">
              <div className="banner__img" style={styles.poster}></div>
              <div className="banner__info">
                <div className="movie__title">{info.title}</div>
                <div className="movie__descr">{info.descr}</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default MovieBanner
