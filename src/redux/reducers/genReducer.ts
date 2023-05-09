import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Generation } from '../../services/concepts'
import { IdeaItem, IdeaRequest } from '../../services/ideas'

type GenState = {
  generations: Generation[]
  request: IdeaRequest | null
  isGeneratingIdea: boolean
  idea: IdeaItem | null
}

const initialState: GenState = {
  generations: [],
  request: null,
  isGeneratingIdea: false,
  idea: null,
}

export const gen = createSlice({
  name: 'gen',
  initialState,
  reducers: {
    loadGenerations: (state, action: PayloadAction<Generation[]>) => {
      state.generations = action.payload
    },
    addGeneration: (state, action: PayloadAction<Generation>) => {
      const genIds = state.generations.map((g) => g.id)
      if (!genIds.includes(action.payload.id)) {
        state.generations = [...state.generations, action.payload]
      } else {
        state.generations = state.generations.map((g) =>
          g.id === action.payload.id ? action.payload : g
        )
      }
    },
    cancelVideo: (state, action: PayloadAction<string>) => {
      const newGen = state.generations.map((gen) => {
        gen.videos = gen.videos.filter((vid) => {
          return vid.id !== action.payload
        })
        return gen
      })
      state.generations = newGen.filter((gen) => gen.videos.length > 0)
    },
    setRequest: (state, action: PayloadAction<IdeaRequest | null>) => {
      state.request = action.payload
    },
    setRequestRunning: (state, action: PayloadAction<boolean>) => {
      state.isGeneratingIdea = action.payload
    },
    setIdea: (state, action: PayloadAction<IdeaItem | null>) => {
      state.idea = action.payload
    },
  },
})

export const {
  loadGenerations,
  addGeneration,
  cancelVideo,
  setRequest,
  setRequestRunning,
  setIdea,
} = gen.actions

export const getGenerations = (state: RootState) => state.gen.generations
export const getRequest = (state: RootState) => state.gen.request
export const getRequestPending = (state: RootState) => state.gen.isGeneratingIdea
export const getIdea = (state: RootState) => state.gen.idea

export const getGenerationsPendingCount = createSelector(getGenerations, (items) =>
  items.reduce(
    (subtotal, item) => subtotal + (item.videos.length > 0 && item.videos[0].in_progress ? 1 : 0),
    0
  )
)
export const getGenerateAbility = (state: RootState) =>
  !state.gen.isGeneratingIdea &&
  state.user.profile &&
  getGenerationsPendingCount(state) < state.user.profile.generation_limits.concepts

export const getIterationsPendingCount = createSelector(getGenerations, (items) =>
  items.reduce(
    (subtotal, item) =>
      subtotal +
      (item.videos.length > 1
        ? item.videos.reduce((iterations, video) => iterations + (video.in_progress ? 1 : 0), 0)
        : 0),
    0
  )
)
export const getIterateAbility = (state: RootState) =>
  state.user.profile &&
  getIterationsPendingCount(state) < state.user.profile.generation_limits.iterations

export default gen.reducer
