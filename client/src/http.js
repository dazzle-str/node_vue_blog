import Vue from 'vue'
import router from './router/index.js'
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/'
})

http.interceptors.request.use(config => {
  if (localStorage.getItem('userdata')) {
    config.headers.Authorization = JSON.parse(localStorage.getItem('userdata')).token
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
