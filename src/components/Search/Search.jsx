/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react"
import "./Search.scss"
import { useParams } from "react-router"
import { useEffect } from "react/cjs/react.development"
import axios from "axios"
import Content from "../Content/Content"
import Loader from "../Loader/Loader"
import CustomPagination from "../CustomPagination/CustomPagination"
import NotFoundPage from "../NotFoundPage/NotFoundPage"

export default function Search({ setPage, page }) {
  const { query, searchingPage } = useParams()
  const [searchResults, setSearchResults] = useState([])
  const [numberOfPages, setNumberOfPages] = useState(10)

  const [isLoaded, setIsLoaded] = useState(false)

  const fetchSearch = async userQuery => {
    setIsLoaded(false)
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=ru&query=${userQuery.trimStart()}&page=${searchingPage}`,
      )
      // const searchResults = response.data.results
      // console.log(searchResults)
      // return searchResults
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoaded(true)
    }
  }

  useEffect(() => {
    // console.log(searchingPage)
    fetchSearch(query).then(data => {
      setSearchResults(data.results)
      setNumberOfPages(data.total_pages)
    })
    console.log(searchResults)
  }, [query, page, searchingPage])

  return (
    <div className="search">
      <div className="container">
        {isLoaded && searchResults.length ? (
          <>
            <div className="section__title">Результат поиска: </div>
            <Content movies={searchResults} isSearch />
            <CustomPagination
              totalPages={numberOfPages}
              setPage={setPage}
              activePage={searchingPage}
              query={query}
            />
          </>
        ) : (
          <>{isLoaded && !searchResults.length ? <NotFoundPage /> : <Loader />}</>
        )}
      </div>
    </div>
  )
}
