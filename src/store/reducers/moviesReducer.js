const defaultMoviesState = {
  query: "",
  movies: [],
  isLoaded: false,
  isError: false,
  trailerMovies: [],
  page: 1,
  numberOfPages: 10,
  genreTitle: "",
  isActive: false
}

export const QUERY = "QUERY"
export const MOVIES = "MOVIES"
export const IS_LOADED = "IS_LOADED"
export const IS_ERROR = "IS_ERROR"
export const TRAILER_MOVIES = "TRAILER_MOVIES"
export const PAGE = "PAGE"
export const NUMBER_OF_PAGES = "NUMBER_OF_PAGES"
export const GENRE_TITLE = "GENRE_TITLE"
export const IS_ACTIVE = "IS_ACTIVE"

export const moviesReducer = (state = defaultMoviesState, action) => {
  switch (action.type) {
    case QUERY:
      return { ...state, query: action.payload }
    case MOVIES:
      return { ...state, movies: action.payload }
    case IS_LOADED:
      return { ...state, isLoaded: action.payload }
    case IS_ERROR:
      return { ...state, isError: action.payload }
    case TRAILER_MOVIES:
      return { ...state, trailerMovies: action.payload }
    case PAGE:
      return { ...state, page: action.payload }
    case NUMBER_OF_PAGES:
      return { ...state, numberOfPages: action.payload }
    case GENRE_TITLE:
      return { ...state, genreTitle: action.payload }
    case IS_ACTIVE:
      return { ...state, isActive: action.payload }

    default:
      return state
  }
}

export const setQueryAction = payload => ({
  type: QUERY,
  payload,
})

export const setMoviesAction = payload => ({
  type: MOVIES,
  payload,
})

export const setIsLoadedAction = payload => ({
  type: IS_LOADED,
  payload,
})

export const setIsErrorAction = payload => ({
  type: IS_ERROR,
  payload,
})

export const setTrailerMoviesAction = payload => ({
  type: TRAILER_MOVIES,
  payload,
})

export const setPageAction = payload => ({
  type: PAGE,
  payload,
})

export const setNumberOfPagesAction = payload => ({
  type: NUMBER_OF_PAGES,
  payload,
})

export const setGenreTitleAction = payload => ({
  type: GENRE_TITLE,
  payload,
})

export const setIsActiveAction = payload => ({
  type: IS_ACTIVE,
  payload,
})
