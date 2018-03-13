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