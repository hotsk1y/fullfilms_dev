const defaultMoviePageState = {
  info: {},
  image: null,
  background: null,
  actors: [],
  year: null,
  premiere: null,

  screenplay: [],
  director: [],
  producer: [],
  camera: [],
  sound: [],
  art: [],
  editor: [],
}

export const INFO = "INFO"
export const IMAGE = "IMAGE"
export const BACKGROUND = "BACKGROUND"
export const ACTORS = "ACTORS"
export const YEAR = "YEAR"
export const PREMIERE = "PREMIERE"

export const SCREENPLAY = "SCREENPLAY"
export const DIRECTOR = "DIRECTOR"
export const PRODUCER = "PRODUCER"
export const CAMERA = "CAMERA"
export const SOUND = "SOUND"
export const ART = "ART"
export const EDITOR = "EDITOR"

export const moviePageReducer = (state = defaultMoviePageState, action) => {
  switch (action.type) {
    case INFO:
      return { ...state, info: action.payload }
    case IMAGE:
      return { ...state, image: action.payload }
    case BACKGROUND:
      return { ...state, background: action.payload }
    case ACTORS:
      return { ...state, actors: action.payload }
    case YEAR:
      return { ...state, year: action.payload }
    case PREMIERE:
      return { ...state, premiere: action.payload }
    case DIRECTOR:
      return { ...state, director: [...state.director, action.payload] }
    case SCREENPLAY:
      return { ...state, screenplay: [...state.screenplay, action.payload] }
    case PRODUCER:
      return { ...state, producer: [...state.producer, action.payload] }
    case CAMERA:
      return { ...state, camera: [...state.camera, action.payload] }
    case SOUND:
      return { ...state, sound: [...state.sound, action.payload] }
    case ART:
      return { ...state, art: [...state.art, action.payload] }
    case EDITOR:
      return { ...state, editor: [...state.editor, action.payload] }

    default:
      return state
  }
}

export const setInfoAction = payload => ({
  type: INFO,
  payload,
})

export const setImageAction = payload => ({
  type: IMAGE,
  payload,
})

export const setBackgroundAction = payload => ({
  type: BACKGROUND,
  payload,
})

export const setActorsAction = payload => ({
  type: ACTORS,
  payload,
})

export const setYearAction = payload => ({
  type: YEAR,
  payload,
})

export const setPremiereAction = payload => ({
  type: PREMIERE,
  payload,
})

export const setScreenplayAction = payload => ({
  type: SCREENPLAY,
  payload,
})

export const setDirectorAction = payload => ({
  type: DIRECTOR,
  payload,
})

export const setProducerAction = payload => ({
  type: PRODUCER,
  payload,
})

export const setCameraAction = payload => ({
  type: CAMERA,
  payload,
})

export const setSoundAction = payload => ({
  type: SOUND,
  payload,
})

export const setArtAction = payload => ({
  type: ART,
  payload,
})

export const setEditorAction = payload => ({
  type: EDITOR,
  payload,
})
