/* eslint-disable no-fallthrough */
import React from "react"
import "./GenrePage.scss"
import { useParams, useHistory } from "react-router-dom"
import { useEffect, useState } from "react/cjs/react.development"
import Loader from "../Loader/Loader"
import NotFoundPage from "../NotFoundPage/NotFoundPage"
import { fetchGenres } from "../../fetchingData"
import Content from "../Content/Content"
import CustomPagination from "../CustomPagination/CustomPagination"
import { fetchMoviesWithGenre } from "../../fetchingData"
import Sorting from "../Sorting/Sorting"

export default function GenrePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const { genreId, genrePage } = useParams()

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(genrePage)
  const [numberOfPages, setNumberOfPages] = useState(10)
  const [genreTitle, setGenreTitle] = useState(10)

  const history = useHistory()
  const handleBack = () => {
    history.goBack()
  }

  useEffect(() => {
    setIsLoaded(false)
    fetchGenres()
        .then(res => res.genres)
        .then(genres => {
            const titles = genres.filter(g => +genreId === g.id)
            const title = titles[0].name
            setGenreTitle(title)
        })
        .catch(e => {
            setIsError(true)
        })
    fetchMoviesWithGenre(genreId, page)
      .then(data => {
        setPage(genrePage)
        setNumberOfPages(data.total_pages)
        setMovies(data.results)
        setIsLoaded(true)
      })
      .catch(e => {
        setIsError(true)
        setIsLoaded(true)
      })
  }, [page, genreId, genrePage])

  return (
    <>
      {isLoaded && !isError ? (
        <div className="genres">
          <Sorting setPage={setPage} />
          <div className="container">
            <div className="section__title"><span>Жанр:</span> {genreTitle}</div>
            <Content movies={movies} />
            <CustomPagination
              totalPages={numberOfPages}
              setPage={setPage}
              activePage={page}
              type='genre'
              query={genreId}
            />
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
