import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './http.js'
import 'normalize.css'
import './assets/global.css'
import './plugins/element.js'
import './index.css'

Vue.config.productionTip = false

Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
