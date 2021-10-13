import React from "react"
import { useEffect, useState } from "react"
import "./Hero.scss"

export default function Hero({
  heroTitle,
  heroDescr,
  heroImg,
  activeTrailer,
  heroTrailer,
}) {
  const styles = {
    background: `linear-gradient(to bottom, rgba(0,0,0, .3), rgba(0,0,0, 1)), url(${heroImg})`,
  }

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    heroImg && setIsLoaded(true)
  }, [heroImg])

  return (
    <>
      {isLoaded && (
        <>
          <div className="hero" style={styles}>
            <div className="wrapper">
              <div className="hero__info">
                <div className="hero__title">{heroTitle}</div>
                <div className="hero__descr">{heroDescr}</div>
                {activeTrailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${heroTrailer}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hero__btn"
                  >
                    Watch the trailer
                  </a>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
