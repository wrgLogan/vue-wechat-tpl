export default {
    name: 'Index',
    isPage: true,  // 必填项
    Data: {
        title: '代理人邀请数排名(老用户)',
        topList: [],
        name: 'looo'
    },
    willEnterPage: function(data) {
        console.log(data);
        // console.log('will');
    },
    didEnterPage(data) {
        // console.log('did')
    },
    methods: {
        
    }
}