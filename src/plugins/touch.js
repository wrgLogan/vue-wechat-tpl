/**
 * 移动端touch事件
 * 支持四个方向（touchup, touchdown, touchleft, touchright）
 * <div v-touchleft="{ fn: onTouchleft, params: params }"></div>
 * 
 * {
 *     data: { params: {} },
 *     methods: onTouchleft(params) {
 *         console.log('touch left');
 *     }
 * }
*/

let isSupportTouch = "ontouchend" in document ? true : false;
let touchEvent = {
    'start': isSupportTouch ? 'touchstart' : 'mousedown',
    'end': isSupportTouch ? 'touchend' : 'mouseup',
    'move': isSupportTouch ? 'touchmove' : 'mousemove'
}

var install = function(Vue, options) {
    Vue.directive('touchleft', {
        bind: function(el, binding, vnode) {
            // console.log(el, binding, vnode)
            var fn = binding.value.fn;
            var params = binding.value.params;
            var startX = null;
            var endX = null;
            var duration = 0;

            // touch start
            el.addEventListener(touchEvent.start, evt => {
                let touch = evt.targetTouches[0];
                startX = touch.clientX;
                endX = touch.clientX;
                duration = Date.now();
            });

            el.addEventListener(touchEvent.move, evt => {
                let touch = evt.targetTouches[0];
                endX = touch.clientX;
            });

            el.addEventListener(touchEvent.end, evt => {
                let touch = evt.targetTouches[0];

                var diffVal = endX - startX;
                duration = Date.now() - duration;
                console.log(diffVal, Math.abs(diffVal) / duration);
                if (diffVal < 0 && Math.abs(diffVal) / duration > 0.5) {
                    fn && fn(params);
                }
            });
            
        }
    }),
    Vue.directive('touchright', {
        bind: function(el, binding, vnode) {
            // console.log(el, binding, vnode)
            var fn = binding.value.fn;
            var params = binding.value.params;
            var startX = null;
            var endX = null;
            var duration = 0;

            // touch start
            el.addEventListener(touchEvent.start, evt => {
                let touch = evt.targetTouches[0];
                startX = touch.clientX;
                endX = touch.clientX;
                duration = Date.now();
            });

            el.addEventListener(touchEvent.move, evt => {
                let touch = evt.targetTouches[0];
                endX = touch.clientX;
            });

            el.addEventListener(touchEvent.end, evt => {
                let touch = evt.targetTouches[0];

                var diffVal = endX - startX;
                duration = Date.now() - duration;
                console.log(diffVal > 0, Math.abs(diffVal) / duration);
                if (diffVal > 0 && Math.abs(diffVal) / duration > 0.5) {
                    fn && fn(params);
                }
            });
            
        }
    });

    Vue.directive('touchup', {
        bind: function(el, binding, vnode) {
            // console.log(el, binding, vnode)
            var fn = binding.value.fn;
            var params = binding.value.params;
            var startY = null;
            var endY = null;
            var duration = 0;

            // touch start
            el.addEventListener(touchEvent.start, evt => {
                let touch = evt.targetTouches[0];
                startY = touch.clientY;
                endY = touch.clientY;
                duration = Date.now();
                
            });

            el.addEventListener(touchEvent.move, evt => {
                let touch = evt.targetTouches[0];
                endY = touch.clientY;
            });

            el.addEventListener(touchEvent.end, evt => {
                let touch = evt.targetTouches[0];

                var diffVal = endY - startY;
                duration = Date.now() - duration;
                if (diffVal < 0 && Math.abs(diffVal) / duration > 0.8) {
                    fn && fn(params);
                }
            });
            
        }
    });

    Vue.directive('touchdown', {
        bind: function(el, binding, vnode) {
            // console.log(el, binding, vnode)
            var fn = binding.value.fn;
            var params = binding.value.params;
            var startY = null;
            var endY = null;
            var duration = 0;

            // touch start
            el.addEventListener(touchEvent.start, evt => {
                let touch = evt.targetTouches[0];
                startY = touch.clientY;
                endY = touch.clientY;
                duration = Date.now();
            });

            el.addEventListener(touchEvent.move, evt => {
                let touch = evt.targetTouches[0];
                endY = touch.clientY;
            });

            el.addEventListener(touchEvent.end, evt => {
                let touch = evt.targetTouches[0];

                var diffVal = endY - startY;
                duration = Date.now() - duration;
                if (diffVal > 0 && Math.abs(diffVal) / duration > 0.6) {
                    fn && fn(params);
                }
            });
            
        }
    });
}

export default {
    install: install
};