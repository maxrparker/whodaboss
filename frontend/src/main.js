import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use({
    install (Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: 'http://localhost:3000'
    })
  }
})


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
