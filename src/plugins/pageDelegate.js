import { INSPECT_MAX_BYTES } from "buffer";

var defaultTitle = document.title;
var rendIndex = 0;
var firstMounted = true;

var install = function(Vue, options) {
    var root;
    var router;
    var defaultForward = options && options.defaultForward ? options.defaultForward : 'forward';
    var defaultBackward = options && options.defaultBackward ? options.defaultBackward : 'backward';
    var pageData = {};
    var switchLock = false;

    Vue.prototype.$switchTo = function(path, data, animation) {
        if (switchLock) return;
        switchLock = true;
        var routePath = '';
        if (typeof data === 'object') {
            pageData = data;
        } else if (typeof data === 'string') {
            animation = data;
        }

        root.$data.animation = animation || defaultForward || 'forward';
        routePath = path + objToUrlQuery(pageData);
        router.push(routePath);
        
    };

    Vue.prototype.$goBackward = function(animation) {
        if (switchLock) return;
        switchLock = true;
        root.$data.animation = animation || defaultBackward || 'backward';
        router.back();

        
    };

    Vue.prototype.$replace = function(path, data, animation) {
        if (switchLock) return;
        switchLock = true;
        if (typeof data === 'object') {
            pageData = data;
        } else if (typeof data === 'string') {
            animation = data;
        }

        root.$data.animation = animation || 'fade';
        router.replace(path);
        
    };

    function resetAnimation() {
        // console.log('reset animation');
        return new Promise(resolve => {
            setTimeout(() => {
                root.$data.animation = defaultBackward || 'backward';
                switchLock = false;
                resolve();
            }, 480);    
        });
    }

    /**
     * loadData => beforeRouteEnter
     * willEnterPage 
     * didEnterPage
    */

    Vue.mixin({
        // 每个页面的data是上个页面传递的data和页面的Data组合的值，同名属性该页面的优先级更高
        data: function() {

            if (!this.$options.Data) {
                this.$options.Data = {};
            }
            // console.log(this.$route.query);
            Object.keys(pageData).forEach(key => {
                this.$options.Data[key] = pageData[key];
            });

            Object.keys(this.$route.query).forEach(key => {
                this.$options.Data[key] = this.$route.query[key];
            });

            pageData = {};

            return this.$options.Data;
        },
        beforeCreate: function() {
            rendIndex++;
            // 第二个组件
            if (rendIndex === 2) {
                root = this;
                router = this.$router;
            }
            
            if (root && this.$parent === root) {
                app.page = this;
            }

            
        },
        created: function() {
            pageDelegate(this, pageData => {
                if (this.$options.willEnterPage) {
                    this.$options.willEnterPage.call(this, this.$data);
                }
            });
        },
        beforeMount: function() {
            
        },
        mounted: function() {
            
            pageDelegate(this, pageDate => {
                if ( this.$options.title) {
                    document.title = this.$options.title;
                } else {
                    document.title = defaultTitle;
                };
                
                if (!firstMounted) {
                    
                    resetAnimation().then(() => {
                        if(this.$options.didEnterPage) {
                            this.$options.didEnterPage.call(this, this.$data);
                        };
                    });
                } else {
                    
                    firstMounted = false;
                    setTimeout(() => {
                        if(this.$options.didEnterPage) {
                            this.$options.didEnterPage.call(this, this.$data);
                        };
                    }, 300);
                    
                };
            });
                
        },
        methods: {
            switchTo() {
                var args = Array.prototype.slice.call(arguments);
                return this.$switchTo.apply(this, args);
            },
            goBackward() {
                var args = Array.prototype.slice.call(arguments);
                return this.$goBackward.apply(this, args);
            },
            replace() {
                var args = Array.prototype.slice.call(arguments);
                return this.$replace.apply(this, args);
            }
        },
        watch: {
        
        }
    });

    function pageDelegate(comp, _callback) {
        
        if (comp.$options.isPage) {
            _callback(pageData);
        }
    }

}

export default {
    install: install
};

function objToUrlQuery(params) {
    var search = '';

    Object.keys(params).forEach((key) => {
        var val = params[key];
        if (typeof val === 'number' || typeof val === 'string') {
            if (search.length == 0) {
                search += `?${key}=${encodeURIComponent(val)}`;
            } else {
                search += `&${key}=${encodeURIComponent(val)}`;
            }
        }
    });

    return search;
}

