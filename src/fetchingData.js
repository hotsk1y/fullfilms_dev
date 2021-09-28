import axios from "axios"

export const fetchPopular = async page => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=ru&page=${page}`,
    )
    const films = response.data.results
    return films
  } catch (error) {
    console.log(error)
  }
}

export const fetchMovieInfo = async id => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=ru`,
    )
    console.log(data)
    const info = {
      id: data.id,
      title: data.title,
      descr: data.overview,
      image: data.poster_path,
      background: data.backdrop_path,
      year: data.release_date,
      country: data.production_countries,
      genre: data.genres,
      slogan: data.tagline,
      runtime: data.runtime,
    }
    return info
  } catch (error) {
    console.log("movie info error")
  }
}

export const fetchMovieCredits = async id => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=ru`,
    )
    // console.log(data)
    return data
  } catch (error) {
    console.log("movie credit error")
  }
}

export const fetchActor = async (id) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=ru`
    )
    console.log(data)
    return data
  } catch (error) {
    console.log("actor movies error")
  }
}
