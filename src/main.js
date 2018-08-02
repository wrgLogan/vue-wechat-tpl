import Vue from 'vue'
import App from './App'
import router from './router'
import './lib/css/transition.css'
import './lib/css/common.css'
import initPlugin from './initPlugin/index.js'
import rem from 'amfe-flexible'
import store from './vuex/index.js'
import config from '@/config.js'

window.Vue = Vue;
window.v = Vue.prototype;
initPlugin();

Vue.config.productionTip = false;

v.$wxsdk.apiTicket('/act/wechat/shares/sign');
v.$wxsdk.setDefaultShare(config.defaultShareOption);
v.$wxsdk.onReady(() => {});

v.$http.setDomain(config.apiDomain);
v.$lonix.setDomain(config.apiDomain);

new Vue({
  el: '#app',
  data: {},
  router,
  store,
  template: '<App/>',
  components: { App }
});