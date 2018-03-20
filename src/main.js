import Vue from 'vue'
import App from './App'
import router from './router'
import './lib/css/transition.css'
import './lib/css/common.css'
import initPlugin from './initPlugin/index.js'
import rem from 'amfe-flexible'

window.Vue = Vue;
window.v = Vue.prototype;
initPlugin();

Vue.config.productionTip = false;
// Vue.config.devtools = false;

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  data: {},
  router,
  template: '<App/>',
  components: { App }
});

// v.$wxsdk.setDefaultShare({
//   title: '首页',
//   desc: '默认分享到首页',
//   link: 'http://activitytest.minshenglife.com/wxtest/index.html',
//   imgUrl: 'https://cn.vuejs.org/images/logo.png'
// });

// v.$wxsdk.apiTicket('/rest/v1/shares/jsapiticket');