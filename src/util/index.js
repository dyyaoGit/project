import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/' : './'
})

export const fetch = {
  get (url, data, config) {
    return new Promise((resolve, reject) => {
      instance.get(url, {params: data}, config).then(res => {
        resolve(res)
      })
    })
  },
  post (url, data, config) {
    return new Promise((resolve, reject) => {
      instance.post(url, data, config).then(res => {
        resolve(res)
      })
    })
  }
}

export default {
  axios: fetch
}
