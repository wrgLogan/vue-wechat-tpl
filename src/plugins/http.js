import axios from 'axios';

var Http = function() {
    this.defaultHeaders = {};
    this.apiGroups = { default: '' };

};
//     //添加请求拦截器
// axios.interceptors.request.use(config => {
//     //在发送请求之前做某事，比如说 设置loading动画显示
//     return config
// }, error => {
//     //请求错误时做些事
//     return Promise.reject(error)
// })

// //添加响应拦截器
// axios.interceptors.response.use(response => {
//     //对响应数据做些事，比如说把loading动画关掉
//     return response
// }, error => {
//     //请求错误时做些事
//     return Promise.reject(error)
// })
Http.prototype.get = function(path, domain, opt) {

    if (typeof domain !== 'string') {
        opt = domain;
        domain = 'default';
    }

    var dmStr = this.apiGroups[domain] || this.domain ? this.domain : '';
    return axios.get(`${dmStr + path}`, opt);
};

Http.prototype.post = function(path, domain, opt) {
    if ((typeof domain) !== 'string') {
        opt = domain;
        domain = 'default';
    }

    var dmStr = this.apiGroups[domain] || this.domain ? this.domain : '';
    return axios.post(`${dmStr + path}`, opt);
}

Http.reqPromises = {};

// 接口节流请求 同名同参数的接口在上一个接口请求返回前不会重复请求  新发出的请求直接返回老的请求的promise对象
Http.prototype.spost = function(reqPath, opt) {
    var path = reqPath + JSON.stringify(opt);
    if (Http.reqPromises[path]) {
        return Http.reqPromises[path].promise;
    } else {
        var p = new Promise((resolve, reject) => {
            this.post(`${reqPath}`, opt).then(res => {
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

Http.prototype.setDomain = function(domain) {
    this.domain = domain;
}

Http.prototype.setAppKey = function(appkey) {
    axios.defaults.headers.common.appkey = appkey;
}

Http.prototype.setDefaultHeaders = function (opt) {
    Object.keys(opt).forEach(key => {
        axios.defaults.headers.common[key] = opt[key];
    });
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

            var storageOid = localStorage.getItem('oid');
            var storageOid;
            // if (storageOid && oid == storageOid) {
            //     resolve();
            // } else {
                axios.post('/act/activity/join', {}).then(res => {
                    if ((res.data.returnCode === '200') || (res.data.returnCode === '400' && res.data.returnMsg === '你已参加活动')) {
                        localStorage.setItem('oid', oid);
                        resolve();
                    } else {
                        reject(res.data.returnMsg);
                    }
                });
            // }
        }
    })
    
}

Http.prototype.login = function(appkey) {
    this.setAppKey(appkey);

    return this.joinActivity();

}

// 给axios包了一层，加了domain字段 后台不同服务器的部署会导致domain不一样 比如/rest/v0/getUserInfo /hc/v0/getUserInfo
var install = function(Vue, options) {
    var http = new Http();
    var apiGroups = options.apiGroups;
    Vue.prototype.$http = http;
    Vue.prototype.$lonix = lonix;
    options.appkey && http.setAppKey(options.appkey);
    options.apiGroups && http.setApiGroups(apiGroups);
};

export default {
    install: install
};

var Lonix = function () {
    this.domain = '';
}

Lonix.prototype.setDomain = function(domain) {
    this.domain = domain;
}

Lonix.prototype.get = function (url, params, headers) {
    var xhr = new XMLHttpRequest;

    var url = params ? url + '?' + paramToQueryStr(params) : url;
    
    xhr.open('GET', this.domain + url, true);
    setHeader(xhr, headers);
    xhr.send();

    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var resObj = {
                    data: JSON.parse(xhr.responseText),
                    status: 200
                };
                resolve(resObj);
            } else if (xhr.readyState == 4 && xhr.status == 400) {
                console.log(xhr);   
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

Lonix.prototype.post = function (url, params, options) {
    var xhr = new XMLHttpRequest;
    var url = this.domain + url;
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

function equalOpt(opt1, opt2) {
    if (!(opt1 instanceof Object) || !(opt2 instanceof Object)) {
        return false;
    } else {
        return JSON.stringify(opt1) == JSON.stringify(opt2);
    }
}