var $CONTAINER = undefined;
var picItems = [];

// 这是一个图片查看器，可双指缩放
var install = function (Vue, options) {
    
    Vue.prototype.$gallery = function (url, urlList) {
        var currUrl = undefined,
        urlList = urlList;

        if (Array.isArray(url)) {
            urlList = url;
            currUrl = url[0];
        } else if (typeof url === 'string') {
            currUrl = url;
            if (!urlList) {
                urlList = [];
                urlList.push(currUrl);
            }
        } else {
            urlList = [];
        }

        console.log(currUrl, urlList);

        var currIndex = getCurrentIndex(currUrl, urlList);
        var prevIndex = currIndex > 0 ? currIndex - 1 : null;
        var nextIndex = currIndex < urlList.length - 1 ? currIndex + 1 : null;

        var $container = createContainer();
        var $picItem = createPicItem(currUrl);
        $container.appendChild($picItem);
        document.body.appendChild($container);

        // 监听缩放
        
    };
};

function getCurrentIndex(currUrl, urlList) {
    var currIndex = 0;

    for(var i = 0, len = urlList.length; i < len; i++){
        var url = urlList[i];
        if (url === currUrl) {
            currIndex = i;
            break;
        }
    }

    return currIndex;
}

function createContainer() {
    if ($CONTAINER) return $CONTAINER;

    var $container = document.createElement('DIV');
    $container.className = 'gallery';

    var style = {
        position: 'absolute',
        top: '0',
        left: '0',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, .9)',
        overFlow: 'hidden'
    }

    Object.assign($container.style, style);
    $CONTAINER = $container;

    return $container;
}

function createPicItem(url) {
    var picItem = undefined;
    

    if (picItem = picItems[url]) {
        return picItem;
    }

    picItem = document.createElement('IMG');
    picItem.className = 'picItem';
    picItem.isScaled = false;
    picItem.scaleVal = 1;

    var style = {
        
        width: '100%',
        transition: 'transform 50ms ease-out'
    };

    Object.assign(picItem.style, style);
    picItem.src = url;

    // 监听双击

    // picItem.addEventListener('click', function(evt) {
    //     var evt = evt || window.event;
        
    //     if (!picItem.isScaled) {
    //         var style = {
    //             'transform-origin': evt.x + 'px ' + (evt.y - this.offsetTop) + 'px',
    //             transform: 'scale(3)'
    //         }
            
    //         picItem.isScaled = true;
    //     } else {
    //         var style = {
    //             // 'transform-origin': evt.x + 'px ' + (evt.y - this.offsetTop + this.offsetHeight/2) + 'px',
    //             transform: 'scale(1)'
    //         }

    //         picItem.isScaled = false;
    //     }
        

    //     Object.assign(this.style, style);
        
    // }, false);

    onDblTouchStart(picItem, function(evt) {
        
        var POINT_1 = { x: evt.touches[0].clientX, y: evt.touches[0].clientY },
            POINT_2 = { x: evt.touches[1].clientX, y: evt.touches[1].clientY },
            POINT_0 = { x: (POINT_1.x + POINT_2.x) / 2, y: (POINT_1.y + POINT_2.y) / 2 },
            RANGE_0 = Math.sqrt( Math.pow(POINT_1.x - POINT_2.x, 2) + Math.pow(POINT_1.y - POINT_2.y, 2) );

        picItem.style.transformOrigin = POINT_0.x + 'px ' + (POINT_0.y - picItem.offsetTop) + 'px';
        
        Object.assign(picItem, { POINT_0: POINT_0, RANGE_0: RANGE_0 });
        console.log(picItem.RANGE_0);
    });

    var scaleVal;
    onDblTouchMove(picItem, function(evt) {
        
        var mPOINT_1 = { x: evt.touches[0].clientX, y: evt.touches[0].clientY },
            mPOINT_2 = { x: evt.touches[1].clientX, y: evt.touches[1].clientY },
            RANGE_m = Math.sqrt( Math.pow(mPOINT_1.x - mPOINT_2.x, 2) + Math.pow(mPOINT_1.y - mPOINT_2.y, 2) );
            
            scaleVal = picItem.scaleVal * ((RANGE_m - picItem.RANGE_0) / picItem.RANGE_0 + 1);

            console.log(scaleVal);
        Object.assign(picItem.style, { transform: 'scale(' + scaleVal + ')' })
    });

    onDblTouchEnd(picItem, function(evt) {
        console.log(evt);
        // picItem.scaleVal = scaleVal;
        picItem.style.transform = "scale(1)";
    })

    return picItem;
}

function onDblTouchStart(dom, _callback) {
    dom.addEventListener('touchstart', function(evt) {
        var evt = evt || window.event;
        // console.log(evt)
        if (evt.touches.length == 2) {
            dom.isDblTouchStart = true;
            _callback(evt, evt.touches);
        }
    }, false)
}

function onDblTouchMove(dom, _callback) {
    dom.addEventListener('touchmove', function(evt) {
        var evt = evt || window.event;
        // console.log(evt)
        if (evt.touches.length == 2) {
            _callback(evt, evt.touches);
        }
    }, false)
}

function onDblTouchEnd(dom, _callback) {
    dom.addEventListener('touchend', function(evt) {
        var evt = evt || window.event;
        console.log(evt)
        
        if (dom.isDblTouchStart) {
            _callback(evt);
            dom.isDblTouchStart = false;
        }
    }, false)
}

export default {
    install: install
};