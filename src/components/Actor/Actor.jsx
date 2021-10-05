/* eslint-disable no-fallthrough */
import React from "react"
import "./Actor.scss"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react/cjs/react.development"
import Loader from "../Loader/Loader"
import NotFoundPage from "../NotFoundPage/NotFoundPage"
import MovieItem from "../MovieItem/MovieItem"
import GenresHeader from "../GenresHeader/GenresHeader"

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

  const [birth, setBirth] = useState(null)
  const [death, setDeath] = useState(null)
  const [age, setAge] = useState(null)

  const { actorId } = useParams()

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
        console.log(res)
        dispatch(setActorInfoAction(res))


        if (res.birthday) {
          const birthday = new Date(res.birthday).toLocaleString("en", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          setBirth(birthday)
          const getAge = () => {
            const bd = new Date(res.birthday)
            const now = new Date()
            console.log(bd, now)

            if (bd.getMonth() > now.getMonth()) {
              const result = now.getFullYear() - bd.getFullYear()
              setAge(result - 1)
            } else {
              const result = now.getFullYear() - bd.getFullYear()
              setAge(result)
            }
          }
          getAge()
        }
        if (res.deathday) {
          const deathday = new Date(res.deathday).toLocaleString("en", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          setDeath(deathday)
          const getAge = () => {
            const bd = new Date(res.birthday)
            const dd = new Date(res.deathday)

            if (bd.getMonth() > dd.getMonth()) {
              const result = dd.getFullYear() - bd.getFullYear()
              setAge(result - 1)
            } else {
              const result = dd.getFullYear() - bd.getFullYear()
              setAge(result)
            }
          }
          getAge()
        }


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
          <GenresHeader />
          <div className="container">
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
                {birth && <div className="actor__info-birthday">Birth: {birth}</div>}
                {death && <div className="actor__info-death">Death: {death}</div>}
                {age && <div className="actor__info-age">Age: {age}</div>}

                {actorInfo.place_of_birth && (
                  <div className="actor__info-place">
                    {actorInfo.place_of_birth}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="actor__movies-wrapper">
            {actorFilms.cast && (
              <div className="actor__movies">
                <div className="section__title">Starred in</div>
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
