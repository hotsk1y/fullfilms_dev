import React, { useEffect, useState } from "react"
import "./Navbar.scss"
import logo from "../Navbar/big-logo.png"
import { Link } from "react-router-dom"
import { fetchPopular } from "../../fetchingData"
import { useDispatch } from "react-redux"
import { setQueryAction, setMoviesAction, setIsLoadedAction, setPageAction } from "../../store/reducers/moviesReducer"

const Navbar = () => {

  const dispatch = useDispatch()
  const [active, setActive] = useState(false)

  const showBar = () => {
    if (window.scrollY > 175) {
      setActive(true)
    } else {
      setActive(false)
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", () => showBar())
    return document.removeEventListener("scroll", () => showBar())
  }, [])

  const cleanData = () => {
    dispatch(setIsLoadedAction(false))
    dispatch(setQueryAction(''))
    dispatch(setPageAction(1))
    fetchPopular(1)
      .then(data => dispatch(setMoviesAction(data.results)))
      .catch()
      .finally(dispatch(setIsLoadedAction(true)))
    window.scrollTo(0, 0)
  }

  return (
    <div className={`${active ? `navbar active` : `navbar`}`}>
      <div className="container">
        <Link className="logo" to="/" onClick={cleanData}>
          <img src={logo} className="logo" alt="" />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
