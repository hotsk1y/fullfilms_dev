import React, { useEffect, useState } from "react"
import "./Navbar.scss"
import logo from "../Navbar/big-logo.png"
import { Link } from "react-router-dom"
import { fetchPopular } from "../../fetchingData"

const Navbar = ({setQuery, setPage, setIsSearch, setMovies, setIsLoaded}) => {
  const [active, setActive] = useState(false)

  const showBar = () => {
    // console.log(window.scrollY)
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
    console.log(123)
    setQuery("")
    setPage(1)
    setIsSearch(false)
    fetchPopular(1)
      .then(data => setMovies(data.results))
      .catch()
      .finally(setIsLoaded(true))
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
