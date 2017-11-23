var install = function (Vue, options) {
    var router = options.router;
    var root = options.vm;
    var defaultForward = options.defaultForward;
    var defaultBackward = options.defaultBackward;

    if (!root.animation) {
        root.$data.animation = '';
    }

    Vue.prototype.$switchTo = function(path, animation) {
        console.log(router);
        root.$data.animation = animation || defaultForward || 'forward';
        router.push(path);
    };

    Vue.prototype.$goBackward = function(animation) {
        root.$data.animation = animation || defaultBackward || 'backward';
        router.back();
    };
};

export default {
    install: install
};