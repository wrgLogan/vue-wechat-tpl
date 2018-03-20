var defaultTitle = document.title;
var rendIndex = 0;
var install = function(Vue, options) {
    var root;
    var router;
    var defaultForward = options && options.defaultForward ? options.defaultForward : 'forward';
    var defaultBackward = options && options.defaultBackward ? options.defaultBackward : 'backward';
    var pageData = {};

    Vue.prototype.$switchTo = function(path, data, animation) {
        
        if (typeof data === 'object') {
            pageData = data;
        } else if (typeof data === 'string') {
            animation = data;
        }

        root.$data.animation = animation || defaultForward || 'forward';
        router.push(path);
        setTimeout(() => {
            root.$data.animation = defaultBackward || 'backward';
        }, 300);
    };

    Vue.prototype.$goBackward = function(animation) {
        root.$data.animation = animation || defaultBackward || 'backward';
        router.back();
    };

    Vue.prototype.$replace = function(path, data, animation) {
        
        if (typeof data === 'object') {
            pageData = data;
        } else if (typeof data === 'string') {
            animation = data;
        }

        root.$data.animation = animation || 'fade';
        router.replace(path);
        setTimeout(() => {
            root.$data.animation = defaultBackward || 'backward';
        }, 300);
    };

    Vue.mixin({
        // 每个页面的data是上个页面传递的data和页面的Data组合的值，同名属性该页面的优先级更高
        data: function() {

            if (!this.$options.Data) {
                this.$options.Data = {};
            }

            Object.keys(pageData).forEach(key => {
                // if (!(key in this.$options.Data) || !this.$options.Data[key]) {
                    this.$options.Data[key] = pageData[key];
                // }
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

            if (this.$options.type == 'page') {
                // console.log('beforeCreat');
                // console.log(this.$data);
            }
        },
        created: function() {

            if (this.$options.type == 'page') {
                
            }
        },
        beforeMount: function() {
            if (this.$options.type === 'page') {
                if (this.$options.willEnterPage) {
                    this.$options.willEnterPage.apply(this);
                }

            }
        },
        mounted: function() {

            if (this.$options.type === 'page'){
                if ( this.$options.title) {
                    document.title = this.$options.title;
                } else {
                    document.title = defaultTitle;
                };

                if(this.$options.didEnterPage) {
                    this.$options.didEnterPage.apply(this);
                };
            }
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
        }
    })
}

export default {
    install: install
};