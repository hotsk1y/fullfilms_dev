import React from "react"
import "./Movie.scss"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react/cjs/react.development"
import { fetchMovieInfo, fetchMovieCredits } from "../../fetchingData"
import Loader from "../Loader/Loader"
import MovieBanner from "./MovieBanner/MovieBanner"

export default function Movie() {
  const [isLoaded, setIsLoaded] = useState(false)

  let { movieId } = useParams()
  console.log(movieId)

  const [info, setInfo] = useState({})
  const [image, setImage] = useState(null)
  const [background, setBackground] = useState(null)  

  useEffect(() => {
    setIsLoaded(false)
    fetchMovieInfo(movieId)
      .then(res => {
        setInfo(res)
        setImage(res.image)
        setBackground(`https://image.tmdb.org/t/p/w1280/${res.background}`)
      })
      .then(setIsLoaded(true))
      .catch(e => {
        // console.log(e)
        // setIsLoaded(true)
      })
    fetchMovieCredits(movieId)
  }, [movieId])

  useEffect(() => {
    // console.log(info)
  }, [info])

  return (
    <>
      {isLoaded ? (
        <>
          <div className="movie">
            <MovieBanner image={image} background={background} info={info} />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}
