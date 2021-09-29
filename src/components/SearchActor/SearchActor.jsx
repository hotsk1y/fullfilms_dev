/* eslint-disable no-fallthrough */
import React from "react"
import "./SearchActor.scss"
import { useParams, useHistory } from "react-router-dom"
import { useEffect, useState, useCallback } from "react/cjs/react.development"
import Loader from "../Loader/Loader"
import NotFoundPage from "../NotFoundPage/NotFoundPage"
import MovieItem from "../MovieItem/MovieItem"
import { fetchActors, fetchPopular } from "../../fetchingData"
import Content from "../Content/Content"
import CustomPagination from "../CustomPagination/CustomPagination"
import Actor from "../Actor/Actor"
import ActorItem from "../ActorItem/ActorItem"

export default function SearchActor() {
  const [isLoaded, setIsLoaded] = useState(true)
  const [isError, setIsError] = useState(false)

  const [page, setPage] = useState(1)
  const [actors, setActors] = useState([])
  const [numberOfPages, setNumberOfPages] = useState(10)

  const { actorQuery } = useParams()

  const history = useHistory()

  const handleBack = () => {
    history.goBack()
  }

  useEffect(() => {
    setIsLoaded(false)
    fetchActors(actorQuery, page).then(data => {
        setActors(data.results)
      setIsLoaded(true)
    })
  }, [page])

  return (
    <>
      {isLoaded && !isError ? (
        <div className="search-actor">
          <div className="actors">
              <div className="container">
                <div className="actors__title">Актеры</div>
                <div className="actors__wrapper">
                  {actors.map(a => {
                    return (                      
                      <ActorItem key={a.id} actor={a} />
                    )
                  })}
                </div>
              </div>
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
