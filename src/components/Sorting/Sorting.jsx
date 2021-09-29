import React from "react"
import "./Sorting.scss"
import { Link } from "react-router-dom"
// import { useState, useCallback } from "react/cjs/react.development"
// import { useHistory } from "react-router"
import { fetchGenres, fetchMoviesWithGenre } from "../../fetchingData"
import { useState, useEffect } from "react/cjs/react.development"

export default function Sorting({setPage, page}) {
  // const [query, setQuery] = useState('')
  // const history = useHistory()

  // const handleKeyDown = useCallback((e) => {
  //     if (e.keyCode === 13) {
  //       // console.log(query)
  //       history.push(`/searchActor/${query}`)
  //     }
  //   }, [query, history])

  const [genres, setGenres] = useState([])

  useEffect(() => {
    fetchGenres().then(data => {
      setGenres(data.genres)
    })
  }, [])

  const handleClick = (g) => {
    // fetchMoviesWithGenre()
    console.log(g.id)
    // setPage(1)
    console.log(page);
  }

  console.log(genres)

  return (
    <div className="sorting">
      <Link to={`/popular/1`} className="sorting__btn">
        <div>популярные</div>
      </Link>
      {genres.length > 0 &&
        genres.map(g => {
          return (
              <Link key={g.id} to={`/genre/${g.id}/1`} className="sorting__btn" onClick={() => handleClick(g)}>
                <div>{g.name}</div>
              </Link>
          )
        })}
      {/* <div className="search">
        <input
          className="search__input"
          type="text"
          placeholder="Название фильма..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyDown={handleKeyDown}
        />
      </div> */}
    </div>
  )
}
