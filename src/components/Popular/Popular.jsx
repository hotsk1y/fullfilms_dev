/* eslint-disable no-fallthrough */
import React from "react"
import "./Popular.scss"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Loader from "../Loader/Loader"
import NotFoundPage from "../NotFoundPage/NotFoundPage"
import { fetchPopular } from "../../fetchingData"
import Content from "../Content/Content"
import CustomPagination from "../CustomPagination/CustomPagination"
import { useDispatch, useSelector } from "react-redux"
import { setMoviesAction, setNumberOfPagesAction } from "../../store/reducers/moviesReducer"
import GenresHeader from "../GenresHeader/GenresHeader"

export default function Popular() {

  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const { popularPage } = useParams()
  
  
  const {movies, isActive} = useSelector(state => state.movies)

  useEffect(() => {
    setIsLoaded(false)
    fetchPopular(popularPage)
      .then(data => {
        console.log(data)
        dispatch(setMoviesAction(data.results))
        dispatch(setNumberOfPagesAction(data.total_pages))
        setIsLoaded(true)
      })
      .catch(e => {
        console.log("popular movies error")
        setIsError(true)
        setIsLoaded(true)
      })
  }, [popularPage])

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
            <div className="section__title">Popular</div>
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
