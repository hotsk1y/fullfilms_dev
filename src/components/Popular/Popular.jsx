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
import { useDispatch, useSelector } from "react-redux"
import { setMoviesAction, setIsActiveAction } from "../../store/reducers/moviesReducer"
import BackButton from "../BackButton/BackButton"
import GenresHeader from "../GenresHeader/GenresHeader"

export default function Popular() {

  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const { popularPage } = useParams()
  
  
  const {movies, isActive} = useSelector(state => state.movies)
  const [page, setPage] = useState(popularPage)
  const [numberOfPages, setNumberOfPages] = useState(10)  

  const history = useHistory()
  const handleBack = () => {
    history.goBack()
  }

  const handleOpen = () => {
    dispatch(setIsActiveAction(true))
    document.body.style.overflow = "hidden"
  }
  const handleClose = () => {
    dispatch(setIsActiveAction(false))
    document.body.style.overflow = "auto"
  }

  useEffect(() => {
    setIsLoaded(false)
    fetchPopular(page)
      .then(data => {
        console.log(data)
        dispatch(setMoviesAction(data.results))
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

  useEffect(() => {
    document.body.style.overflowX = "hidden"
  }, [isActive])

  return (
    <>
      {isLoaded && !isError ? (
        <>
        <GenresHeader />
        <div className="popular">
          <div className="popular__wrapper">
          <div className="container">
            <div className="section__title">Популярные</div>
            <Content movies={movies} />
            <CustomPagination
              activePage={popularPage}
              type='popular'
            />
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
