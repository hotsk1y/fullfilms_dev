import React from "react"
import "./SearchInput.scss"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { useCallback } from "react"
import { setQueryAction } from "../../store/reducers/moviesReducer"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

export default function SearchInput() {
  const history = useHistory()
  const dispatch = useDispatch()

  const { query, page } = useSelector(state => state.movies)

  const handleChange = e => {
    dispatch(setQueryAction(e.target.value))
  }

  const handleKeyDown = useCallback(
    e => {
      if (e.keyCode === 13) {
        history.push(`/search/${page}/${query}`)
      }
    },
    [query, history, page],
  )

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Movie title..."
        onChange={e => handleChange(e)}
        value={query}
        onKeyDown={handleKeyDown}
      />
      <Link
        to={query.trim().length > 0 && `/search/${page}/${query}`}
        className="search__btn"
      >
        Search...
      </Link>
    </div>
  )
}
