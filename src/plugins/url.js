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

var install = function(Vue, options) {
    Vue.prototype.$url = {
        parseUrl: parseUrl,
        deleteUrlQuery: deleteUrlQuery,
        insertUrlQuery: insertUrlQuery
    }
}

export default {
    install: install
}