/* eslint-disable no-fallthrough */
import React from "react"
import "./GenrePage.scss"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Loader from "../Loader/Loader"
import NotFoundPage from "../NotFoundPage/NotFoundPage"
import { fetchGenres } from "../../fetchingData"
import Content from "../Content/Content"
import CustomPagination from "../CustomPagination/CustomPagination"
import { fetchMoviesWithGenre } from "../../fetchingData"
import { useSelector } from "react-redux"
import GenresHeader from "../GenresHeader/GenresHeader"

import {
  setMoviesAction,
  setNumberOfPagesAction,
  setGenreTitleAction,
  setPageAction,
} from "../../store/reducers/moviesReducer"
import { useDispatch } from "react-redux"

export default function GenrePage() {
  const dispatch = useDispatch()

  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const { genreId, genrePage } = useParams()

  const { movies, numberOfPages, genreTitle, isActive } = useSelector(
    state => state.movies,
  )

  useEffect(() => {
    setIsLoaded(false)
    fetchGenres()
      .then(res => res.genres)
      .then(genres => {
        const titles = genres.filter(g => +genreId === g.id)
        const title = titles[0].name
        dispatch(setGenreTitleAction(title))
      })
      .catch(e => {
        setIsError(true)
      })
    fetchMoviesWithGenre(genreId, genrePage)
      .then(data => {
        dispatch(setPageAction(genrePage))
        dispatch(setNumberOfPagesAction(data.total_pages))
        dispatch(setMoviesAction(data.results))
        setIsLoaded(true)
      })
      .catch(e => {
        setIsError(true)
        setIsLoaded(true)
      })
  }, [genreId, genrePage, dispatch])

  useEffect(() => {
    document.body.style.overflowX = "hidden"
  }, [isActive])

  return (
    <>
      {isLoaded && !isError ? (
        <>
        <GenresHeader />
        <div className="genres">          
          <div className="container">
            <div className="section__title">
              <span>Genre:</span> {genreTitle}
            </div>
            <Content movies={movies} />
            <CustomPagination
              totalPages={numberOfPages}
              activePage={genrePage}
              type="genre"
              query={genreId}
            />
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
