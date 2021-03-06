import React from "react"
import "./Sorting.scss"
import { Link } from "react-router-dom"
import { fetchGenres } from "../../fetchingData"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setIsActiveAction } from "../../store/reducers/moviesReducer"

export default function Sorting() {
  const dispatch = useDispatch()
  const [genres, setGenres] = useState([])

  useEffect(() => {
    fetchGenres().then(data => {
      setGenres(data.genres)
    })
  }, [])

  const closeMenu = () => {
    dispatch(setIsActiveAction(false))
    document.body.style.overflow = "auto"
  }

  return (
    <div className="sorting">
      <div className="section__title">Search by genre</div>
      <div className="storting__wrapper">
        <Link
          to={`/popular/1`}
          className="sorting__btn"
          onClick={() => closeMenu()}
        >
          <div>Popular</div>
        </Link>
        {genres.length > 0 &&
          genres.map(g => {
            return (
              <Link
                key={g.id}
                to={`/genre/${g.id}/1`}
                className="sorting__btn"
                onClick={() => closeMenu()}
              >
                <div>{g.name}</div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}
