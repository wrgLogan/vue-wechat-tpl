import axios from 'axios'
import message from '@/plugins/message.js'
import wxsdk from '@/plugins/wxsdk.js'
import pageDelegate from '@/plugins/pageDelegate.js'
import safeClick from '@/plugins/safeClick.js'
import http from '@/plugins/http.js'

var init = function() {
    Vue.prototype.axios = axios;
    Vue.use(message);
    Vue.use(wxsdk);
    Vue.use(pageDelegate);
    Vue.use(safeClick);
    // Vue.use(http, {domain: '/rest'})
}

export default init;