import shareIcon from '@/assets/image/shareicon.jpg'

var config = {
    // appkey: '4afb5995d2844d85b8d6982bf46dcbfd',  // 与后端约定好的key
    defaultShareOption: {
        title: '分享标题',
        desc: '这里是分享的描述',
        imgUrl: shareIcon,
        link: `${location.origin}${location.pathname}?redirect_path=feeling`
    },
    apiDomain: ''
}

export default config;