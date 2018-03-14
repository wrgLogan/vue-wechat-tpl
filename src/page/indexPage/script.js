export default {
    name: 'Index',
    data: function () {
        return {
            message: 'Index'
        }
    },
    shareOption: {
         
    },
    didEnterPage() {
        console.log('didEneterPage index')
    },
    methods: {
        onSafeClick: function(params, open) {
            
        },
        switchTo: function(path) {
            this.$switchTo(path);
        },
        hideOuterBrowser: function() {
            this.$wxsdk.hideOuterBrowser();
        },
        openOuterBrowser: function() {
            this.$wxsdk.openOuterBrowser();
        },
        hideShareMemu: function() {
            this.$wxsdk.hideShareMemu();
        },
        configShare: function() {
            this.$wxsdk.configShare();
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