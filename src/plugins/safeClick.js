/**
 * 防止连点
 * <button v-safeClick="{fn: safeClick, params: {name: 'logan'}}"></button>
 * export defaults {
 *     methods: {
 *         safeClick: function(params, open) {
 *             // 方法一旦调用会锁住，调用open解开
 *              open();
 *         }
 *     }
 * }
*/

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
                }, 300);
            };

            el.onclick = function() {
                if (lock) {
                    return;
                };

                lock = true;
                fn(params, open);
            };
        }
    })
}

export default {
    install: install
};