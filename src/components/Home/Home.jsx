import React, { useState, useCallback, useEffect } from "react"
import "./Home.scss"
import Hero from "../Hero/Hero"
import Content from "../Content/Content"
import axios from "axios"
import Loader from "../Loader/Loader"

export default function Home({ movies, isSearch }) {
  const [heroTitle, setHeroTitle] = useState(null)
  const [heroDescr, setHeroDescr] = useState(null)
  const [heroImg, setHeroImg] = useState(null)
  const [activeTrailer, setActiveTrailer] = useState(true)
  const [heroTrailer, setHeroTrailer] = useState(null)

  const [heroVideoLinkRu, setHeroVideoLinkRu] = useState(null)
  const [heroVideoLinkEn, setHeroVideoLinkEn] = useState(null)

  const [isLoaded, setIsLoaded] = useState(false)

  const selectHero = useCallback(() => {
    setIsLoaded(false)
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].overview.length < 320 && movies[i].overview.length !== 0) {
        setHeroImg(
          `https://image.tmdb.org/t/p/w1280/${movies[i].backdrop_path}`,
        )
        setHeroTitle(movies[i].title)
        setHeroDescr(movies[i].overview)
        setHeroVideoLinkRu(
          `https://api.themoviedb.org/3/movie/${movies[i].id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=ru`,
        )
        setHeroVideoLinkEn(
          `https://api.themoviedb.org/3/movie/${movies[i].id}/videos?api_key=${process.env.REACT_APP_API_KEY}`,
        )
        break
      }
    }
    setIsLoaded(true)
  }, [movies])

  const getTrailer = useCallback(() => {
    setIsLoaded(false)
    if (heroVideoLinkRu || heroVideoLinkEn) {
      axios
        .get(heroVideoLinkRu)
        .then(res => setHeroTrailer(res.data.results[0].key))
        .catch(e => {
          console.log("Russian trailer not found")
          axios
            .get(heroVideoLinkEn)
            .then(res => {
              setHeroTrailer(res.data.results[0].key)
            })
            .catch(e => {
              console.log("There is no trailer for this movie")
              setActiveTrailer(false)
            })
        })
    }
    setIsLoaded(true)
  }, [heroVideoLinkRu, heroVideoLinkEn])

  useEffect(() => {
    selectHero()
    getTrailer()
  }, [selectHero, getTrailer])

  return (
    <>
      {isLoaded ? (
        <>
          <div className="home">
            {!isSearch && movies.length > 0 && (
              <Hero
                heroTitle={heroTitle}
                heroDescr={heroDescr}
                heroImg={heroImg}
                activeTrailer={activeTrailer}
                heroTrailer={heroTrailer}
              />
            )}
            <Content
              movies={movies}
              isSearch={isSearch}
              heroTrailer={heroTrailer}
            />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}
