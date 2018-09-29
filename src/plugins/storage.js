/**
 * 封装了sessionStorage localStorage
 * this.$sessionStorage.setItem('example', {});
 * this.$sessionStorage.getItem('example');
 * */ 
var install = function(Vue, options) {
    var options = options || {};
    var scope = options.scope || '';
    window.sessionStorage.clear();
    Vue.prototype.$sessionStorage = {
        'setItem': function(key, value) {
            key = scope + '-' + key;
            if (typeof value === 'string') {
                var valueStr = value;
            } else {
                var valueStr = JSON.stringify(value);
            }
            
            sessionStorage.setItem(key, valueStr);
        },
        'getItem': function(key) {
            key = scope + '-' + key;
            var value = sessionStorage.getItem(key);
            var obj = null;
            
            try{
                obj = JSON.parse(value);
            } catch(e) {
                // console.log(e);
                obj = value;
            }
            return obj;
        },
        'clear': function() {
            sessionStorage.clear();
        }
    }
    Vue.prototype.$localStorage = {
        'setItem': function(key, value) {
            key = scope + '-' + key;
            if (typeof value === 'string') {
                var valueStr = value;
            } else {
                var valueStr = JSON.stringify(value);
            }
            localStorage.setItem(key, valueStr);
        },
        'getItem': function(key) {
            key = scope + '-' + key;
            var value = localStorage.getItem(key);
            var obj = null;
            try{
                obj = JSON.parse(value);
            } catch(e) {
                obj = value;
            }
            return obj;
        },
        'clear': function() {
            localStorage.clear();
        }
    }
}
export default {
    install: install
}