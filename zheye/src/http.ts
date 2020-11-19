import axios from 'axios'
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  const icode = { icode: '64EAA8C6F3F11FF6' }
  config.params = { ...config.params, ...icode }
  if (config.data instanceof FormData) {
    config.data.append('icode', '64EAA8C6F3F11FF6')
  } else {
    config.data = { ...config.data, ...icode }
  }
  return config
})
