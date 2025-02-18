import axios from "axios"

export const fetchPopular = async (page=1) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`,
    )
    // const films = response.data.results
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const fetchMovieInfo = async id => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`,
    )
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
    throw new Error(error)
  }
}

export const fetchMovieCredits = async id => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`,
    )
    return data
  } catch (error) {
    console.log("movie credit error")
    throw new Error(error)
  }
}

export const fetchActorFilms = async id => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}`,
    )
    return data
  } catch (error) {
    console.log("actor movies error")
    throw new Error(error)
  }
}

export const fetchActorInfo = async id => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}`,
    )
    return data
  } catch (error) {
    console.log("actor info error")
    throw new Error(error)
  }
}

export const fetchActors = async (query, page) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&page=${page}`,
    )
    return data
  } catch (error) {
    console.log("actor info error")
    throw new Error(error)
  }
}

export const fetchGenres = async () => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`,
    )
    return data
  } catch (error) {
    console.log("genres error")
    throw new Error(error)
  }
}

export const fetchMoviesWithGenre = async (genre, page = 1) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&page=${page}&with_genres=${genre}`,
    )
    return data
  } catch (error) {
    console.log("genres error")
    throw new Error(error)
  }
}

export const fetchNowPlaying = async () => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&page=1`,
    )
    return data
  } catch (error) {
    console.log("now playing error")
    throw new Error(error)
  }
}
