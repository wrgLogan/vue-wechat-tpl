import Vue from 'vue';
import Vuex from 'vuex';
import config from '@/config.js';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        'config': config
    },
    getters: {
        
    },
    mutations: {
        
    }
});