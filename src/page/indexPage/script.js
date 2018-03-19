export default {
    name: 'Index',
    data: function () {
        return {
            message: 'Index'
        }
    },
    shareOption: {
         
    },
    beforeRouteEnter(to, from, next) {
        console.log('beforeRouteEnter -> index');
        next();
    },
    didEnterPage() {
        console.log('didEneterPage index')
    },
    methods: {
        onSafeClick: function(params, open) {
            console.log(params);
            setTimeout(() => {
                open();
            }, 1000)
        },
        hideOuterBrowser: function() {
            this.$wxsdk.hideOuterBrowser();
        },
        openOuterBrowser: function() {
            this.$wxsdk.openOuterBrowser();
        },
        hideShareMemu: function() {
            this.$wxsdk.hideShareMenu();
        },
        configShare: function() {
            this.$wxsdk.openShareMenu();
        },
        openDebug: function() {
            this.$wxsdk.configOptions.debug = true;
            this.$wxsdk.configWxApis();
        },
        closeDebug: function() {
            this.$wxsdk.configOptions.debug = false;
            this.$wxsdk.configWxApis();
        }
    }
}