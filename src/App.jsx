/* eslint-disable react-hooks/exhaustive-deps */
import "./App.scss"
import "./styles/global.scss"
import Movie from "./components/Movie/Movie"
import Home from "./components/Home/Home"
import SearchPage from "./components/SearchPage/SearchPage"
import Loader from "./components/Loader/Loader"
import Actor from "./components/Actor/Actor"
import {useDispatch, useSelector} from 'react-redux'

import { useEffect } from "react"

import { BrowserRouter, Route } from "react-router-dom"
import { Switch } from "react-router-dom"

import { fetchNowPlaying } from "./fetchingData"
import NotFoundPage from "./components/NotFoundPage/NotFoundPage"
import Popular from "./components/Popular/Popular"
import GenrePage from "./components/GenrePage/GenrePage"

import { setIsLoadedAction, setTrailerMoviesAction } from "./store/reducers/moviesReducer"

const App = () => {
  const dispatch = useDispatch()
  const {isLoaded, isError} = useSelector(state => state.movies)

  useEffect(() => {
    fetchNowPlaying()
      .then(data => {
        dispatch(setTrailerMoviesAction(data.results))
        dispatch(setIsLoadedAction(true))
      })
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        {isLoaded && !isError ? (
          <>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>

              <Route exact path="/info/:movieId">
                <Movie />
              </Route>

              <Route exact path="/actor/:actorId">
                <Actor />
              </Route>

              <Route exact path={`/popular/:popularPage`}>
                <Popular />
              </Route>

              <Route exact path={`/genre/:genreId/:genrePage`}>
                <GenrePage />
              </Route>

              <Route exact path="/search/:searchingPage/:query">
                <SearchPage />
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
