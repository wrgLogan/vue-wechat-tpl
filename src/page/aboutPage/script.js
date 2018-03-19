var link = 'http://activitytest.minshenglife.com/wxtest/index.html?redirect_path=about';
export default {
    name: 'About',
    data: function () {
        var openId = v.$url.parseUrl('openId');
        return {
            message: 'About',
            openId: openId
        }
    },
    shareOption: {
        title: 'About',
        desc: '分享出去打开是about页面',
        link: link,
        imgUrl: 'https://cn.vuejs.org/images/logo.png'
    },
    willEnterPage() {
        console.log('willEnterPage');
    },
    didEnterPage() {
        console.log('didEneterPage')
    },
    mounted (){
        // this.$gallery(`https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=306068080,2400069474&fm=27&gp=0.jpg`)
    },
    methods: {
        authReload() {
            this.$wxsdk.authReload(link, {});
        }
    }
}