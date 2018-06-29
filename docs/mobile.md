# 移动端适配

## meta

``` html

<!-- 为移动设备添加 viewport -->

<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />

```

* `width=device-width`： 使宽度等于设备宽度
* `initial-scale=1.0`：初始化缩放比例
* `maximum-scale=1.0`：允许最大缩放比例
* `minimum-scale=1.0`：允许最小缩放比例
* `user-scalable=no`：不允许用户缩放
* `shrink-to-fit=no`：兼容 IOS9

常用 `meta` 标签   [meta](https://github.com/LeeRayno/H5/blob/master/html/h5-template.html)

``` html

<!-- 设置苹果工具栏颜色 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black" />

<!-- 是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏 -->
<meta name="apple-mobile-web-app-capable" content="yes" />

<!-- 忽略页面中的数字识别为电话，忽略email识别 -->
<meta name="format-detection" content="telphone=no, email=no" />

<!-- 优先使用 IE 最新版本和 Chrome -->
<meta http-equiv="X-UA-Compatible" content="ie=edge" />

```

## 适配

### Javascript

> 1.方法一

``` js

((win, doc) => {

  const recalc = () => {
    const docEl = doc.documentElement
    docEl.style.fontSize = (docEl.clientWidth / 375 * 20) + 'px'
  }

  win.addEventListener('resize', recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)

})(window, document)

```

* `document.documentElement.clientWidth`：设备宽度
* `375`：标准尺寸、一般`UI`的设计尺寸为 `750`(放大了两倍)、我们就把标准尺寸设为 `375`、如果`UI`的设计尺寸为 `640`、标准尺寸则为 `320`
* `20`：`1rem = 20px`
* 常见设备尺寸：[mydevice.io](https://www.mydevice.io/#) [material design](https://material.io/tools/devices/)

> 2.方法二

``` js

((win, doc) => {
  const docEl = doc.documentElement

  const resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize'

  const recalc = () => {
    const clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = (clientWidth / 375 * 20) + 'px'
  }

  if (!doc.addEventListener) return

  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)

})(window, document)

```

> 3.方法三

``` js
// 类似手淘写法--主要为了解决 1px bug
// @see https://github.com/amfe/lib-flexible

(function (doc, win) {
  const radio = win.devicePixelRatio || 1
  const scale = 1 / radio
  const docEl = doc.documentElement
  const meta = document.createElement('meta')
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function () {
    const clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = (clientWidth / 375 * 20) + 'px'
  }
  // recalc()
  docEl.setAttribute('data-dpr', radio)
  meta.setAttribute('name', 'viewport')
  meta.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
  if (docEl.firstElementChild) docEl.firstElementChild.appendChild(meta)

  if (!doc.addEventListener) return

  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)

// 方法一二需要加入 meta 标签
// 方法三根据 dpr 动态加入 meta 标签 可以解决 1px bug
// 一般在用第三方 UI 库的时候用一二种方法，完全自己写的话用第三种方法

```

### CSS

``` css

html {
  font-size: calc(100vw / 375 * 20);
}

```

* `vw`：视窗(`viewport`)宽度的百分比（`1vw`代表视窗宽度的`1%`, `100vw`代表`100%`）
* `vh`：视窗高度的百分比
* `vmin`：`Math.min(vw, vh)`取较小值
* `vmax`：`Math.max(vw, vh)`取较大值

[如何在Vue项目中使用vw实现移动端适配](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)

### 换算rem

<p class="tip">编辑器搜索插件 `px2rem`</p>

### 1px bug

<p class="warning">在 `Retina` 屏上 `1px` 显示为 `2px`,使用一二种方法会存在 `1px` bug, 用`css`解决</p>

``` css
/* less */
.border-1px(@c=#ccc, @s=solid) {
  &::after {
    content: "";
    pointer-events: none;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-origin: 0 0;
    border: 1px @s @c;
    box-sizing: border-box;

    @media (min-resolution: 2dppx) {
      width: 200%;
      height: 200%;
      transform: scale(.5) translateZ(0);
    }

    @media (min-resolution: 3dppx) {
      width: 300%;
      height: 300%;
      transform: scale(.333) translateZ(0);
    }
  }
}

.border-1px-t(@c=#ccc, @s=solid) {
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border-top: 1px @s @c;
    transform-origin: 0 top;

    @media (min-resolution: 2ddpx) {
      width: 200%;
      transform: scale(.5) translateZ(0);
    }

    @media (min-resolution: 3ddpx) {
      width: 300%;
      transform: scale(.333) translateZ(0);
    }
  }
}

.border-1px-b(@c=#ccc, @s=solid) {
  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px @s @c;
    transform-origin: 0 bottom;

    @media (min-resolution: 2ddpx) {
      width: 200%;
      transform: scale(.5) translateZ(0);
    }

    @media (min-resolution: 3ddpx) {
      width: 300%;
      transform: scale(.333) translateZ(0);
    }
  }
}

.border-1px-l(@c=#ccc, @s=solid) {
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-left: 1px @s @c;
    transform-origin: left 0;

    @media (min-resolution: 2ddpx) {
      height: 200%;
      transform: scale(.5) translateZ(0);
    }

    @media (min-resolution: 3ddpx) {
      height: 300%;
      transform: scale(.333) translateZ(0);
    }
  }
}

.border-1px-r(@c=#ccc, @s=solid) {
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    border-right: 1px @s @c;
    transform-origin: right 0;

    @media (min-resolution: 2ddpx) {
      height: 200%;
      transform: scale(.5) translateZ(0);
    }

    @media (min-resolution: 3ddpx) {
      height: 300%;
      transform: scale(.333) translateZ(0);
    }
  }
}

.border-1px,
.border-1px-t,
.border-1px-b,
.border-1px-r,
.border-1px-l {
  position: relative;
}

.border-1px {
  .border-1px();
}

.border-1px-t {
  .border-1px-t();
}

.border-1px-b {
  .border-1px-b();
}

.border-1px-l {
  .border-1px-l();
}

.border-1px-r {
  .border-1px-r();
}

// @see https://github.com/airyland/vux/blob/v2/src/styles/1px.less
// @see https://github.com/didi/cube-ui/blob/dev/src/common/stylus/base.styl

```

### 屏幕旋转的事件和样式

#### 事件

``` js
window.onorientationchange = function() {
  swith(window.orientation) {
    case 90:
    case -90:
      alert(`横屏：${window.orientation}`)
    break;
    case 0:
    case 180:
      alert(`竖屏：${window.orientation}`)
    break;
  }
}

```

#### 样式

``` css
// 竖屏时使用的样式
@media all and (orientation:portrait) {
  .css {}
}

// 横屏时使用的样式
@media all and (orientation:landscape) {
  .css {}
}

```

### 注意事项

<p class="tip">移动端`click`屏幕产生200-300 ms的延迟响应</p>

``` js
// 引入fastclick
// @see https://github.com/ftlabs/fastclick

const Fastclick = import('fastclick')
Fastclick.attach(document.body)

```

<p class="tip">`CSS`相关</p>

``` css
user-select: none; /* 禁止选中文本(如无文本选中需求,此为必选项)  */
-webkit-appearance: none; /* 屏蔽阴影 (input, textarea, button, ...)  */
-webkit-touch-callout: none; /* 禁止长按链接与图片弹出菜单 (a, img) */
-webkit-text-size-adjust: none; /* 禁止横屏时自动缩放字体 */
-webkit-overflow-scrolling: touch; /* ios 平滑滚动 */
-webkit-font-smoothing: antialiased; /* 使字体平滑，反锯齿 */
-webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* 去除 ios android 点击时自带高亮的样式(a, button) */

```

### 参考

* [白树博客-移动web资源整理](http://www.cnblogs.com/PeunZhang/p/3407453.html)
* [大漠博客-使用Flexible实现手淘H5页面的终端适配](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)
