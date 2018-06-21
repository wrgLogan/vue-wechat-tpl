import axios from 'axios';

var Http = function () {
    this.defaultHeaders = {};
    this.apiGroups = { default: '' };
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

Http.reqPromises = {};

// 接口节流请求 同名同参数的接口在上一个接口请求返回前不会重复请求  新发出的请求直接返回老的请求的promise对象
Http.prototype.spost = function (reqPath, opt) {
    var path = reqPath + JSON.stringify(opt);

    if (Http.reqPromises[path]) {
        return Http.reqPromises[path].promise;
    } else {
        var p = new Promise((resolve, reject) => {
            axios.post(`${reqPath}`, opt).then(res => {
                Http.reqPromises[path] = null;
                resolve(res);
            }).catch(err => {
                Http.reqPromises[path] = null;
                reject(err);
            });
        });

        Http.reqPromises[path] = {
            opt: opt,
            promise: p
        };

        return p;
    }
};

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

Http.prototype.setApiGroups = function (groupParams) {

    for (let i = 0, len = groupParams.length; i < len; i++) {
        var params = groupParams[i];

        this.apiGroups[params.domain] = params.path;
    }
}

Http.prototype.joinActivity = function () {

    return new Promise((resolve, reject) => {
        var oid = parseUrl('oid');

        if (!oid) {
            reject('没有找到oid');
            return;
        } else {
            this.setDefaultHeaders({
                oid: oid
            });

            var storageOid = sessionStorage.getItem('oid');
            var storageOid;
            if (storageOid && oid == storageOid) {
                resolve();
            } else {
                axios.post('/act/activity/join', {}).then(res => {
                    if ((res.data.returnCode === '200') || (res.data.returnCode === '400' && res.data.returnMsg === '你已参加活动')) {
                        sessionStorage.setItem('oid', oid);
                        resolve();
                    } else {
                        reject(res.data.returnMsg);
                    }
                });
            }
        }
    });
}

Http.prototype.login = function (appkey) {
    this.setAppKey(appkey);
    return this.joinActivity();
}

// 给axios包了一层，加了domain字段 后台不同服务器的部署会导致domain不一样 比如/rest/v0/getUserInfo /hc/v0/getUserInfo
var install = function (Vue, options) {
    var http = new Http();
    // var apiGroups = options.apiGroups;
    Vue.prototype.$http = http;
    Vue.prototype.$lonix = lonix;
    // options.appkey && http.setAppKey(options.appkey);
    // options.apiGroups && http.setApiGroups(options.apiGroups);
    // http.joinActivity();
};

export default {
    install: install
};

var Lonix = function () { }

Lonix.prototype.get = function (url, params) {
    var xhr = new XMLHttpRequest;
    var url = url + '?' + paramToQueryStr(params);

    xhr.open('GET', url, true);
    xhr.send();
}

Lonix.prototype.post = function (url, params, options) {
    var xhr = new XMLHttpRequest;
    var url = url;
    var options = options || {};
    var queryStr = paramToQueryStr(params);

    xhr.open('POST', url, true);
    setHeader(xhr, options.headers);
    if (!xhr.contentType) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        queryStr = JSON.stringify(params);
    } else if (xhr.contentType === 'application/json') {
        queryStr = JSON.stringify(params);
    }
    xhr.send(queryStr);

    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var resObj = {
                    data: JSON.parse(xhr.responseText),
                    status: 200
                };
                resolve(resObj);
            } else if (xhr.readyState == 4 && xhr.status == 400) {
                
                var errObj = {};
                try {
                    errObj = JSON.parse(xhr.responseText);
                } catch(e) {
                    reject(e);
                };

                resolve({
                    data: errObj,
                    status: 400
                });
            }
        }
    })
    
}

var lonix = new Lonix;

function setHeader(xhr, header) {
    var header = header || {};
    Object.keys(header).forEach(function (key) {
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

    Object.keys(params).forEach(function (key) {
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