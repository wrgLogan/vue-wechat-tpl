import 'babel-polyfill';  // 支持es6的primise等api

// 引入swiper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
Vue.component(swiper.name, swiper);
Vue.component(swiperSlide.name, swiperSlide);

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

console.log(3);
// if (window.pageReady) {
  new Vue({
    el: '#app',
    data: {},
    router,
    store,
    template: '<App/>',
    components: { App }
  });
// }
