/* eslint-disable no-fallthrough */
import React from "react"
import "./Actor.scss"
import { useParams, useHistory } from "react-router-dom"
import { useEffect, useState } from "react/cjs/react.development"
import Loader from "../Loader/Loader"
import NotFoundPage from "../NotFoundPage/NotFoundPage"
import MovieItem from "../MovieItem/MovieItem"

import { fetchActorFilms, fetchActorInfo } from "../../fetchingData"
import { useDispatch } from "react-redux"

import {
  setActorFilmsAction,
  setActorInfoAction,
} from "../../store/reducers/actorReducer"
import { useSelector } from "react-redux"

export default function Actor() {
  const dispatch = useDispatch()

  const { actorFilms, actorInfo } = useSelector(state => state.actor)

  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const [birth, setBirth] = useState([])

  const { actorId } = useParams()

  const history = useHistory()
  const handleBack = () => {
    history.goBack()
  }

  useEffect(() => {
    setIsLoaded(false)

    fetchActorFilms(actorId)
      .then(res => {
        dispatch(setActorFilmsAction(res))
      })
      .catch(e => {
        setIsError(true)
      })

    fetchActorInfo(actorId)
      .then(res => {
        dispatch(setActorInfoAction(res))
        const birthday = new Date(res.birthday).toLocaleString("en", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        setBirth(birthday)
        setIsLoaded(true)
      })
      .catch(e => {
        setIsError(true)
        setIsLoaded(true)
      })
  }, [actorId, dispatch])

  return (
    <>
      {isLoaded && !isError ? (
        <div className="actor">
          <div className="container">
            <div className="back" onClick={handleBack}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2223/2223615.png"
                alt="back"
              />{" "}
              Назад
            </div>
            <div className="actor__card">
              <div className="actor__img">
                <img
                  src={
                    actorInfo.profile_path
                      ? `https://image.tmdb.org/t/p/w780/${actorInfo.profile_path}`
                      : "https://www.executiveflight.nl/wp-content/uploads/default-person.jpg"
                  }
                  alt="actor"
                />
              </div>
              <div className="actor__info">
                <div className="actor__info-name">{actorInfo.name}</div>
                <div className="actor__info-birthday">{birth}</div>
                <div className="actor__info-place">
                  {actorInfo.place_of_birth}
                </div>
              </div>
            </div>
          </div>
          <div className="actor__movies-wrapper">
            {actorFilms.cast && (
              <div className="actor__movies">
                <div className="container">
                  {actorFilms.cast.map(movie => {
                    return (
                      <MovieItem
                        id={movie.id}
                        key={movie.id}
                        title={movie.title}
                        image={movie.poster_path}
                      />
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : isLoaded && isError ? (
        <NotFoundPage />
      ) : (
        <Loader />
      )}
    </>
  )
}
