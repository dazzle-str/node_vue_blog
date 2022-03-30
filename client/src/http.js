import Vue from 'vue'
import router from './router/index.js'
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/'
})

http.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = localStorage.token
  }
  return config
})

http.interceptors.response.use(response => {
  if (response.data.status === 2) {
    Vue.prototype.$message({
      type: 'error',
      message: response.data.message
    })
    localStorage.removeItem('token')
    router.push('/start')
  }
  return response
})

export default http
