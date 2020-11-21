import axios from 'axios'
import store from '@/store'

axios.defaults.baseURL = 'http://apis.imooc.com/api/'

axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  const icode = { icode: '64EAA8C6F3F11FF6' }
  config.params = { ...config.params, ...icode }
  if (config.data instanceof FormData) {
    config.data.append('icode', '64EAA8C6F3F11FF6')
  } else {
    config.data = { ...config.data, ...icode }
  }
  return config
})

axios.interceptors.response.use(response => {
  store.commit('setLoading', false)
  return response
}, err => {
  const { error: message } = err.response.data
  store.commit('setError', { status: true, message })
  store.commit('setLoading', false)
  return Promise.reject(message)
})
