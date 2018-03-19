var install = function(Vue, option) {
    Vue.mixin({
        created: function() {
            if (this.$options.type == 'page' && this.$options.willEnterPage) {
                this.$options.willEnterPage.apply(this);
            }
        },
        mounted: function() {
            if(this.$options.type == 'page' && this.$options.didEnterPage) {
                this.$options.didEnterPage.apply(this);
            }
        },
        methods: {
            switchTo(path) {
                this.$switchTo(path);
            },
            goBackward() {
                this.$goBackward();
            }
        }
    })
}

export default {
    install: install
};