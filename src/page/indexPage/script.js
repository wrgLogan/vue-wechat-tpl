export default {
    name: 'Index',
    isPage: true,  // 必填项
    title: '首页',
    Data: {
        title: '微信sdk测试'
    },
    willEnterPage: function(data) {
        console.log('will');
    },
    didEnterPage(data) {
        console.log('did')
    },
    methods: {
        onSafeClick: function(params, open) {
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