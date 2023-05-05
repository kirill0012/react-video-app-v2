import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Generation } from '../../services/concepts'
import { IdeaItem, IdeaRequest } from '../../services/ideas'
import { RequestFormData } from '../../components/Idea/Request'

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
      }
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

export const { loadGenerations, addGeneration, setRequest, setRequestRunning, setIdea } =
  gen.actions

export const getGenerations = (state: RootState) => state.gen.generations
export const getRequest = (state: RootState) => state.gen.request
export const getRequestPending = (state: RootState) => state.gen.isGeneratingIdea
export const getRequestAbility = (state: RootState) => !state.gen.isGeneratingIdea
export const getIdea = (state: RootState) => state.gen.idea

export default gen.reducer
