import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './http.js'
import 'normalize.css'
import './assets/global.css'
import './plugins/element.js'

Vue.config.productionTip = false

Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
