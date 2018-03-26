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

var install = function(Vue, options) {

    var $message = {
        alert: function(title, content, _callback) {
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
            $button.innerText = '好的';

            var buttonStyle = {
                fontSize: '0.4533333333333333rem',
                color: '#007aff',
                textAlign: 'center',
                marginTop: '0.24rem'
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
        },
        confirm: function(title, content, _callback) {
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
                    _callback && _callback();
                    $modal.remove();
                }, 300);
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
                opacity: '.3'
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
        $txt1.innerText = '点击分享邀请好友';
        $txt2.innerText = '获得复活机会';

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

    Vue.prototype.$message = $message;
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

export default {
    install: install
};