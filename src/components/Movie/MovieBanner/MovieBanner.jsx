/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import { useState, useCallback, useEffect } from "react"
import "./MovieBanner.scss"
import axios from "axios"
import BackButton from "../../BackButton/BackButton"

const MovieBanner = ({ image, background, info }) => {
  const [activeTrailer, setActiveTrailer] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [movieVideoLinkEn, setMovieVideoLinkEn] = useState(null)
  const [movieTrailer, setMovieTrailer] = useState(null)

  const defaultPoster =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWcWg0E8pSjBNi0TtiZsqu8uD2PAr_K11DA&usqp=CAU"

  const defaultBg =
    "https://www.pngmagic.com/product_images/best-purple-banner-background.jpg"

  const styles = {
    poster: {
      background: `url(${
        image ? `https://image.tmdb.org/t/p/w780/${image}` : defaultPoster
      }) no-repeat center center`,
    },
    banner: {
      background: `linear-gradient(to bottom, rgba(0,0,0, .65), rgba(0,0,0, 1)), url(${
        background
          ? `https://image.tmdb.org/t/p/w1280/${background}`
          : `${defaultBg}`
      })`,
    },
  }

  const getTrailer = useCallback(() => {
    setIsLoaded(false)
    if (movieVideoLinkEn) {
          axios
            .get(movieVideoLinkEn)
            .then(res => {
              setMovieTrailer(res.data.results[0].key)
            })
            .catch(e => {
              console.log("There is no trailer for this movie")
              setActiveTrailer(false)
            })
    }
    setIsLoaded(true)
  }, [movieVideoLinkEn])

  useEffect(() => {
    setMovieVideoLinkEn(
      `https://api.themoviedb.org/3/movie/${info.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`,
    )
    getTrailer()
  }, [getTrailer])

  return (
    <>
      {isLoaded && <div className="banner" style={styles.banner}>
        <div className="banner__content">
          <BackButton />
          <div className="banner__img-wrapper">            
          <div className="banner__img" style={styles.poster}></div>
              {activeTrailer && (
                <a
                  className="trailer__btn"
                  href={`https://www.youtube.com/watch?v=${movieTrailer}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="https://cdn-icons-png.flaticon.com/512/13/13021.png" alt="play" />
                  Watch the trailer
                </a>
              )}         
          </div>
          <div className="banner__info">
            <div className="movie__title">{info.title}</div>
            <div className="movie__descr">{info.descr}</div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default MovieBanner
