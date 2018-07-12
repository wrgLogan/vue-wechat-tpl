/**
* author: 吴榕根
* createdAt: 2017/12/14
* descript: 用户行为检测,监听定制的用户点击行为以及重要的标签内容
*/

var install = function (Vue, options) {
    var CLICK_TAG = 'click-tag';
    var INPUT_TAG = 'input-tag';
    var PHONE_MOBILE_TAG = 'phone-number';
    var PAGE_TITLE = 'page-title';
    var apiUrl = null;

    var jsonParser = {
        stringify: function(obj) {
            return '{}';
        },
        parse: function(text) {
            return eval('(' + text + ')');
        }
    }

    var JSON = window.JSON || jsonParser;

    // 调用方式 var monitor = new ActionMonitor(['openId', 'name'], '/stargate/rest/v0/action/track');
    var ActionMonitor = function (keyArr, apiUrl) {
        var _this = this;
        this.apiUrl = apiUrl;
        this.keyArr = keyArr || [];

        try{
            setTimeout(function() {
                // _this.sendPV();
                _this.onClickDom();
            }, 500);
        } catch(e) {
            console.log(e);
        }
        
    };

    ActionMonitor.prototype.sendPV = function () {
        var _this = this;
        // var params = {
        //     'url': location.href
        // };

        // // for (var i in this.keyArr) {
        // for (var i = 0; i < this.keyArr.length; i++){
        //     var key = this.keyArr[i];
        //     var value;
        //     // 判断是否有sessionStorage
        //     if (window.sessionStorage && (value = sessionStorage.getItem(key))) {
        //         try{
        //             params[key] = JSON.parse(value);
        //         } catch(e) {
        //             params[key] = value;
        //         }
        //     } else {
        //         var cookieObj = parseCookie();
        //         if (cookieObj[key]) {
        //             params[key] = cookieObj[key];
        //         } else if (parseUrl()[key]) {
        //             params[key] = parseUrl()[key];
        //         }
        //     }
        // }

        try{    
            _this.sendInput();
        } catch(e) {
            console.log(e);
        }
        
    }

    ActionMonitor.prototype.onClickDom = function () {
        var _this = this;
        var body = document.body;

        body.onclick = function (evt) {
            
            var evt = evt || window.event;
            var target = evt.target || evt.srcElement;
            var url = location.href;

            if (target[CLICK_TAG] || target.hasAttribute(CLICK_TAG)) {
                var id = target[CLICK_TAG] || target.getAttribute(CLICK_TAG);
                _this.sendInput(id);
            }

        }
    }

    ActionMonitor.prototype.sendInput = function(element) {
        var _this = this;
        var url = location.href;
        var phoneDom = document.querySelector('[' + PHONE_MOBILE_TAG + ']');
        var phoneNumber = phoneDom ? getValue(phoneDom) : null;
        var titleDom = document.querySelector('[' + PAGE_TITLE + ']');
        var pageTitle = titleDom ? getValue(titleDom) : null;
        
        var params = { url: url};

        if (phoneNumber) {
            params.phoneNumber = phoneNumber;
        }
        if (pageTitle) {
            params.pageTitle = pageTitle;
        }

        if (element) {
            params.element = element;
        }

        // for (var i in this.keyArr) {
        for (var i = 0; i < this.keyArr.length; i++){
            var key = this.keyArr[i];
            var value;
            if (window.sessionStorage && (value = sessionStorage.getItem(key))) {
                try{
                    params[key] = JSON.parse(value);
                } catch(e) {
                    params[key] = value;
                }
            } else if (window.localStorage && (value = localStorage.getItem(key))) {
                try{
                    params[key] = JSON.parse(value);
                } catch(e) {
                    params[key] = value;
                }
            } else {
                var cookieObj = parseCookie();
                if (cookieObj[key]) {
                    params[key] = cookieObj[key];
                }
            }
        }

        var inputs = document.querySelectorAll('[' + INPUT_TAG + ']');
        // console.log(inputs)
        for (var k in inputs) {
        // for (var i = 0; i < inputs.length; i++){
            
            var inputItem = inputs[k];
            // var key = inputItem.getAttribute(INPUT_TAG);

            if (typeof inputItem == 'object') {
                var key = inputItem[INPUT_TAG] || inputItem.getAttribute(INPUT_TAG);
            }
            
            if (!params[key]) {
                var val = getValue(inputItem);
                if (val && val !== '') {
                    params[key] = val;
                }
            }
            
        }
        post(this.apiUrl, params);
    }

    function post(url, params) {
        var xhr = new XMLHttpRequest();
        var jsonData = JSON.stringify(params);

        if (!url) {
            throw new Error('action-monitor: request url is null');
            return;
        }

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.send(jsonData);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // console.log('action monitor => request success');
            }
        }
    };

    function getValue(dom) {
        var tagName = dom.tagName;
        
        if (tagName == 'INPUT') {
            
            if (dom.type == "checkbox" ) {
                if (dom.checked) {
                    return true;
                }
            } else if (dom.type == 'radio') {
                if (dom.checked) {
                    return dom.value;
                } else {
                    return null;
                }
            } else {
                return dom.value;
            }
            
        } else if (tagName == 'TEXTAREA' || tagName == 'SELECT') {
            return dom.value;
        } else {
            return dom.innerText;
        }
    }

    function parseCookie() {
        var cookie = document.cookie;
        var splitItems = cookie.split(';');
        var params = {};

        // for (var i in splitItems) {
        for (var i = 0; i < splitItems.length; i++){
            var spItem = splitItems[i];
            var itemArr = spItem.split('=');
            if (itemArr.length > 1) {
                params[itemArr[0].trim()] = itemArr[1];
            }
        }

        return params;
    }

    function parseUrl() {
        var search = location.search;
        var params = {};
        
        if (search.indexOf('?') > -1) {
            var splitItems = search.replace('?', '').split('&');

            // for (var i in splitItems) {
            for (var i = 0; i < splitItems.length; i++){
                var spItem = splitItems[i];
                var itemArr = spItem.split('=');
                if (itemArr.length > 1) {
                    params[itemArr[0].trim()] = itemArr[1];
                }
            }
        }

        return params;
    }

    options = options || {};

    var acMonitor = new ActionMonitor(options.paramsArray, options.reqUrl);

    Vue.mixin({
        mounted(){
            if (this.$options.isPage) {
                setTimeout(() => {
                    acMonitor.sendPV();                    
                }, 400);
            }
        }
    })

};

export default {
    install: install
}