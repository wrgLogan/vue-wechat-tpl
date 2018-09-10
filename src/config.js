import shareIcon from '@/assets/image/shareicon.jpg'

var apiDomain = '';  // 默认接口是不带前缀的

// 如果环境是在activitytest，要带有前缀
if (/activitytest/.test(location.origin)) {
    apiDomain = '';  // 前缀放这里
}

var config = {
    defaultShareOption: {
        title: '分享标题',
        desc: '这里是分享的描述',
        imgUrl: shareIcon,
        link: `${location.origin}${location.pathname}`
    },
    apiDomain: apiDomain
}

export default config;