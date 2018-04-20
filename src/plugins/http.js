import axios from 'axios';

var Http = function () {
    this.defaultHeaders = {};
    this.apiGroups = {default: ''};
}

Http.prototype.get = function (path, domain, opt) {
    if (typeof domain !== 'string') {
        opt = domain;
        domain = 'default';
    }
    var dmStr = this.apiGroups[domain] || '';

    return axios.get(`${dmStr + path}`, opt);
};

Http.prototype.post = function (path, domain, opt) {
    if ((typeof domain) !== 'string') {
        opt = domain;
        domain = 'default';
    }

    var dmStr = this.apiGroups[domain] || '';
    console.log(domain);
    return axios.post(`${dmStr + path}`, opt);
}

Http.prototype.setDomain = function (domain) {
    this.domain = domain;
}

Http.prototype.setAppKey = function (appkey) {
    axios.defaults.headers.common.appkey = appkey;
}

Http.prototype.initDefaultHeaders = function (xhr) {
    var http = this;

    Object.keys(this.defaultHeaders).forEach(key => {
        var val = this.defaultHeaders[key];
        console.log(key, val);
        xhr.setRequestHeader(key, val);
    });
}

Http.prototype.setApiGroups = function(groupParams) {
   
    for (let i = 0, len = groupParams.length; i < len; i++) {
        var params = groupParams[i];

        this.apiGroups[params.domain] = params.path;
    }
}

Http.prototype.joinActivity = function() {

    var oid = parseUrl('oid');

    if (!oid) {
        console.log('没有找到oid');
        return;
    }

    this.setDefaultHeaders({
        oid: oid
    });
    axios.post('act/activity/join', {});
}

// 给axios包了一层，加了domain字段 后台不同服务器的部署会导致domain不一样 比如/rest/v0/getUserInfo /hc/v0/getUserInfo
var install = function (Vue, options) {
    var http = new Http();
    var apiGroups = options.apiGroups;
    Vue.prototype.$http = http;
    options.appkey && http.setAppKey(options.appkey);
    options.apiGroups && http.setApiGroups(options.apiGroups);
    http.joinActivity();
};

export default {
    install: install
};

var Lonix = function() {}

Lonix.prototype.get = function(url, params) {
    var xhr = new XMLHttpRequest;
    var url = url + '?' + paramToQueryStr(params);

    xhr.open('GET', url, true);
    xhr.send();
}

Lonix.prototype.post = function(url, params, options) {
    var xhr = new XMLHttpRequest;
    var url = url;
    var options = options || {};
    var queryStr = paramToQueryStr(params);

    xhr.open('POST', url, true);
    setHeader(xhr, options.headers);
    if (!xhr.contentType) {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    } else if (xhr.contentType === 'application/json') {
        queryStr = JSON.stringify(params);
    }
    xhr.send(queryStr);
}

var lonix = new Lonix;

function setHeader(xhr, header) {
    var header = header || {};
    Object.keys(header).forEach(function(key) {
        var value = header[key];

        if (key === 'Content-Type' || key === 'content-type') {
            xhr.contentType = value;
        }

        xhr.setRequestHeader(key, value);
    })
}

function paramToQueryStr(params) {
    var params = params || {};
    var queryStr = '';

    Object.keys(params).forEach(function(key) {
        var value = params[key];

        if (queryStr.length) {
            queryStr += '&' + key + '=' + value;
        } else {
            queryStr += key + '=' + value;
        };
    });

    return queryStr;
}

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