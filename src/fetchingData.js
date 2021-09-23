import axios from "axios"

export const fetchPopular = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=ru`,
    )
    const films = response.data.results
    console.log(films)
    return films
  } catch (error) {
    console.log(error)
  }
}

export const fetchMovieInfo = async(id) => {
    try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=ru`)
        console.log(data);
        const info = {
            title: data.title,
            descr: data.overview
        }
        return info
    } catch (error) {
        console.log(error)
    }
}

export const fetchMovieCredits = async(id) => {
    try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=ru`)
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}