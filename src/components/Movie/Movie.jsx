import React from "react";
import "./Movie.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { fetchMovieInfo, fetchMovieCredits } from "../../fetchingData";

export default function Movie() {

    let {movieId} = useParams()
    console.log(movieId)

    const [info, setInfo] = useState({});

    useEffect(() => {
        fetchMovieInfo(movieId)
            .then(res => {
                setInfo(res)
            })
        fetchMovieCredits(movieId)
    }, [movieId])

    useEffect(() => {
        console.log(info)
    }, [info])

    return (
    <div className="movie">
        Movie {info.title}
        <div>
            {info.descr}
        </div>
    </div>
  );
}
