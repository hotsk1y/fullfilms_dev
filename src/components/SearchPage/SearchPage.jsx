/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react"
import "./SearchPage.scss"
import { useParams } from "react-router"
import { useEffect } from "react/cjs/react.development"
import axios from "axios"
import Content from "../Content/Content"
import Loader from "../Loader/Loader"
import CustomPagination from "../CustomPagination/CustomPagination"
import NotFoundPage from "../NotFoundPage/NotFoundPage"
import { useSelector } from "react-redux"
import SearchInput from "../SearchInput/SearchInput"
import GenresHeader from "../GenresHeader/GenresHeader"
import { useDispatch } from "react-redux"
import { setNumberOfPagesAction } from "../../store/reducers/moviesReducer"

export default function Search() {
  const dispatch = useDispatch()
  const { query, searchingPage } = useParams()
  const [searchResults, setSearchResults] = useState([])

  const [isLoaded, setIsLoaded] = useState(false)
  const { page, numberOfPages } = useSelector(state => state.movies)

  const fetchSearch = async userQuery => {
    setIsLoaded(false)
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=ru&query=${userQuery.trimStart()}&page=${searchingPage}`,
      )
      return response.data
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoaded(true)
    }
  }

  useEffect(() => {
    fetchSearch(query).then(data => {
      console.log(data)
      setSearchResults(data.results)
      dispatch(setNumberOfPagesAction(data.total_pages))
    })
    console.log(searchResults)
  }, [query, page, searchingPage])

  return (
    <>
      {isLoaded && searchResults.length ? (
        <div className="searchPage">
          <GenresHeader />
          <div className="search__wrapper">
            <div className="section__title">Поиск фильма</div>
            <SearchInput />
          </div>
          <div className="container">
            <div className="section__title">Результат поиска: </div>
            <Content movies={searchResults} isSearch />
            <CustomPagination
              totalPages={numberOfPages}
              activePage={searchingPage}
              query={query}
              type={`search`}
            />
          </div>
        </div>
      ) : (
        <>{isLoaded && !searchResults.length ? <NotFoundPage /> : <Loader />}</>
      )}
    </>
  )
}
