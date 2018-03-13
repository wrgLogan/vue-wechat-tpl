var install = function(Vue, options) {
    Vue.directive('safeClick', {
        bind: function(el, binding, vnode) {
            // console.log(el, binding, vnode)
            var fn = binding.value.fn;
            var lock = binding.value.lock;
            var params = binding.value.params;

            function open() {
                setTimeout(function() {
                    lock = false;
                });
            }

            el.onclick = function() {
                if (lock) {
                    return;
                };

                lock = true;
                fn(params, open);
            }
        }
    })
}

export default {
    install: install
};