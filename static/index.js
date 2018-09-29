(function (window) {
    
    var testOauthURL = 'http://test.msjk95596.com/test/act/wechat/base/access_token/?state=',
        oauthURL = /test/.test(location.origin) ? 'http://test.msjk95596.com/act/wechat/base/access_token/?state=' : 'http://www.msjk95596.com/act/wechat/base/access_token/?state=' ;
    
    var loginRequired = true;

    if (loginRequired && !parseUrl('oid')) {
        if (env == 'dev') oauthURL = testOauthURL;
        location.href = oauthURL + location.origin + location.pathname + encodeURIComponent(location.search);
        return;
    } else {
        var redirectPath = parseUrl('redirect_path');
        if (redirectPath) {
            var url = deleteUrlQuery('redirect_path');
            window.location.href = url + '#/' + redirectPath;
        }
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
                        resSearch += '?' + key + '=' + val;
                    } else {
                        resSearch += '&' + key + '=' + val;
                    }
                }
            }
        }

        return location.origin + location.pathname + resSearch;
    }
})(window);

