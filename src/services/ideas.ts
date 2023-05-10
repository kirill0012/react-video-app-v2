import endpoints from '../constants/endpoints'
import request from '../lib/api/request'

export type IdeaRequest = {
  concept_name: string
  game_id: string
  ad_networks_group: string
  size_format: string
  ad_placement: string
}

export type IdeaItem = {
  title: string
  summary: string
  game_mechanics: string
  assets_agent_input: Record<string, string>
  prompt_engine_configuration: Record<string, string>
}

export const IdeasAPI = {
  generateIdea: async (ideaRequest: IdeaRequest): Promise<IdeaItem> => {
    const response = await request
      .request<IdeaItem>({
        url: endpoints.ideaGenerateEndpoint,
        method: 'POST',
        data: {
          concept_name: ideaRequest.concept_name,
          game_id: ideaRequest.game_id,
        },
      })
      .catch(() => {
        return Promise.reject(null)
      })

    return Promise.resolve(response.data)
  },
}
