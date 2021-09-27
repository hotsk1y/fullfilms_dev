import React from "react"
import "./Content.scss"
import MovieItem from "../MovieItem/MovieItem"

export default function Popular({ movies }) {

  return (
    <div className="content">        
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
  )
}
