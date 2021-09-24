/* eslint-disable react-hooks/exhaustive-deps */
import "./App.scss"
import "./styles/global.scss"
import Header from "./components/Header/Header"
import Movie from "./components/Movie/Movie"
import NotFound from "./components/NotFound/NotFound"
import Home from "./components/Home/Home"
import Search from "./components/Search/Search"
import Loader from "./components/Loader/Loader"

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

  return (
    <BrowserRouter>
      <div className="App">
        {isLoaded && !IsError ? (
          <>
            <Header
              query={query}
              setQuery={setQuery}
              setMovies={setMovies}
              setIsSearch={setIsSearch}
              setIsLoaded={setIsLoaded}
            />

            <Switch>
              <Route exact path="/">
                <Home
                  movies={movies}
                  isSearch={isSearch}
                  setQuery={setQuery}
                  setIsSearch={setIsSearch}
                />
              </Route>

              <Route exact path="/info/:movieId">
                <Movie />
              </Route>

              <Route exact path="/search/:query">
                <Search
                  setQuery={setQuery}
                  setMovies={setMovies}
                  setIsSearch={setIsSearch}
                  setIsError={setIsError}
                  setIsLoaded={setIsLoaded}
                />
              </Route>

              <Route exact path="/*">
                <NotFound />
              </Route>
            </Switch>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </BrowserRouter>
  )
}

export default App
