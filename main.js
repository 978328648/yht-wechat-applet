import App from './App'
import store from './store'
import utils from '@/utils/utils.js'
import {http} from './utils/http.js'
Vue.prototype.$store = store
Vue.prototype.$utils = utils.utils
Vue.prototype.$http = http 


// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif