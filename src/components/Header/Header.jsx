import React from "react"
import "./Header.scss"
import { Link } from "react-router-dom"
import { fetchPopular } from "../../fetchingData"

export default function Header({ query, setQuery, fetchSearch, setMovies, setIsLoaded, setIsSearch }) {

  const cleanData = () => {
    console.log(123)
    setQuery('')
    setIsSearch(false)
    fetchPopular()
      .then(res => setMovies(res))
      .catch()
      .finally(setIsLoaded(true))
  }

  return (
    <div className="header">
      <div className="wrapper">
          <Link className="logo" to="/" onClick={cleanData}>
            <img src="big-logo.png" alt="" />
          </Link>
        <div className="search">
          <input
            className="search__input"
            type="text"
            placeholder="Название фильма..."
            onChange={e => setQuery(e.target.value)}
            value={query}
          />
          <button className="search__btn" onClick={() => fetchSearch(query)}>
            Найти
          </button>
        </div>
      </div>
    </div>
  )
}
