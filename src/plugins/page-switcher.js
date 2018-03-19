var install = function (Vue, options) {
    var router = options.router;
    var root = options.vm;
    console.log(root);
    var defaultForward = options.defaultForward;
    var defaultBackward = options.defaultBackward;
    var pageData = {};

    if (!root.animation) {
        root.$data.animation = '';
    }

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
        data: function() {
            console.log('data');
            return Object.assign(pageData, this.$options.pageData || {});
        },
        beforeCreate() {
            console.log(this.$options);
        },
        created() {
            if (this.$options.type === 'page') {
                // console.log(this.$data);
                // pageData = { age: 26 };
                // Object.keys(pageData).forEach(key => {
                //     if (!(key in this.$data)) {
                //         this.$data[key] = pageData[key];
                //     }
                // })
                // console.log(this.$data);
                // pageData = {};
            }
        },
        mounted() {
            // next(vm => {
                // var vm = this;
                // if (vm.$options.type === 'page') {
                //     console.log(vm);
                //     pageData.age = '26';
                //     vm.setData(pageData);
                //     console.log(vm);
                //     pageData = {};
                // }
            // })
            
        },
        methods: {
            // setData(pageData) {
            //     var pageData = pageData || {};
            //     Object.keys(pageData).forEach(key => {
            //         if (!(key in this.$data)) {
            //             this.$data[key] = pageData[key];
            //         }
            //     });
            // }
        }
    })
};

export default {
    install: install
};