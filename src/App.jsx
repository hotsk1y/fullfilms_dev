/* eslint-disable react-hooks/exhaustive-deps */
import "./App.scss"
import "./styles/global.scss"
import Header from "./components/Header/Header"
import Navbar from "./components/Navbar/Navbar"
import Movie from "./components/Movie/Movie"
import Home from "./components/Home/Home"
import Search from "./components/Search/Search"
import Loader from "./components/Loader/Loader"
import Actor from "./components/Actor/Actor"

import { useEffect, useState } from "react"

import { BrowserRouter, Route } from "react-router-dom"
import { Switch } from "react-router-dom"

import { fetchNowPlaying, fetchPopular } from "./fetchingData"
import NotFoundPage from "./components/NotFoundPage/NotFoundPage"
import Popular from "./components/Popular/Popular"
import GenrePage from "./components/GenrePage/GenrePage"

const App = () => {
  const [movies, setMovies] = useState([])
  const [trailerMovies, setTrailerMovies] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [IsError, setIsError] = useState(false)
  const [isSearch, setIsSearch] = useState(false)

  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchPopular(page)
      .then(data => setMovies(data.results))
      .catch()
      .finally(setIsLoaded(true))
  }, [page])

  useEffect(() => {
    fetchNowPlaying().then(data => setTrailerMovies(data.results))
  }, [])

  const [query, setQuery] = useState("")

  return (
    <BrowserRouter>
      <div className="App">
        {isLoaded && !IsError ? (
          <>
            {/* <Header
              query={query}
              setQuery={setQuery}
              setMovies={setMovies}
              setIsSearch={setIsSearch}
              setIsLoaded={setIsLoaded}
              page={page}
              setPage={setPage}
            /> */}
            <Navbar
              query={query}
              setQuery={setQuery}
              setMovies={setMovies}
              setIsSearch={setIsSearch}
              setIsLoaded={setIsLoaded}
              page={page}
              setPage={setPage}
            />

            <Switch>
              <Route exact path="/">
                <Home
                  trailerMovies={trailerMovies}
                  page={page}
                  query={query}
                  setQuery={setQuery}
                />
              </Route>

              <Route exact path="/info/:movieId">
                <Movie />
              </Route>

              <Route exact path="/actor/:actorId">
                <Actor />
              </Route>

              {/* <Route exact path="/searchActor/:actorQuery">
                <SearchActor />
              </Route> */}

              <Route exact path={`/popular/:popularPage`}>
                <Popular />
              </Route>

              <Route exact path={`/genre/:genreId/:genrePage`}>
                <GenrePage />
              </Route>

              <Route exact path="/search/:searchingPage/:query">
                <Search
                  setQuery={setQuery}
                  setMovies={setMovies}
                  setIsSearch={setIsSearch}
                  setIsError={setIsError}
                  setIsLoaded={setIsLoaded}
                  setPage={setPage}
                  page={page}
                />
              </Route>

              <Route exact path="/*">
                <NotFoundPage />
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
