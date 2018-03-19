var defaultTitle = document.title;

var install = function(Vue, option) {
    Vue.mixin({
        data: function() {
            console.log('data');
            return Object.assign({}, this.$options.pageData || {});
        },
        created: function() {
            if (this.$options.type == 'page' && this.$options.willEnterPage) {
                this.$options.willEnterPage.apply(this);
            }

            if (this.$options.type == 'page') {
                console.log(this.$data);
            }
        },
        mounted: function() {
            if(this.$options.type == 'page' && this.$options.didEnterPage) {
                this.$options.didEnterPage.apply(this);
            };

            if (this.$options.title) {
                document.title = this.$options.title;
            } else {
                document.title = defaultTitle;
            };
        },
        methods: {
            switchTo() {
                var args = Array.prototype.slice.call(arguments);
                return this.$switchTo.apply(this, args);
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