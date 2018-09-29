import axios from 'axios'

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

//处理微信分享页面的图片url问题
//webpack的url-loader里图片大小，小于10kB的是base64格式，大于10kB的是./static/格式
function handleLocalImgUrl(url) {
    url = url + '';
    //服务器绝对路径
    if (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1) {
        return url;
    }
    //本地图片
    if (url.indexOf('data:image') !== -1) {
        // base64 图片操作
        return url;
    } else {
        //path 图片操作
        let u = location.origin + location.pathname;
        let lastIndex = u.lastIndexOf('/');
        let imgUrlOri = u.slice(0, lastIndex);

        if (url[0] == '.') {
            return imgUrlOri + url.slice(1);
        } else {
            return imgUrlOri + url;
        }
        
    }
}

// 获取URL
function getQueryStrDecode(key, callback) {
    // 获取url上的query
    var val = parseUrl(key);
    // alert(val);
    if (!val) {
        callback && callback(val);
        return ;
    };

    var url = 'http://test.msjk95596.com/act/wechat/decrypt';

    if (/health\./.test(location.origin)) { 
        url = 'http://www.msjk95596.com/act/wechat/decrypt';
    } else {
        url = 'http://test.msjk95596.com/act/wechat/decrypt';
    }
    
    // 调取接口解密数据
    axios.post(url, {oid: val}).then(res => {
        // alert(JSON.stringify(res));
        if (res.data.returnCode == '200') {
            callback && callback(res.data.value);
        } else {
            callback && callback(null);
            console.log(res.data.returnMsg);
        }
    }).catch(err => {
        callback && callback(null);
        console.log(err);
    })
}

var install = function(Vue, options) {
    Vue.prototype.$url = {
        parseUrl: parseUrl,
        deleteUrlQuery: deleteUrlQuery,
        insertUrlQuery: insertUrlQuery,
        handleLocalImgUrl: handleLocalImgUrl,
        getQueryStrDecode: getQueryStrDecode
    }
}

export default {
    install: install
}