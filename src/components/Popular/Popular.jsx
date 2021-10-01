/* eslint-disable no-fallthrough */
import React from "react"
import "./Popular.scss"
import { useParams, useHistory } from "react-router-dom"
import { useEffect, useState } from "react/cjs/react.development"
import Loader from "../Loader/Loader"
import NotFoundPage from "../NotFoundPage/NotFoundPage"
import { fetchPopular } from "../../fetchingData"
import Content from "../Content/Content"
import CustomPagination from "../CustomPagination/CustomPagination"
import Sorting from "../Sorting/Sorting"

export default function Popular() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const { popularPage } = useParams()

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(popularPage)
  const [numberOfPages, setNumberOfPages] = useState(10)  

  const history = useHistory()
  const handleBack = () => {
    history.goBack()
  }

  useEffect(() => {
    setIsLoaded(false)
    fetchPopular(page)
      .then(data => {
        console.log(data)
        setMovies(data.results)
        setNumberOfPages(data.total_pages)
        setIsLoaded(true)
      })
      .catch(e => {
        console.log("popular movies error")
        setIsError(true)
        setIsLoaded(true)
      })
  }, [page])

  console.log(movies)

  return (
    <>
      {isLoaded && !isError ? (
        <div className="popular">
          <Sorting />
          <div className="popular__wrapper">
          <div className="container">
            <div className="section__title">Популярные</div>
            <Content movies={movies} />
            <CustomPagination
              totalPages={numberOfPages}
              setPage={setPage}
              activePage={popularPage}
              type='popular'
            />
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
