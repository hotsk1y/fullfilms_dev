/* eslint-disable react-hooks/exhaustive-deps */
import "./App.scss"
import "./styles/global.scss"
import Header from "./components/Header/Header"
import Stack from "@mui/material/Stack"
import CircularProgress from "@mui/material/CircularProgress"
import Movie from "./components/Movie/Movie"
import NotFound from "./components/NotFound/NotFound"
import Home from "./components/Home/Home"

import axios from "axios"
import { useEffect, useState } from "react"

import { BrowserRouter, Route } from "react-router-dom"
import { Switch } from "react-router-dom"

import { fetchPopular } from "./fetchingData"

const App = () => {
  const [movies, setMovies] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [IsError, setIsError] = useState(false)
  const [isSearch, setIsSearch] = useState(false)

  useEffect(() => {
    fetchPopular()
      .then(res => setMovies(res))
      .catch()
      .finally(setIsLoaded(true))
  }, [])

  const [query, setQuery] = useState("")

  const fetchSearch = async () => {
    setIsLoaded(false)
    try {
      if (query.trim() !== "") {
        setIsSearch(true)
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${
            process.env.REACT_APP_API_KEY
          }&language=ru&query=${query.trimStart()}&page=1&include_adult=false`,
        )
        const searchResults = response.data.results
        setMovies(searchResults)
      }
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoaded(true)
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        {isLoaded && !IsError ? (
          <>
            <Header
              query={query}
              setQuery={setQuery}
              setMovies={setMovies}
              fetchSearch={fetchSearch}
              setIsSearch={setIsSearch}
              setIsLoaded={setIsLoaded}
            />

            <Switch>
              <Route exact path="/">
                <Home movies={movies} isSearch={isSearch} setQuery={setQuery} setIsSearch={setIsSearch} />
              </Route>

              <Route exact path="/:movieId">
                <Movie />
              </Route>

              <Route exact path="/*">
                <NotFound />
              </Route>
            </Switch>
          </>
        ) : (
          <div>
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
              <CircularProgress color="inherit" />
            </Stack>
          </div>
        )}
      </div>
    </BrowserRouter>
  )
}

export default App
