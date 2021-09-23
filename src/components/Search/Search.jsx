import React, { useState } from "react"
import "./Search.scss"
import { useParams } from "react-router"
import { useEffect } from "react/cjs/react.development"
import axios from "axios"
import Content from "../Content/Content"

export default function Search() {
  const { query } = useParams()
  const [searchResults, setSearchResults] = useState([])

  const fetchSearch = async userQuery => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=ru&query=${userQuery.trimStart()}&page=1&include_adult=false`,
      )
      const searchResults = response.data.results
      console.log(searchResults)
      return searchResults
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(query)
    fetchSearch(query).then(res => setSearchResults(res))
  }, [query])

  return (
    <div className="search">
      <div className="container">
        <Content movies={searchResults} isSearch />
      </div>
    </div>
  )
}
