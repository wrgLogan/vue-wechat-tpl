import axios from 'axios'
import message from '@/plugins/message.js'
import wxsdk from '@/plugins/wxsdk.js'
import pageDelegate from '@/plugins/pageDelegate.js'
import safeClick from '@/plugins/safeClick.js'
import http from '@/plugins/http.js'
import url from '@/plugins/url.js'
import storage from '@/plugins/storage.js'
// import gallery from '@/plugins/gallery.js'
// import actionMonitor from '@/plugins/action-monitor.js'
// import touch from '@/plugins/touch.js'

var init = function() {
    Vue.prototype.axios = axios;
    Vue.use(message);
    Vue.use(url);
    Vue.use(wxsdk, { defaultShareVisiable: true });  // 微信sdk封装
    Vue.use(pageDelegate);  // 页面生命周期,页面间切换的封装，支持页面传值
    Vue.use(safeClick);  // 防连点
    Vue.use(storage);
    Vue.use(http, {apiGroups: [{domain: 'kangebao', path: '/kangebao'}]});
    // Vue.use(gallery);
    // Vue.use(touch);
    // Vue.use(actionMonitor, { paramsArray: [], reqUrl: '/test/monitor' })
}

export default init;