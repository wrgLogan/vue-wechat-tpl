import { uuid, deepAssign } from '@/common/helpers/utils'
import { $localStorage } from '@/common/helpers/storage'
import config from '@/config.js'

var defaultTitle = document.title;
var rendIndex = 0;
var firstMounted = true;

var install = function(Vue, options) {
    var root;
    var router;
    var defaultForward = options && options.defaultForward ? options.defaultForward : 'forward';
    var forwardAnimation = null;
    var backwardAnimation = null;
    var defaultBackward = options && options.defaultBackward ? options.defaultBackward : 'backward';
    var pageData = {};
    var switchLock = false;

    clearObjStorage();

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
        forwardAnimation = animation;
        routePath = path + objToUrlQuery(pageData);
        router.push(routePath);
    };

    Vue.prototype.$goBackward = function(animation) {
        if (switchLock) return;
        switchLock = true;
        root.$data.animation = animation || defaultBackward || 'backward';
        backwardAnimation = animation;
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
    var setTitleLock = false;

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

            if (this.$route && this.$options.isPage) {
                Object.keys(this.$route.query).forEach(key => {
                    if (key === 'objKeys') {
                        var objKeys = this.$route.query[key].split('-');
                        
                        objKeys.forEach(objKey => {
                            var storageObj = $localStorage.getItem('storageObj');
                            var obj = storageObj[objKey];
                            obj = obj ? obj : {};
                            deepAssign(this.$options.Data, obj);
                        });
                    } else {
                        // console.log(this.$route.query[key]);
                        this.$options.Data[key] = this.$route.query[key];
                    }
                });
            }

            pageData = {};

            return this.$options.Data;
        },
        beforeRouteEnter: function(to, from, next) {
            next();
        },
        beforeCreate: function() {

            rendIndex++;
            // 第二个组件
            if (rendIndex === 2) {
                root = this;
                router = this.$router;
                router.push = function(location, onComplete, onAbort) {
                    root.$data.animation = forwardAnimation || defaultForward;
                    setTimeout(() => {
                        forwardAnimation = null;
                    }, 300);
                    this.history.push(location, onComplete, onAbort);
                }
            }
            
            if (root && this.$parent === root) {
                app.page = this;

                if (window.history && window.history.pushState) {                             
                    window.addEventListener('popstate', function (v) {                                            
                        root.$data.animation = backwardAnimation || defaultBackward; 
                        setTimeout(() => {
                            backwardAnimation = null;
                        }, 300); 
                        // setTimeout(() => {
                        //     history.pushState(null, null, location.search + location.hash);
                        // }, 300)                          
                    });
                }
            }
            
        },
        created: function() {
            
            pageDelegate(this, pageData => {
                if (this.$options.willEnterPage) {
                    this.$options.willEnterPage.call(this, this.$data);

                    // if (lastHistoryLength < history.length) {
                    //     root.$data.animation = defaultForward;
                    // } else {
                    //     root.$data.animation = defaultBackward;
                    // };

                    // lastHistoryLength = history.length;
                }
            });
        },
        beforeMount: function() {
            
        },
        mounted: function() {
            pageDelegate(this, pageDate => {
                
                
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

                if (setTitleLock) return;

                if ( this.$options.title) {
                    document.title = this.$options.title;
                } else if (config.projectTitle) {
                    document.title = config.projectTitle;
                } else {
                    document.title = defaultTitle;
                };

                setTimeout(() => {
                    setTitleLock = false;
                }, 200)
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
    var storageObj = $localStorage.getItem('storageObj') || {};
    var search = '';
    var objKeys = [];

    Object.keys(params).forEach((key) => {
        var val = params[key];
        if (typeof val === 'number' || typeof val === 'string') {
            if (search.length == 0) {
                search += `?${key}=${encodeURIComponent(val)}`;
            } else {
                search += `&${key}=${encodeURIComponent(val)}`;
            }
        } else if (typeof val === 'object') {

            var objId = '';
            // Object.keys(storageObj).forEach(key => {
            //     var objStr = JSON.stringify(storageObj[key]);
            //     if (objStr == JSON.stringify(val)) {
            //         objId = key;
            //         objKeys.push(key);
            //     }
            // })

            objId = uuid(10);
            objKeys.push(objId);
            var obj = {};
            obj[key] = val;
            storageObj[objId] = obj;
            $localStorage.setItem('storageObj', storageObj);
        }
    });
    if (objKeys.length > 0) {
        if (search.length === 0) {
            search += `?objKeys=${objKeys.join('-')}`
        } else {
            search += `&objKeys=${objKeys.join('-')}`
        }
    }
    

    return search;
}

function clearObjStorage() {
    if (history && history.length == 1) {
        $localStorage.setItem('storageObj', {});
    }
}