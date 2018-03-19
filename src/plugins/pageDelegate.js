var defaultTitle = document.title;

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

            return this.$options.Data;
        },
        beforeCreate: function() {
            if (!root) {
                root = this.$root;
                router = this.$router;
            }

            if (this.$options.type == 'page') {
                console.log('created');
                console.log(this.$data);
            }
        },
        created: function() {
            if (this.$options.type == 'page' && this.$options.willEnterPage) {
                this.$options.willEnterPage.apply(this);
            }

            if (this.$options.type == 'page') {
                console.log('created');
                console.log(this.$data);
            }
        },
        beforeMount: function() {
            if (this.$options.type === 'page') {
                console.log('beforeMount');
                console.log(this.$data);
            }
        },
        mounted: function() {

            if (this.$options.type === 'page') {
                console.log('mounted');
                console.log(this.$data);
            }

            if(this.$options.type == 'page' && this.$options.didEnterPage) {
                this.$options.didEnterPage.apply(this);
            };

            if (this.$options.type === 'page'){
                if ( this.$options.title) {
                    document.title = this.$options.title;
                } else {
                    document.title = defaultTitle;
                };
            }
        },
        methods: {
            switchTo() {
                var args = Array.prototype.slice.call(arguments);
                return this.$switchTo.apply(this, args);
            },
            goBackward() {
                this.$goBackward();
            }
        },
        computed: {
            
        }
    })
}

export default {
    install: install
};