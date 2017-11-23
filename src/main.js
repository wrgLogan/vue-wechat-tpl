// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import pageSwitcher from './plugins/page-switcher.js'
import './assets/css/transition.css'

Vue.prototype.axios = axios;
window.axios = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  data: {
    animation: ''
  },
  router,
  template: '<App/>',
  components: { App }
})

Vue.use(pageSwitcher, { router: router, vm: app });