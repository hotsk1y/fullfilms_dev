import { combineReducers } from 'redux'
import { moviesReducer } from './moviesReducer'
import { actorReducer } from './actorReducer'
import { moviePageReducer } from './moviePageReducer'

export const rootReducer = combineReducers({
  movies: moviesReducer,
  actor: actorReducer,
  moviePage: moviePageReducer
})