/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-fallthrough */
import React from "react"
import "./Movie.scss"
import { useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react/cjs/react.development"
import { fetchMovieInfo, fetchMovieCredits } from "../../fetchingData"
import Loader from "../Loader/Loader"
import MovieBanner from "./MovieBanner/MovieBanner"
import NotFoundPage from "../NotFoundPage/NotFoundPage"
import ActorItem from "../ActorItem/ActorItem"
import { useDispatch, useSelector } from "react-redux"

import {
  setActorsAction,
  setArtAction,
  setBackgroundAction,
  setCameraAction,
  setDirectorAction,
  setEditorAction,
  setImageAction,
  setInfoAction,
  setPremiereAction,
  setProducerAction,
  setScreenplayAction,
  setSoundAction,
  setYearAction,
} from "../../store/reducers/moviePageReducer"
import Navbar from "../Navbar/Navbar"

export default function Movie() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const { movieId } = useParams()

  const {
    info,
    image,
    background,
    actors,
    year,
    premiere,
    screenplay,
    director,
    producer,
    camera,
    sound,
    art,
    editor,
  } = useSelector(state => state.moviePage)

  const dataResults = {
    directorJob: [],
    screenplayJob: [],
    producerJob: [],
    cameraJob: [],
    soundJob: [],
    artJob: [],
    editorJob: [],
  }
  const getMovieCredits = useCallback(
    data => {
      data.map(i => {
        if (i.job === "Director") {
          dataResults.directorJob.push(i.name)
          // dispatch(setDirectorAction(i.name))
        }
        if (i.job === "Screenplay" || i.job === "Writer") {
          dataResults.screenplayJob.push(i.name)
          // dispatch(setScreenplayAction(i.name))
        }
        if (i.job === "Producer") {
          dataResults.producerJob.push(i.name)
          // dispatch(setProducerAction(i.name))
        }
        if (i.job === "Director of Photography" || i.job === "Cinematography") {
          dataResults.cameraJob.push(i.name)
          // dispatch(setCameraAction(i.name))
        }
        if (i.job === "Original Music Composer" || i.job === "Music") {
          dataResults.soundJob.push(i.name)
          // dispatch(setSoundAction(i.name))
        }
        if (i.job === "Art Direction") {
          dataResults.artJob.push(i.name)
          // dispatch(setArtAction(i.name))
        }
        if (i.job === "Editor") {
          dataResults.editorJob.push(i.name)
          // dispatch(setEditorAction(i.name))
        }
        return null
      })
    },
    [dispatch],
  )

  useEffect(() => {
    setIsLoaded(false)
    fetchMovieInfo(movieId)
      .then(res => {
        dispatch(setInfoAction(res))
        const realiseDate = new Date(res.year)
        const getYear = realiseDate.getFullYear()
        const premiereDate = realiseDate.toLocaleString("en", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        dispatch(setYearAction(getYear))
        dispatch(setPremiereAction(premiereDate))
        dispatch(setImageAction(res.image))
        dispatch(setBackgroundAction(res.background))
        setIsLoaded(true)
      })
      .catch(e => {
        console.log("not found")
        setIsError(true)
        setIsLoaded(true)
      })

    fetchMovieCredits(movieId)
      .then(res => {
        dispatch(setActorsAction(res.cast))
        getMovieCredits(res.crew)
        console.log(dataResults)
        dispatch(setDirectorAction(dataResults.directorJob))
        dispatch(setScreenplayAction(dataResults.screenplayJob))
        dispatch(setProducerAction(dataResults.producerJob))
        dispatch(setCameraAction(dataResults.cameraJob))
        dispatch(setSoundAction(dataResults.soundJob))
        dispatch(setArtAction(dataResults.artJob))
        dispatch(setEditorAction(dataResults.editorJob))
      })
      .catch(e => {
        console.log("credits error")
        setIsError(true)
        setIsLoaded(true)
      })
  }, [movieId, dispatch, getMovieCredits])

  return (
    <>
      {isLoaded && !isError ? (
        <>
          <Navbar />
          <div className="movie">
            <MovieBanner
              image={image}
              background={background}
              info={info}
              isError={isError}
              isLoaded={isLoaded}
            />
            <div className="container">
              {Object.keys(info).length > 0 && actors.length > 2 && (
                <div className="movie_credits">
                  <div className="about__title">About the film</div>
                  <div className="credit__year credit__item">
                    <span>Year:</span> {year}
                  </div>
                  <div className="credit__country credit__item">
                    <span>Country:</span>
                    {info.country.length > 0 ? (
                      info.country.map(c => {
                        return (
                          <span key={c.name} className="many">
                            {" "}
                            {c.name}
                          </span>
                        )
                      })
                    ) : (
                      <> ?</>
                    )}
                  </div>
                  <div className="credit__genre credit__item">
                    <span>Genre: </span>
                    {info.genre.map(g => {
                      return (
                        <span key={g.name} className="many">
                          {" "}
                          {g.name}
                        </span>
                      )
                    })}
                  </div>
                  <div className="credit__slogan credit__item">
                    <span>Slogan:</span>{" "}
                    {info.slogan ? <>{info.slogan}</> : "—"}
                  </div>
                  <div className="credit__director credit__item">
                    <span>Director:</span>{" "}
                    {director.length > 0 ? director : "?"}
                  </div>
                  <div className="credit__screenplay credit__item">
                    <span>Screenplay:</span>{" "}
                    {screenplay.length > 0
                      ? screenplay.map(i => <span className="many">{i}</span>)
                      : "?"}
                  </div>
                  <div className="credit__producer credit__item">
                    <span>Producer:</span>{" "}
                    {producer.length > 0
                      ? producer.map(i => <span className="many">{i}</span>)
                      : "?"}
                  </div>
                  <div className="credit__camera credit__item">
                    <span>Operator:</span>{" "}
                    {camera.length > 0
                      ? camera.map(i => <span className="many">{i}</span>)
                      : "?"}
                  </div>
                  <div className="credit__sound credit__item">
                    <span>Composer:</span>{" "}
                    {sound.length > 0
                      ? sound.map(i => <span className="many">{i}</span>)
                      : "?"}
                  </div>
                  <div className="credit__art credit__item">
                    <span>Artist:</span>{" "}
                    {art.length > 0
                      ? art.map(i => <span className="many">{i}</span>)
                      : "?"}
                  </div>
                  <div className="credit__editor credit__item">
                    <span>Editing:</span>{" "}
                    {editor.length > 0
                      ? editor.map(i => <span className="many">{i}</span>)
                      : "?"}
                  </div>
                  <div className="credit__premiere credit__item">
                    <span>World premiere:</span> {premiere ? premiere : "?"}
                  </div>
                  <div className="credit__time credit__item">
                    <span>Duration:</span> {Math.trunc(info.runtime / 60)}h.{" "}
                    {info.runtime % 60}m.
                  </div>
                </div>
              )}
            </div>
            {actors.length > 0 && (
              <div className="actors">
                <div className="container">
                  <div className="actors__title">Actors</div>
                  <div className="actors__wrapper">
                    {actors.map(a => {
                      return <ActorItem key={a.id} actor={a} />
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : isLoaded && isError ? (
        <NotFoundPage />
      ) : (
        <Loader />
      )}
    </>
  )
}
