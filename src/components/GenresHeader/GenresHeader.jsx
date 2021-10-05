import React from "react"
import "./GenresHeader.scss"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import BackButton from "../BackButton/BackButton"
import Sorting from "../Sorting/Sorting"
import { setIsActiveAction } from "../../store/reducers/moviesReducer"
import { useDispatch } from "react-redux"
import logo from "./logo.png"
import {
  setIsLoadedAction,
  setQueryAction,
  setPageAction,
  setMoviesAction,
} from "../../store/reducers/moviesReducer"
import { fetchPopular } from "../../fetchingData"
import { Link } from "react-router-dom"

const GenresHeader = () => {
  const dispatch = useDispatch()
  const isActive = useSelector(state => state.movies.isActive)

  const handleOpen = () => {
    dispatch(setIsActiveAction(true))
    document.body.style.overflow = "hidden"
  }
  const handleClose = () => {
    dispatch(setIsActiveAction(false))
    document.body.style.overflow = "auto"
  }

  const cleanData = () => {
    dispatch(setIsLoadedAction(false))
    dispatch(setQueryAction(""))
    dispatch(setPageAction(1))
    fetchPopular(1)
      .then(data => dispatch(setMoviesAction(data.results)))
      .catch()
      .finally(dispatch(setIsLoadedAction(true)))
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    document.body.style.overflowX = "hidden"
  }, [isActive])

  return (
    <div className="genresHeader">
      <BackButton />
      <Link to="/" className="logo" onClick={() => cleanData()}>
        <img src={logo} alt="logo" />
      </Link>
      <button className="genres__btn" onClick={() => handleOpen()}>
        <img
          src="https://img-premium.flaticon.com/png/512/3887/premium/3887618.png?token=exp=1633352207~hmac=1bf8d24a1df4ae38a9a7cda01d08a0bd"
          alt="open"
        />
      </button>
      <div
        className={
          isActive
            ? "genres__sorting-wrapper active"
            : "genres__sorting-wrapper"
        }
      >
        <button className="genres__btn close" onClick={() => handleClose()}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2919/2919543.png"
            alt="close"
          />
        </button>
        <Sorting />
      </div>
    </div>
  )
}

export default GenresHeader