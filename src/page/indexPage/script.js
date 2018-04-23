export default {
    name: 'Index',
    isPage: true,  // 必填项
    Data: {
        title: '微信sdk测试'
    },
    willEnterPage: function(data) {
        // console.log('will');
    },
    didEnterPage(data) {
        // console.log('did')
    },
    methods: {
        onTouchleft() {
            console.log('touch left');
            this.$message.success('touch left');
        },
        onTouchright() {
            console.log('touch right');
            this.$message.success('touch right');
        },
        onTouchup() {
            console.log('touch up');
            this.$message.success('touch up');
        },
        onTouchdown() {
            console.log('touch down');
            this.$message.success('touch down');
        }
    }
}