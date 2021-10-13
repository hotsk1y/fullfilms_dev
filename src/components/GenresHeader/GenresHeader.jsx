import React from "react"
import "./GenresHeader.scss"
import { useSelector } from "react-redux"
import BackButton from "../BackButton/BackButton"
import Sorting from "../Sorting/Sorting"
import { setIsActiveAction } from "../../store/reducers/moviesReducer"
import { useDispatch } from "react-redux"
import logo from "./logo.png"
import close from "./close.png"
import menu from './menu.png'
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
    document.body.style.overflow = "hidden auto"
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

  return (
    <div className="genresHeader">
      <BackButton />
      <Link to="/" className="logo" onClick={() => cleanData()}>
        <img src={logo} alt="logo" />
      </Link>
      <button className="genres__btn" onClick={() => handleOpen()}>
        <img
          src={menu}
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
        <div className="header__btn-wrapper">
        <button className="genres__btn close" onClick={() => handleClose()}>
          <img
            src={close}
            alt="close"
          />
        </button>
        </div>
        <Sorting />
      </div>
    </div>
  )
}

export default GenresHeader
