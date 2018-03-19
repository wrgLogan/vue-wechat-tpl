import axios from 'axios';

var devRedirectUri = 'http://healthtest.minshenglife.com/rest/v0/winxinoauth/lianjiaopenid';
var prodRedirectUri = 'http://health.minshenglife.com/rest/v0/winxinoauth/lianjiaopenid';

var WxSdk = function(options) {
    var options = options || {};

    this.jsApiList = null;
    this.configOptions = null; // 微信初始化配置项
    this.configIsReady = false;
    this.authUrl = null;
    this.redirectUri = env === 'dev' ? devRedirectUri : prodRedirectUri;
    this.shareMenuVisiable = true;
    this.defaultShareVisiable = options.defaultShareVisiable === false ? false : true;
    this.readyFnList = [];
}

// 默认开启所有接口
WxSdk.prototype.defaultJsApiList = [
    "openEnterpriseChat",
    "openEnterpriseContact",
    "onMenuShareTimeline",    // 分享到朋友圈
    "onMenuShareAppMessage",  // 分享给好友
    "onMenuShareQQ",
    "onMenuShareWeibo",
    "onMenuShareQZone",
    "startRecord",
    "stopRecord",
    "onVoiceRecordEnd",
    "playVoice",
    "pauseVoice",
    "stopVoice",
    "onVoicePlayEnd",
    "uploadVoice",
    "downloadVoice",
    "chooseImage",
    "previewImage",
    "uploadImage",
    "downloadImage",
    "translateVoice",
    "getNetworkType",
    "openLocation",
    "getLocation",
    "hideOptionMenu",
    "showOptionMenu",
    "hideMenuItems",  // 隐藏菜单
    "showMenuItems",  // 打开菜单
    "hideAllNonBaseMenuItem", // 隐藏所有菜单
    "showAllNonBaseMenuItem", // 打开所有菜单
    "closeWindow",
    "scanQRCode"
]

WxSdk.prototype.apiTicket = function(url) {
    var wxsdk = this;
    var data = window.location.origin + location.pathname + location.search;
    
    axios.post(url, {data: data}).then(res => {
        var data = res.data;
        
        if (data.appId) {
            wxsdk.configOptions = data;
            this.configOptions.debug = false;
            wxsdk.configWxApis();
        }
    });
}

WxSdk.prototype.configWxApis = function() {
    var wxsdk = this;
    var jsApiList = this.jsApiList || this.defaultJsApiList;
    this.configOptions.jsApiList = jsApiList;

    console.log('配置微信初始化');
    
    wx.config({
        debug: this.configOptions.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.configOptions.appId, // 必填，公众号的唯一标识
        timestamp: this.configOptions.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.configOptions.noncestr, // 必填，生成签名的随机串
        signature: this.configOptions.sign,// 必填，签名，见附录1
        jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(() => {
        wxsdk.ready();
    });
}

WxSdk.prototype.ready = function() {

    while(this.readyFnList.length > 0) {
        var fn = this.readyFnList.shift();
        fn.apply(this);
    }

    this.configIsReady = true;
}

WxSdk.prototype.onReady = function(fn) {
    if (this.configIsReady) {
        fn.apply(this);
    } else {
        this.readyFnList.push(fn);
    }
}

// 配置默认分享
WxSdk.prototype.setDefaultShare = function(option) {
    this.defaultShareOption = option;
}

// 设置分享
WxSdk.prototype.configShare = function(option) {

    var wxsdk = this;
    var option = option || {};

    var title = option.title || this.defaultShareOption.title,
        desc = option.desc || this.defaultShareOption.desc,
        link = option.link || this.defaultShareOption.link,
        imgUrl = option.imgUrl || this.defaultShareOption.imgUrl;

    console.log('配置分享');
    console.log(title);

    wxsdk.onReady(() => {
        setShare();
    })

    function setShare() {
        console.log('set share');
        wx.onMenuShareAppMessage({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            success: function() {
                wxsdk.onShareSuccess && wxsdk.onShareSuccess('appMessage');
            },
            cancel: function() {
                wxsdk.onShareCancel && wxsdk.onShareCancel('appMessage');
            }
        });
    
        wx.onMenuShareTimeline({
            title: title,
            link: link,
            imgUrl: imgUrl,
            success: function() {
                wxsdk.onShareSuccess && wxsdk.onShareSuccess('timeline');
            },
            cancel: function() {
                wxsdk.onShareCancel && wxsdk.onShareCancel('timeline');
            }
        });
    
    }
    
}

WxSdk.prototype.openShareMenu = function() {
    this.onReady(function() {
        console.log('open share menu');
        this.shareMenuVisiable = true;
        wx.showMenuItems({
            menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:facebook', 'menuItem:share:QZone'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
    });
}

// 关闭分享菜单
WxSdk.prototype.hideShareMenu = function() {
    this.onReady(function() {
        console.log('hide share menu');
        this.shareMenuVisiable = false;
        wx.hideMenuItems({
            menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:facebook', 'menuItem:share:QZone'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
    });
}

// 关闭别的浏览器打开
WxSdk.prototype.hideOuterBrowser = function() {
    this.onReady(function() {
        wx.hideMenuItems({
            menuList: ['menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:copyUrl']
        });
    });
}

// 打开在别的浏览器打开菜单
WxSdk.prototype.openOuterBrowser = function() {
    this.onReady(function() {
        wx.showMenuItems({
            menuList: ['menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:copyUrl']
        });
    });
}

WxSdk.prototype.authReload = function(url, params) {
    var wxsdk = this;
    var url = url || '';

    Object.keys(params).forEach(function(key, index) {
        var value = params[key];

        if (index === 0) {
            url += `?${key}=${value}`;
        } else {
            url += `&${key}=${value}`;
        };
    });
    // 配置授权链接
    var authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxsdk.configOptions.appId}&redirect_uri=${wxsdk.redirectUri}&response_type=code&scope=snsapi_userinfo&state=${url}#wechat_redirect`;

    // console.log(url, authUrl);
    window.location.href = authUrl;
}

var install = function(Vue, options) {
    var wxsdk = new WxSdk(options);
    Vue.prototype.$wxsdk = wxsdk;

    Vue.mixin({
        beforeRouteEnter(to, from, next) {
            var redirectPath = parseUrl('redirect_path');

            if (redirectPath) {
                var url = deleteUrlQuery('redirect_path');
                window.location.href = url + `#/${redirectPath}`;
            } else {
                next();
            }
        },
        mounted: function() {
            if(this.$options.type == 'page') {
                if (this.$options.shareOption) {
                    wxsdk.configShare(this.$options.shareOption);
                    wxsdk.openShareMenu();
                } else if (wxsdk.defaultShareVisiable === true) {
                    wxsdk.configShare(wxsdk.defaultShareOption);
                    wxsdk.openShareMenu();
                } else {
                    wxsdk.hideShareMemu();
                }
            }
        }
    })
}

export default {
    install: install
};

// `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3d9f8ae1546fdea0&`
// `redirect_uri=http://healthtest.minshenglife.com/rest/v0/winxinoauth/lianjiaopenid&response_type=code&scope=snsapi_userinfo&`
// `state=http://activitytest.minshenglife.com/lottery/index.html?isShare=true&redirect_path=#wechat_redirect`

function parseUrl(queryKey) {
    var search = location.search;

    if (search.length > 0 && search.indexOf('?') > -1) {
        search = search.substring(1);
        var cArr = search.split('&');

        for (var i = 0, len = cArr.length; i < len; i++) {
            var item = cArr[i],
                key = cArr[i].split('=')[0],
                val = cArr[i].split('=')[1];

            if (key === queryKey) {
                return val;
            }
        }
    }

    return null;
}

function deleteUrlQuery(queryKey) {
    var search = location.search;
    var resSearch = '';
    var queryArr = [].concat(queryKey);

    if (search.length > 0 && search.indexOf('?') > -1) {
        search = search.substring(1);
        var cArr = search.split('&');

        for (var i = 0, len = cArr.length; i < len; i++) {
            var item = cArr[i],
                key = cArr[i].split('=')[0],
                val = cArr[i].split('=')[1];

            if (queryArr.indexOf(key) === -1) {
                if (resSearch.length == 0) {
                    resSearch += `?${key}=${val}`;
                } else {
                    resSearch += `&${key}=${val}`;
                }
            } 
        }
    }

    return location.origin + location.pathname + resSearch;
}

function insertUrlQuery(params) {
    var search = location.search;

    Object.keys(params).forEach((key) => {
        var val = params[key];

        if (search.length == 0) {
            search += `?${key}=${val}`;
        } else {
            search += `&${key}=${val}`;
        }
    });

    return location.origin + location.pathname + search;
}