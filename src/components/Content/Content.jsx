import React from "react"
import "./Content.scss"
import MovieItem from "../MovieItem/MovieItem"

export default function Popular({ movies, isSearch }) {
  // console.log(movies)

  return (
    <div className="content">
      <div className="container">
        <div className="section__title">
          {isSearch ? "Результаты поиска:" : "Популярно сейчас:"}
        </div>
        <div className="popular__items">
          {movies.map(movie => {
            return (
              <MovieItem
                key={movie.id}
                id={movie.id}
                title={movie.title ? movie.title : movie.name}
                descr={movie.overview}
                image={movie.poster_path}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
