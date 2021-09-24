import React, { useCallback } from "react"
import "./Header.scss"
import { Link, useHistory } from "react-router-dom"
import { fetchPopular } from "../../fetchingData"

import logo from '../Header/big-logo.png'

export default function Header({ query, setQuery, setMovies, setIsLoaded, setIsSearch }) {

  const cleanData = () => {
    console.log(123)
    setQuery('')
    setIsSearch(false)
    fetchPopular()
      .then(res => setMovies(res))
      .catch()
      .finally(setIsLoaded(true))
  }

  const history = useHistory()

  const handleKeyDown = useCallback((e) => {    
    if (e.keyCode === 13) {
      console.log(query)
      history.push(`/search/${query}`)
    }
  }, [query, history])

  return (
    <div className="header">
      <div className="wrapper">
          <Link className="logo" to="/" onClick={cleanData}>
            <img src={logo} alt=""></img>
          </Link>
        <div className="search">
          <input
            className="search__input"
            type="text"
            placeholder="Название фильма..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyDown={handleKeyDown}
          />
          <Link to={query.trim().length > 0 && `/search/${query}`}><div className="search__btn">Поиск...</div></Link>
        </div>
      </div>
    </div>
  )
}