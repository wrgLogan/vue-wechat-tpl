var install = function (Vue, options) {
    var router = options.router;
    var root = options.vm;
    var defaultForward = options.defaultForward;
    var defaultBackward = options.defaultBackward;

    if (!root.animation) {
        root.$data.animation = '';
    }

    Vue.prototype.$switchTo = function(path, animation) {
        
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

    Vue.prototype.$replace = function(path, animation) {
        
        root.$data.animation = animation || 'fade';
        router.replace(path);
        setTimeout(() => {
            root.$data.animation = defaultBackward || 'backward';
        }, 300);
    };
};

export default {
    install: install
};