# vue-wechat-tpl说明文档

## 重要说明
每次新建项目都要从这个仓库去拉去代码
gitlab仓库名：vue-wechat-tpl.git

## 简单说明
通过vue的插件扩展方式自定义封装了多个plugin，根据需求需要plugin可插拔，以下对几个重要plugin进行说明。

## pageDelegate.js
这个插件为我们的page级的组件增添了几个页面级别的生命周期钩子
```javascript
{
	isPage: true,  // 每个页面都要有这个属性
	Data: {  // 用Data代替原来的data，可支持页面间参数传递
	
	},
	willEnterPage: function(data) {},
	didEnterPage: function(data) {}
}
```
并且当切换页面时提供了页面的过渡动画
```javascript
	v.$switchTo(page) // 跳到下一页
	v.$replace(page)  // 替换到下一页
	v.$goBackward()  // 返回上一页
	
	v.$switchTo('/login', 'forward'); // 切换到login页面，设置forward动画
	v.$switchTo('/login', {name: 'logan'}， 'forward'); // 跳转到login页面 传递name参数到login页面 设置动画'forward'
```

## wxsdk.js
封装抽象了微信分享等接口，使微信分享可配置化同时可主动调用，满足各种分享需求。
```javascript
// 先在main.js调用签名接口设置签名
v.$wxsdk.apiTicket('/act/wechat/shares/sign');
```

```javascript
	// config.js 
	// 此处配置默认的分享
	var config = {
	...
		defaultShareOption: {
			title: '分享标题',
			desc: '这里是分享的描述',
			imgUrl: shareIcon,
			link: `${location.origin}${location.pathname}`
		},
	...
	}
```
```javascript
	// script.js
	// 配置每个页面自己的分享
	export default {
	...
		shareOption: {
			title: '',
			desc: '',
			imgUrl: shareIcon,
			link: `${location.origin}${location.pathname}?redirect_path=sub`
		}
	...
	}
	
	
```

```javascript
	// 手动调用
	v.$wxsdk.configShare({
		title: '',
		desc: '',
		imgUrl: '',
		link: ''
	});
```

其他接口：
 - openShareMenu 打开分享菜单
 - hideShareMenu 关闭分享菜单
 - hideOuterBrowser 关闭其他浏览器打开菜单
 - openOuterBrowser 打开其他浏览器打开菜单
 - getLocation 获取定位坐标

## action-monitor.js
用户行为检测

```javascript
	// 在initPlugin.js中初始化
import actionMonitor from '@/plugins/action-monitor.js'
Vue.use(actionMonitor, { paramsArray: ['openid', 'source'], reqUrl: '/track/action', scope: config.storageScope })

// 主动调用触发事件
v.$acMonitor.trackEvent({
	event: '',
	page: ''
})
```

```html
	<!--在html标签上埋点-->
	<input type="hidden" input-tag="name" value="logan" />
	<!--当点击下面的按钮时触发一个埋点，将埋有input-tag的数据传送给后台-->
	<input type="button" click-tag="submit" />
```

## touch.js
提供了“上划”，“下滑”， “左滑” 和 “右滑”四个方向的手势

```html
	<!--v-touchleft, v-touchright, v-touchup, v-touchdown-->
	<div v-touchleft="{ fn: onTouchleft, params: params }"></div>
```
```javascript
	export default {
		data: { params: {} },
		methods: onTouchleft(params) {
			console.log('touch left');
		}
	}
```

## message.js
各种弹窗 alert, toast什么的, 具体接口看代码, 一目了然

## storage.js
为sessionStorage和localStorage封装了更加友好的接口,用了这个再也不用JSON.parse,JSON.stringify了.
```javascript
// 设置scope,由于我们的项目很多都在一个域名下,为了防止相互污染,加了scope
Vue.use(storage, {scope: config.storageScope});

v.$sessionStorage.setItem('name', 'logan');
v.$sessionStorage.getItem('name');
v.localStorage.setItem('name', 'logan');
v.$localStorage.getItem('name');
```