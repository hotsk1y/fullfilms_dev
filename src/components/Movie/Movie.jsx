/* eslint-disable no-fallthrough */
import React from "react"
import "./Movie.scss"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react/cjs/react.development"
import { fetchMovieInfo, fetchMovieCredits } from "../../fetchingData"
import Loader from "../Loader/Loader"
import MovieBanner from "./MovieBanner/MovieBanner"
import NotFoundPage from "../NotFoundPage/NotFoundPage"
import ActorItem from "../ActorItem/ActorItem"

export default function Movie() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const { movieId } = useParams()

  const [info, setInfo] = useState({})
  const [image, setImage] = useState(null)
  const [background, setBackground] = useState(null)

  const [actors, setActors] = useState([])
  const [year, setYear] = useState(null)
  const [premiere, setPremiere] = useState(null)

  const [screenplay, setScreenplay] = useState("?")
  const [director, setDirector] = useState("?")
  const [producer, setProducer] = useState("?")
  const [camera, setCamera] = useState("?")
  const [sound, setSound] = useState("?")
  const [art, setArt] = useState("?")
  const [editor, setEditor] = useState("?")

  const getMovieCredits = data => {
    data.map(i => {
      if (i.job === "Director") {
        setDirector(i.name)
      }
      if (i.job === "Screenplay" || i.job === "Writer") {
        setScreenplay(i.name)
      }
      if (
        i.job === "Executive Producer" ||
        i.job === "Line Producer" ||
        i.job === "Producer"
      ) {
        setProducer(i.name)
      }
      if (i.job === "Director of Photography" || i.job === "Cinematography") {
        setCamera(i.name)
      }
      if (i.job === "Original Music Composer" || i.job === "Music") {
        setSound(i.name)
      }
      if (
        i.job === "Supervising Art Director" ||
        i.job === "Art Direction" ||
        i.known_for_department === "Art"
      ) {
        setArt(i.name)
      }
      if (i.job === "Editor") {
        setEditor(i.name)
      }
      return null
    })
  }

  useEffect(() => {
    setIsLoaded(false)
    fetchMovieInfo(movieId)
      .then(res => {
        setInfo(res)
        const realiseDate = new Date(res.year)
        const getYear = realiseDate.getFullYear()
        const premiereDate = realiseDate.toLocaleString("ru", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        setYear(getYear)
        setPremiere(premiereDate)
        setImage(res.image)
        setBackground(res.background)
        setIsLoaded(true)
      })
      .catch(e => {
        console.log("not found")
        setIsError(true)
        setIsLoaded(true)
      })

    fetchMovieCredits(movieId)
      .then(res => {
        setActors(res.cast)
        getMovieCredits(res.crew)
      })
      .catch(e => {
        console.log("credits error")
        setIsError(true)
        setIsLoaded(true)
      })
  }, [movieId])

  return (
    <>
      {isLoaded && !isError ? (
        <>
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
                  <div className="about__title">О фильме</div>
                  <div className="credit__year credit__item">
                    <span>Год:</span> {year}
                  </div>
                  <div className="credit__country credit__item">
                    <span>Страна:</span>
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
                      <>?</>
                    )}
                  </div>
                  <div className="credit__genre credit__item">
                    <span>Жанр: </span>
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
                    <span>Слоган:</span>{" "}
                    {info.slogan ? <>{info.slogan}</> : "—"}
                  </div>
                  <div className="credit__director credit__item">
                    <span>Режиссер:</span> {director}
                  </div>
                  <div className="credit__screenplay credit__item">
                    <span>Сценарий:</span> {screenplay}
                  </div>
                  <div className="credit__producer credit__item">
                    <span>Продюсер:</span> {producer}
                  </div>
                  <div className="credit__camera credit__item">
                    <span>Оператор:</span> {camera}
                  </div>
                  <div className="credit__sound credit__item">
                    <span>Композитор:</span> {sound}
                  </div>
                  <div className="credit__art credit__item">
                    <span>Художник:</span> {art}
                  </div>
                  <div className="credit__editor credit__item">
                    <span>Монтаж:</span> {editor}
                  </div>
                  <div className="credit__premiere credit__item">
                    <span>Премьера в мире:</span> {premiere}
                  </div>
                  <div className="credit__time credit__item">
                    <span>Время:</span> {Math.trunc(info.runtime / 60)}ч.{" "}
                    {info.runtime % 60}мин.
                  </div>
                </div>
              )}
            </div>
            <div className="actors">
              <div className="container">
                <div className="actors__title">Актеры</div>
                <div className="actors__wrapper">
                  {actors.map(a => {
                    return <ActorItem key={a.id} actor={a} />
                  })}
                </div>
              </div>
            </div>
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
