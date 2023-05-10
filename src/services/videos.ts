import endpoints from '../constants/endpoints'
import request from '../lib/api/request'
import Cookies from 'js-cookie'

export const VideosAPI = {
  rate: async (
    videoId: string,
    name: string,
    rating: number,
    feedback: string
  ): Promise<boolean> => {
    await request
      .request({
        url: endpoints.videosRateEndpoint,
        method: 'POST',
        data: {
          videoId: videoId,
          name: name,
          rating: rating,
          feedback: feedback,
        },
      })
      .catch(() => {
        return Promise.reject(false)
      })

    return Promise.resolve(true)
  },
}
