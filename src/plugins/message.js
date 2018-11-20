import shareUrl from '../assets/image/share.png'
import yesUrl from '../assets/image/yes.png'
import warnUrl from '../assets/image/warning.png'
/**
 * 弹框插件
 * alert
 * confirm
 * prompt
 * toast
 * warning
 * success
*/

var $showLoading = function(txt) {

    var $iosLoading = document.getElementById('lo-ios-loading');

    if (!$iosLoading) {

        $iosLoading = createLoading();
        // loading插入body
        document.body.appendChild($iosLoading);
    }
    
    var $div = $iosLoading.children[1];

    // 插入文字
    $div.innerText = txt || '';

    if (!txt) {
        $div.style.display = 'none';
    } else {
        $div.style.display = 'inline-block';
    }
    
    // 显示
    setTimeout(() => {
        $iosLoading.style.opacity = 1;
    });
}

var $hideLoading = function() {
    var $iosLoading = document.getElementById('lo-ios-loading');

    if (!$iosLoading) return;

    $iosLoading.style.opacity = 0;
    setTimeout(() => {
        $iosLoading.remove();
    }, 300);
}

var $message = {
    alert: function(title, content, _callback, btnTxt) {
        if (!content) {
            content = title;
            title = '';
        } else {
            if (typeof content == 'function') {
                _callback = content;
                content = title;
                title = '';
            }
        }

        var $modal = document.createElement('DIV');
        var $overlay = createOverlay();
        var $dialog = document.createElement('DIV');
        Object.assign($modal.style, {
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'height': '100%',
            'width': '100%',
            'z-index': '2'
        });
        $dialog.className = 'modal-dialog';

        $modal.className = 'message-modal';
        $modal.appendChild($overlay);

        var dialogStyle = {
            position: 'absolute',
            top: '34%',
            left: '50%',
            transform: 'translateX(-50%) scale(1.3)',
            width: '7.2rem',
            height: '3.84rem',
            borderRadius: '0.26666666666666666rem',
            backgroundColor: '#fff',
            transition: 'all .38s',
            opacity: '.3',
            overflow: 'hidden'
        }

        Object.assign($dialog.style, dialogStyle);

        $modal.appendChild($dialog);

        var $content = document.createElement('DIV');
        $content.className = 'dialog-content';

        var contentStyle = {
            height: '2.6666666666666665rem',
            borderBottom: '1px solid #eee',
            textAlign: 'center',
            paddingTop: '0.8533333333333334rem',
            lineHeight: '0.6133333333333333rem'
        }
        
        $dialog.appendChild($content);

        Object.assign($content.style, contentStyle);

        var $title = document.createElement('P');
        $title.className = 'dialog-title';
        $title.innerText = title;

        var titleStyle = {
            fontSize: '0.4533333333333333rem',
            fontWeight: '600',
        }

        Object.assign($title.style, titleStyle);

        $content.appendChild($title);

        var $txt = document.createElement('P');
        $txt.className = 'dialog-txt';
        $txt.innerText = content;

        var txtStyle = {
            fontSize: '0.3466666666666667rem',
            color: '#333'
        }

        Object.assign($txt.style, txtStyle);

        $content.appendChild($txt);

        var $button = document.createElement('DIV');
        $button.className = 'dialog-btn';
        $button.innerText = btnTxt || '好的';

        var buttonStyle = {
            fontSize: '0.4533333333333333rem',
            color: '#007aff',
            textAlign: 'center',
            height: '1.1733333333333333rem',
            lineHeight: '1.1733333333333333rem',
        }

        Object.assign($button.style, buttonStyle);

        $dialog.appendChild($button);

        document.body.appendChild($modal);

        setTimeout(() => {
            $dialog.style.transform = 'translateX(-50%) scale(1)';
            $dialog.style.opacity = 1;
        }, 30);

        $button.onclick = function() {
            setTimeout(() => {
                _callback && _callback();
                $modal.remove();
            }, 300);
            
            $dialog.style.transform = 'translateX(-50%) scale(1.3)';
            $dialog.style.opacity = .1;
        }

        $button.ontouchstart = function() {
            Object.assign(this.style, {
                backgroundColor: '#eee'
            })
        }

        $button.ontouchend = function() {
            Object.assign(this.style, {
                backgroundColor: '#fff'
            })
        }
    },
    confirm: function(title, content, _callback, leftBtnTxt, rightBtnTxt) {
        if (!content) {
            content = title;
            title = '';
        } else {
            if (typeof content == 'function') {
                _callback = content;
                content = title;
                title = '';
            }
        }

        leftBtnTxt = leftBtnTxt || '取消';
        rightBtnTxt = rightBtnTxt || '确定';

        var $modal = document.createElement('DIV');
        var $overlay = createOverlay();
        var $dialog = document.createElement('DIV');
        Object.assign($modal.style, {
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'height': '100%',
            'width': '100%',
            'z-index': '2'
        });
        $dialog.className = 'modal-dialog';

        $modal.className = 'message-modal';
        $modal.appendChild($overlay);

        var dialogStyle = {
            position: 'absolute',
            top: '34%',
            left: '50%',
            transform: 'translateX(-50%) scale(1.3)',
            width: '7.2rem',
            height: '3.84rem',
            borderRadius: '0.26666666666666666rem',
            backgroundColor: '#fff',
            transition: 'all .38s',
            opacity: '.3',
            overflow: 'hidden'
        }

        Object.assign($dialog.style, dialogStyle);

        $modal.appendChild($dialog);

        var $content = document.createElement('DIV');
        $content.className = 'dialog-content';

        var contentStyle = {
            height: '2.6666666666666665rem',
            borderBottom: '1px solid #eee',
            textAlign: 'center',
            paddingTop: '0.8533333333333334rem',
            lineHeight: '0.6133333333333333rem'
        }
        
        $dialog.appendChild($content);

        Object.assign($content.style, contentStyle);

        var $title = document.createElement('P');
        $title.className = 'dialog-title';
        $title.innerText = title;

        var titleStyle = {
            fontSize: '0.4533333333333333rem',
            fontWeight: '600',
        }

        Object.assign($title.style, titleStyle);

        $content.appendChild($title);

        var $txt = document.createElement('P');
        $txt.className = 'dialog-txt';
        $txt.innerText = content;

        var txtStyle = {
            fontSize: '0.3466666666666667rem',
            color: '#333'
        }

        Object.assign($txt.style, txtStyle);

        $content.appendChild($txt);

        var $footer = document.createElement('DIV');
        $footer.className = 'dialog-footer';
        
        var footerStyle = {
            display: 'flex',
            justifyContent: 'center',
            height: '1.1733333333333333rem'
        }

        Object.assign($footer.style, footerStyle);
        $dialog.appendChild($footer);

        var $button1 = document.createElement('DIV');
        $button1.className = 'dialog-btn';
        $button1.innerText = leftBtnTxt || '取消';

        var buttonStyle = {
            fontSize: '0.4533333333333333rem',
            color: '#007aff',
            textAlign: 'center',
            // marginTop: '9px',
            flex: '1',
            borderRight: '1px solid #cacada',
            height: '100%',
            lineHeight: '1.0666666666666667rem'
        }

        Object.assign($button1.style, buttonStyle);
        $footer.appendChild($button1);

        var $button = document.createElement('DIV');
        $button.className = 'dialog-btn';
        $button.innerText = rightBtnTxt || '好的';

        Object.assign($button.style, buttonStyle);
        $button.style.borderRight = 'none';
        $footer.appendChild($button);

        document.body.appendChild($modal);

        setTimeout(() => {
            $dialog.style.transform = 'translateX(-50%) scale(1)';
            $dialog.style.opacity = 1;
        }, 30);

        $button1.onclick = function() {
            setTimeout(() => {
                _callback && _callback(leftBtnTxt);
                $modal.remove();
            }, 300);
            
            $dialog.style.transform = 'translateX(-50%) scale(1.3)';
            $dialog.style.opacity = .1;
        }

        $button.onclick = function() {
            $dialog.style.transform = 'translateX(-50%) scale(1.3)';
            $dialog.style.opacity = .1;
            setTimeout(() => {
                _callback && _callback(rightBtnTxt);
                $modal.remove();
            }, 300);
        }

        $button1.ontouchstart = function() {
            Object.assign(this.style, {
                backgroundColor: '#eee'
            })
        }

        $button.ontouchstart = function() {
            Object.assign(this.style, {
                backgroundColor: '#eee'
            })
        }

        $button1.ontouchend = function() {
            Object.assign(this.style, {
                backgroundColor: '#fff'
            })
        }

        $button.ontouchend = function() {
            Object.assign(this.style, {
                backgroundColor: '#fff'
            })
        }
    },
    prompt: function(title, _callback) {
        var $modal = document.createElement('DIV');
        var $overlay = createOverlay();
        var $dialog = document.createElement('DIV');
        Object.assign($modal.style, {
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'height': '100%',
            'width': '100%',
            'z-index': '2'
        });
        $dialog.className = 'modal-dialog';

        $modal.className = 'message-modal';
        $modal.appendChild($overlay);

        var dialogStyle = {
            position: 'absolute',
            top: '34%',
            left: '50%',
            transform: 'translateX(-50%) scale(1.3)',
            width: '72%',
            height: '3.84rem',
            borderRadius: '0.26666666666666666rem',
            backgroundColor: '#fff',
            transition: 'all .38s',
            opacity: '.3',
            overflow: 'hidden'
        }

        Object.assign($dialog.style, dialogStyle);

        $modal.appendChild($dialog);

        var $content = document.createElement('DIV');
        $content.className = 'dialog-content';

        var contentStyle = {
            height: '2.6666666666666665rem',
            borderBottom: '1px solid #eee',
            textAlign: 'center',
            paddingTop: '0.7rem',
            lineHeight: '0.6133333333333333rem',
        }
        
        $dialog.appendChild($content);

        Object.assign($content.style, contentStyle);

        var $title = document.createElement('P');
        $title.className = 'dialog-title';
        $title.innerText = title;

        var titleStyle = {
            fontSize: '0.4533333333333333rem',
            fontWeight: '600',
        }

        Object.assign($title.style, titleStyle);

        $content.appendChild($title);

        var $input = document.createElement('INPUT');
        $input.className = 'dialog-input';

        var inputStyle = {
            height: '0.6933333333333334rem',
            width: '6.4rem',
            border: '1px solid #969696',
            marginTop: '0.32rem',
            marginBottom: '0.08rem',
            paddingLeft: '0.26666666666666666rem',
            outline: 'none'
        }

        Object.assign($input.style, inputStyle);

        $content.appendChild($input)

        setTimeout(() => {
            $input.focus();
        }, 300)
        // var $txt = document.createElement('P');
        // $txt.className = 'dialog-txt';
        // $txt.innerText = content;

        // var txtStyle = {
        //     fontSize: '0.3466666666666667rem',
        //     color: '#333'
        // }

        // Object.assign($txt.style, txtStyle);

        // $content.appendChild($txt);
        var $footer = document.createElement('DIV');
        $footer.className = 'dialog-footer';
        
        var footerStyle = {
            display: 'flex',
            justifyContent: 'center',
            height: '1.1733333333333333rem'
        }

        Object.assign($footer.style, footerStyle);
        $dialog.appendChild($footer);

        var $button1 = document.createElement('DIV');
        $button1.className = 'dialog-btn';
        $button1.innerText = '取消';

        var buttonStyle = {
            fontSize: '0.4533333333333333rem',
            color: '#007aff',
            textAlign: 'center',
            // marginTop: '9px',
            flex: '1',
            borderRight: '1px solid #cacada',
            height: '100%',
            lineHeight: '1.0666666666666667rem'
        }

        Object.assign($button1.style, buttonStyle);
        $footer.appendChild($button1);

        var $button = document.createElement('DIV');
        $button.className = 'dialog-btn';
        $button.innerText = '好的';

        Object.assign($button.style, buttonStyle);
        $button.style.borderRight = 'none';
        $footer.appendChild($button);

        document.body.appendChild($modal);

        setTimeout(() => {
            $dialog.style.transform = 'translateX(-50%) scale(1)';
            $dialog.style.opacity = 1;
        }, 30);

        $button1.onclick = function() {
            setTimeout(() => {
                // _callback && _callback(false);
                $modal.remove();
            }, 300);
            
            $dialog.style.transform = 'translateX(-50%) scale(1.3)';
            $dialog.style.opacity = .1;
        }

        $button.onclick = function() {
            $dialog.style.transform = 'translateX(-50%) scale(1.3)';
            $dialog.style.opacity = .1;
            setTimeout(() => {
                _callback && _callback($input.value);
                $modal.remove();
            }, 300)
        }

        $button1.ontouchstart = function() {
            Object.assign(this.style, {
                backgroundColor: '#eee'
            })
        }

        $button.ontouchstart = function() {
            Object.assign(this.style, {
                backgroundColor: '#eee'
            })
        }

        $button1.ontouchend = function() {
            Object.assign(this.style, {
                backgroundColor: '#fff'
            })
        }

        $button.ontouchend = function() {
            Object.assign(this.style, {
                backgroundColor: '#fff'
            })
        }
    },
    toast: function(content) {
        var $modal = document.createElement('DIV');
        var $overlay = createOverlay();

        $modal.style.zIndex = 2;
        $modal.style.position = 'absolute';
        $modal.style.top = '0px';
        $modal.style.left = '0px';
         $modal.style.width = '100%';
        $modal.style.height = '100%';

        $modal.className = 'message-modal';
        $modal.appendChild($overlay);

        var $wrapper = document.createElement('DIV');
        var wrapperStyle = {
            'position': 'absolute',
            'top': '6.4rem',
            'left': '50%',
            'transform': 'translateX(-50%)',
            'maxWidth': '4rem',
            'padding': '0.18666666666666668rem 0.3466666666666667rem 0.26666666666666666rem',
            'backgroundColor': 'rgba(0,0,0,.8)',
            'color': '#fff',
            'fontSize': '0.48rem',
            'textAlign': 'center',
            'borderRadius': '0.26666666666666666rem',
            'opacity': '.1',
            'transition': 'all .3s'
        }
        
        Object.assign($wrapper.style, wrapperStyle);
        $modal.appendChild($wrapper);

        var $txt = document.createElement('p');
        $txt.innerText = content;
        $txt.style.fontSize = '0.4266666666666667rem';
        $txt.style.color = '#fff';
        $wrapper.appendChild($txt);

        setTimeout(() => {
            $wrapper.style.opacity = 1;
        });

        setTimeout(() => {
            $wrapper.style.opacity = 0;
            setTimeout(() => {
                $modal.remove();
            }, 500);
        }, 2000);

        document.body.appendChild($modal);
    },
    success: function(content) {
        var $modal = document.createElement('DIV');
        var $overlay = createOverlay();

        $modal.className = 'message-modal';
        $modal.appendChild($overlay);

        var $wrapper = document.createElement('DIV');
        var wrapperStyle = {
            'position': 'absolute',
            'top': '6.4rem',
            'left': '50%',
            'transform': 'translateX(-50%)',
            'maxWidth': '4rem',
            'padding': '0.18666666666666668rem 0.3466666666666667rem 0.26666666666666666rem',
            'backgroundColor': 'rgba(0,0,0,.8)',
            'color': '#fff',
            'fontSize': '0.48rem',
            'textAlign': 'center',
            'borderRadius': '0.26666666666666666rem',
            'opacity': '.1',
            'transition': 'all .3s'
        }
        
        Object.assign($wrapper.style, wrapperStyle);
        $modal.appendChild($wrapper);

        var $img = document.createElement('img');
        $img.src = yesUrl;
        $img.style.height = '0.37333333333333335rem';
        $wrapper.appendChild($img);

        var $txt = document.createElement('p');
        $txt.innerText = content;
        $txt.style.fontSize = '0.48rem';
        $txt.style.color = '#fff';
        $wrapper.appendChild($txt);

        setTimeout(() => {
            $wrapper.style.opacity = 1;
        });

        setTimeout(() => {
            $wrapper.style.opacity = 0;
            setTimeout(() => {
                $modal.remove();
            }, 500);
        }, 2000);

        document.body.appendChild($modal);
    },
    warning: function(content) {
        var $modal = document.createElement('DIV');
        var $overlay = createOverlay();

        $modal.style.zIndex = 2;
        $modal.style.position = 'absolute';
        $modal.style.top = '0px';
        $modal.style.left = '0px';
         $modal.style.width = '100%';
        $modal.style.height = '100%';

        $modal.className = 'message-modal';
        $modal.appendChild($overlay);

        var $wrapper = document.createElement('DIV');
        var wrapperStyle = {
            'position': 'absolute',
            'top': '6.4rem',
            'left': '50%',
            'transform': 'translateX(-50%)',
            'maxWidth': '4rem',
            'padding': '0.18666666666666668rem 0.3466666666666667rem 0.26666666666666666rem',
            'backgroundColor': 'rgba(0,0,0,.8)',
            'color': '#fff',
            'fontSize': '0.48rem',
            'textAlign': 'center',
            'borderRadius': '0.26666666666666666rem',
            'opacity': '.1',
            'transition': 'all .3s'
        }
        
        Object.assign($wrapper.style, wrapperStyle);
        $modal.appendChild($wrapper);

        var $img = document.createElement('img');
        $img.src = warnUrl;
        $img.style.height = '0.37333333333333335rem';
        $wrapper.appendChild($img);

        var $txt = document.createElement('p');
        $txt.innerText = content;
        $txt.style.fontSize = '0.4266666666666667rem';
        $txt.style.color = '#fff';
        $wrapper.appendChild($txt);

        setTimeout(() => {
            $wrapper.style.opacity = 1;
        });

        setTimeout(() => {
            $wrapper.style.opacity = 0;
            setTimeout(() => {
                $modal.remove();
            }, 500);
        }, 2000);

        document.body.appendChild($modal);
    }
}

var $wechatShare = function() {
    var $modal = document.createElement('DIV');
    var $overlay = createOverlay();
    
    $overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    $overlay.style.zIndex = '2';
    $modal.appendChild($overlay);

    $overlay.onclick = function() {
        $modal.remove();
    }

    var $img = document.createElement('img');
    $img.src = shareUrl;
    var imgStyle = {
        'position': 'absolute',
        'right': '0.8266666666666667rem',
        'top': '0.8266666666666667rem',
        'width': '0.56rem',
        'zIndex': '2'
    }

    Object.assign($img.style, imgStyle);
    $modal.appendChild($img);

    var $txt1 = document.createElement('p');
    var $txt2 = document.createElement('p');
    $txt1.innerText = '点击分享给好友';
    // $txt2.innerText = '获得复活机会';

    var txtStyle = {
        'position': 'absolute',
        'top': '1.8666666666666667rem',
        'right': '0.5333333333333333rem',
        'fontSize': '0.5333333333333333rem',
        'color': '#fff',
        'zIndex': '2'
    }

    Object.assign($txt1.style, txtStyle);
    Object.assign($txt2.style, txtStyle);
    $txt2.style.top = '2.6666666666666665rem';
    $txt2.style.right = '1.0666666666666667rem';
    $modal.appendChild($txt1);
    $modal.appendChild($txt2);

    document.body.appendChild($modal);
}

var install = function(Vue, options) {

    Vue.prototype.$message = $message;
    Vue.prototype.$showLoading = $showLoading;
    Vue.prototype.$hideLoading = $hideLoading;
    Vue.prototype.$wechatShare = $wechatShare;
};

function createOverlay() {
    var $overlay = document.createElement('DIV');
    $overlay.className = 'overlay';
    var style = {
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, .5)'
    }

    Object.assign($overlay.style, style);

    return $overlay;
}

function createLoading() {
    var stSheet = document.styleSheets[0];
    stSheet.deleteRule(6);
    stSheet.insertRule(`
    @keyframes preloader-spin{100%{transform:rotate(360deg)}}
    `);

    var loadingStyle = {
        'position': 'absolute',
        'left': '50%',
        'top': '50%',
        'padding': '4px 8px 8px 8px',
        'transform': 'translate(-50%, -50%)',
        'background': 'rgba(0,0,0,.8)',
        'zIndex': '13500',
        'borderRadius': '5px',
        'height': '50px',
        'opacity': '0',
        'transition': 'opacity .3s'
    }

    var spanStyle = {
        'display': 'inline-block',
        'margin': '0 auto',
        'width': '34px',
        'height': '34px',
        'animation': 'preloader-spin 1s steps(12,end) infinite',
        'backgroundPosition': '50%',
        'backgroundSize': '100%',
        'backgroundRepeat': 'no-repeat',
        'backgroundImage': `url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23ffffff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")`
    }

    var divStyle = {
        'display': 'inline-block',
        'color': '#fff',
        'fontSize': '14px',
        'position': 'relative',
        'top': '-10px',
        'paddingLeft': '8px',
        'color': '#dedede'
    }

    // 创建对象 设置样式
    var $iosLoading = document.createElement('DIV');
    $iosLoading.id = 'lo-ios-loading';
    Object.assign($iosLoading.style, loadingStyle);

    var $span = document.createElement('SPAN');
    Object.assign($span.style, spanStyle);

    var $div = document.createElement('DIV');
    Object.assign($div.style, divStyle);

    // span，div插入loading
    $iosLoading.appendChild($span);
    $iosLoading.appendChild($div);

    return $iosLoading;
}

export default {
    install: install
};