// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import pageSwitcher from './plugins/page-switcher.js'
import './lib/css/transition.css'
import './lib/css/common.css'
import initPlugin from './initPlugin/index.js'

import rem from 'amfe-flexible'

window.Vue = Vue;
window.v = Vue.prototype;
initPlugin();

v.$wxsdk.setDefaultShare({
  title: '首页',
  desc: '默认分享到首页',
  link: 'http://activitytest.minshenglife.com/wxtest/index.html',
  imgUrl: 'https://cn.vuejs.org/images/logo.png'
});

v.$wxsdk.apiTicket('/rest/v1/shares/jsapiticket');

Vue.config.productionTip = false;

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  data: {
    animation: ''
  },
  router,
  template: '<App/>',
  components: { App }
});

Vue.use(pageSwitcher, { router: router, vm: app });