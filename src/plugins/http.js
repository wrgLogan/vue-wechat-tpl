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
    setHeader(xhr, options.header);
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

// 给axios包了一层，加了domain字段 后台不同服务器的部署会导致domain不一样 比如/rest/v0/getUserInfo /hc/v0/getUserInfo
var install = function (Vue, options) {
    var axios = options.axios;

    var Http = function (domain) {
        this.domain = domain || '';
        this.defaultHeaders = {};
    }

    Http.prototype.get = function (path, opt) {
        return axios.get(`${this.domain + path}`, opt);
    };

    Http.prototype.post = function (path, opt) {
        return axios.post(`${this.domain + path}`, opt);
    }

    Http.prototype.setDomain = function (domain) {
        this.domain = domain;
    }

    Http.prototype.initDefaultHeaders = function (xhr) {
        var http = this;

        Object.keys(this.defaultHeaders).forEach(key => {
            var val = this.defaultHeaders[key];
            console.log(key, val);
            xhr.setRequestHeader(key, val);
        });
    }

    Vue.prototype.$http = new Http(options.domain);
};

export default {
    install: install
};