import React, { useState, useCallback, useEffect } from "react"
import "./Home.scss"
import Hero from "../Hero/Hero"
import Content from "../Content/Content"
import axios from "axios"
import Loader from "../Loader/Loader"
import Sorting from "../Sorting/Sorting"
import SearchInput from "../SearchInput/SearchInput"
import { useSelector } from "react-redux"
import Navbar from "../Navbar/Navbar"

export default function Home() {
  const [heroTitle, setHeroTitle] = useState(null)
  const [heroDescr, setHeroDescr] = useState(null)
  const [heroImg, setHeroImg] = useState(null)
  const [activeTrailer, setActiveTrailer] = useState(true)
  const [heroTrailer, setHeroTrailer] = useState(null)

  const [heroVideoLinkEn, setHeroVideoLinkEn] = useState(null)

  const [isLoaded, setIsLoaded] = useState(false)

  const trailerMovies = useSelector(state => state.movies.trailerMovies)

  const selectHero = useCallback(() => {
    setIsLoaded(false)
    for (let i = 0; i < trailerMovies.length; i++) {
      if (
        trailerMovies[i].overview.length < 320 &&
        trailerMovies[i].overview.length !== 0
      ) {
        setHeroImg(
          `https://image.tmdb.org/t/p/w1280/${trailerMovies[i].backdrop_path}`,
        )
        setHeroTitle(trailerMovies[i].title)
        setHeroDescr(trailerMovies[i].overview)
        setHeroVideoLinkEn(
          `https://api.themoviedb.org/3/movie/${trailerMovies[i].id}/videos?api_key=d3b9f599977e9ade8cffaa24eefacbc9`,
        )
        break
      }
    }
    setIsLoaded(true)
  }, [trailerMovies])

  const getTrailer = useCallback(() => {
    setIsLoaded(false)
    if (heroVideoLinkEn) {
      axios
        .get(heroVideoLinkEn)
        .then(res => {
          setHeroTrailer(res.data.results[0].key)
        })
        .catch(e => {
          console.log("There is no trailer for this movie")
          setActiveTrailer(false)
        })
    }
    setIsLoaded(true)
  }, [heroVideoLinkEn])

  useEffect(() => {
    selectHero()
    getTrailer()
  }, [selectHero, getTrailer])

  return (
    <>
      {isLoaded ? (
        <>
          <Navbar />
          <div className="home">
            {trailerMovies.length > 0 && (
              <Hero
                heroTitle={heroTitle}
                heroDescr={heroDescr}
                heroImg={heroImg}
                activeTrailer={activeTrailer}
                heroTrailer={heroTrailer}
              />
            )}
            <Sorting />
            <div className="search__wrapper">
              <div className="section__title">Search for a movie by title</div>
              <SearchInput />
            </div>
            <div className="home__popular">
              <div className="container">
                <div className="section__title">Now in cinemas</div>
                <Content movies={trailerMovies} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}
