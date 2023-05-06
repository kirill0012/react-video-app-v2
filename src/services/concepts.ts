import endpoints from '../constants/endpoints'
import request from '../lib/api/request'
import { IdeaItem } from './ideas'
import axios from 'axios'
import Cookies from 'js-cookie'
import { removeElements } from '../constants/iteration'

export type Generation = {
  id: string
  title: string
  brief: string
  videos: Array<VideoItem>
}

export type VideoItem = {
  id: string
  src: string
  image: string
  eta?: Date | string
  created: Date | string
  in_progress: boolean
  // generation: Omit<Generation, 'videos'>
  // generation_id: number
}

export interface TextEditInput {
  old_text: string
  new_text: string
}

export interface EditAdVideoInput {
  video_item_id: number
  text_edits?: Array<TextEditInput>
  text_to_delete?: Array<string | undefined>
  regenerate_all_text?: boolean
  regenerate_all_images?: boolean
  regenerate_all_soundtracks?: boolean
  replace_narrator?: boolean
  remove_all_text?: boolean
  remove_voice_over?: boolean
}

export const ConceptsAPI = {
  generateConcept: async (idea: IdeaItem): Promise<Generation> => {
    const access_token = Cookies.get('access_token')

    const response = await request
      .request<Generation>({
        url: endpoints.conceptGenerateEndpoint,
        method: 'POST',
        headers: { Authorization: `Bearer ${access_token}` },
        data: {
          title: idea.title,
          summary: idea.summary,
          assets_agent_input: idea.assets_agent_input,
          game_mechanics: idea.game_mechanics,
          prompt_engine_configuration: idea.prompt_engine_configuration,
        },
      })
      .catch(() => {
        return Promise.reject(null)
      })

    return Promise.resolve(response.data)
  },
  cancelGeneration: async (id: string): Promise<boolean> => {
    const access_token = Cookies.get('access_token')

    await request
      .request({
        url: endpoints.conceptCancelGenerationEndpoint,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${access_token}` },
        data: {
          video_item_id: id,
        },
      })
      .catch(() => {
        return Promise.reject(false)
      })

    return Promise.resolve(true)
  },
  listConcepts: async (): Promise<Generation[]> => {
    const response = await request
      .request<Generation[]>({
        url: endpoints.conceptsListEndpoint,
        method: 'GET',
      })
      .catch(() => {
        return Promise.reject(null)
      })

    return Promise.resolve(response.data)
  },
  listConceptsServerSide: async (access_token: string | undefined): Promise<Generation[]> => {
    return axios
      .get<Generation[]>(`${process.env.REACT_APP_API_URL_PROD}${endpoints.conceptsListEndpoint}`, {
        headers: access_token ? { Authorization: `Bearer ${access_token}` } : undefined,
        withCredentials: true,
      })
      .then((response) => {
        return response.data
      })
  },
  getGenerationById: async (id: string): Promise<Generation> => {
    const access_token = Cookies.get('access_token')

    const response = await request
      .request<Generation>({
        url: endpoints.getGenerationEndpoint,
        method: 'GET',
        headers: { Authorization: `Bearer ${access_token}` },
        params: { id },
      })
      .catch(() => {
        return Promise.reject(null)
      })

    return Promise.resolve(response.data)
  },
  iterateConcept: async (
    videoId: string,
    subject: Array<number>,
    transcript: string,
    remove: Array<number>
  ): Promise<Generation> => {
    const access_token = Cookies.get('access_token')

    // Convert the transcript string into an array of TextEditInput
    const textPairs = transcript.split(/"{2}/).filter((t) => t) // Split the string by double quotes and remove empty strings
    const textEdits: TextEditInput[] = []
    for (let i = 0; i < textPairs.length; i += 2) {
      textEdits.push({
        old_text: textPairs[i].trim(),
        new_text: textPairs[i + 1]?.trim(),
      }) // Create an object conforming to TextEditInput
    }

    // Convert the remove array into text_to_delete array
    // const textToDelete = remove.map((id) => removeElements.find((el) => el.id === id)?.label)
    const textToDelete: string[] = []

    console.log('subject - ', subject)
    // Handle subject-related changes
    const regenerateAllText = subject.includes(0)
    const regenerateAllImages = subject.includes(2)
    const regenerateAllSoundtracks = subject.includes(3)
    const replaceNarrator = subject.includes(1)

    // Handle remove-related changes
    const removeAllText = remove.includes(0)
    const removeVoiceOver = remove.includes(1)

    const response = await request
      .request<Generation>({
        url: endpoints.conceptIterateEndpoint,
        headers: { Authorization: `Bearer ${access_token}` },
        method: 'POST',
        data: {
          video_item_id: videoId,
          text_edits: textEdits,
          text_to_delete: textToDelete,
          regenerate_all_text: regenerateAllText,
          regenerate_all_images: regenerateAllImages,
          regenerate_all_soundtracks: regenerateAllSoundtracks,
          replace_narrator: replaceNarrator,
          remove_all_text: removeAllText,
          remove_voice_over: removeVoiceOver,
        },
      })
      .catch(() => {
        return Promise.reject(false)
      })

    return Promise.resolve(response.data)
  },
}
