const defaultActorState = {
  actorFilms: [],
  actorInfo: [],
}

export const ACTOR_FILMS = "ACTOR_FILMS"
export const ACTOR_INFO = "ACTOR_INFO"

export const actorReducer = (state = defaultActorState, action) => {
  switch (action.type) {
    case ACTOR_FILMS:
      return { ...state, actorFilms: action.payload }
    case ACTOR_INFO:
      return { ...state, actorInfo: action.payload }

    default:
      return state
  }
}

export const setActorFilmsAction = payload => ({
  type: ACTOR_FILMS,
  payload,
})

export const setActorInfoAction = payload => ({
  type: ACTOR_INFO,
  payload,
})
