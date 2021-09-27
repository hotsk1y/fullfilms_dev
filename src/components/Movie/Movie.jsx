import React from "react"
import "./Movie.scss"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react/cjs/react.development"
import { fetchMovieInfo, fetchMovieCredits } from "../../fetchingData"
import Loader from "../Loader/Loader"
import MovieBanner from "./MovieBanner/MovieBanner"
import NotFoundPage from "../NotFoundPage/NotFoundPage"

export default function Movie() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  let { movieId } = useParams()

  const [info, setInfo] = useState({})
  const [image, setImage] = useState(null)
  const [background, setBackground] = useState(null)

  const [creditsInfo, setCreditsInfo] = useState([])
  const [actors, setActors] = useState([])

  useEffect(() => {
    setIsLoaded(false)
    fetchMovieInfo(movieId)
      .then(res => {
        setInfo(res)
        setImage(res.image)
        setBackground(res.background)
        setIsLoaded(true)
      })
      .catch(e => {
        console.log('not found')
        setIsError(true)
        setIsLoaded(true)
      })
    fetchMovieCredits(movieId)
      .then(res => setCreditsInfo(res))
      .catch( e => {
        console.log('credits error')
        setIsError(true)
        setIsLoaded(true)
      })
  }, [movieId])

  console.log(creditsInfo);

  return (
    <>
      {isLoaded && !isError ? (
        <>
          <div className="movie">
            <MovieBanner image={image} background={background} info={info} isError={isError} isLoaded={isLoaded} />
            <div className="movie_credits">
              <div className="actors">
                {creditsInfo.length !== 0 && creditsInfo.cast.map(actor => {
                  return <div>{actor.name}</div>
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        isLoaded && isError ? <NotFoundPage /> : <Loader /> 
      )}
    </>
  )
}
