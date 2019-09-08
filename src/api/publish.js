import axios from '../utils/axios.config'
import api from '../constant/api'
export function getChannels (params) {
  return axios({
    url: api.API_CHANNELS
  })
}
export function publish (options) {
  return axios(options)
}
export function getArticleById (id) {
  return axios({
    url: `${api.API_ARTICLES}/${id}`
  })
}
