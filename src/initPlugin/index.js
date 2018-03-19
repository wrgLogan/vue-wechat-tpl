import axios from 'axios'
import message from '@/plugins/message.js'
import wxsdk from '@/plugins/wxsdk.js'
import pageDelegate from '@/plugins/pageDelegate.js'
import safeClick from '@/plugins/safeClick.js'
import http from '@/plugins/http.js'
import url from '@/plugins/url.js'


var init = function() {
    Vue.prototype.axios = axios;
    Vue.use(message);
    Vue.use(url);
    Vue.use(wxsdk, { defaultShareVisiable: true });  // 微信sdk封装
    Vue.use(pageDelegate);  // 页面生命周期
    Vue.use(safeClick);  // 防连点
    // Vue.use(http, {domain: '/rest'})
}

export default init;