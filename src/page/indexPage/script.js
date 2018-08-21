import BScroll from 'better-scroll'

export default {
    name: 'Index',
    isPage: true,  // 必填项
    Data: {
        list: ['武士','武士','武士','武士','武士','武士','武士','武士','武士','武士','武士','22']
    },
    willEnterPage: function(data) {
    
    },
    mounted() {
        this.$nextTick(() => {
            var w = document.getElementById('wheel');
            
            var wheel = new BScroll(w, {
                wheel: {
                    selectedIndex: 2,
                    wheelWrapperClass: 'wheel-scroll',
                    wheelItemClass: 'wheel-item'
                },
                // swipeTime: 1000,
                observeDOM: false
            })
        })
    },
    didEnterPage(data) {
        
    },
    methods: {
        
    }
}