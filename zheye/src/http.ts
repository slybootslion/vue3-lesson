import axios from 'axios'
import store from '@/store'

const icodeCode = '64EAA8C6F3F11FF6'

axios.defaults.baseURL = 'http://apis.imooc.com/api/'

axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  const icode = { icode: icodeCode }
  config.params = { ...config.params, ...icode }
  if (config.data instanceof FormData) {
    config.data.append('icode', icodeCode)
  } else {
    config.data = { ...config.data, ...icode }
  }
  return config
})

axios.interceptors.response.use(response => {
  store.commit('setLoading', false)
  return response
}, err => {
  store.commit('setLoading', false)
  const { error: message } = err.response.data
  store.commit('setError', { status: true, message })
  return Promise.reject(message)
})
