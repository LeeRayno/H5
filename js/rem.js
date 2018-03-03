/*
 * @Author: LeeRay
 * @Date: 2018-03-03 13:03:50
 * @Last Modified by: LeeRay
 * @Last Modified time: 2018-03-03 14:21:46
 */

// 移动端 rem 适配的方法

// CSS 方法

// 直接使用html css 方法
// html{
//   font-size: calc(100vw / 375 * 20)
// }

// JS 方法

/*方法一*/

(function (win) {
	function remChange () {
		const docEl = document.documentElement
		docEl.style.fontSize = docEl.clientWidth * 20 / 375 + 'px'
	}
	remChange()
	win.addEventListener('resize', remChange, false)
	document.addEventListener('DOMContentLoaded', remChange, false)
})(window)

/*方法二*/

;(function (doc, win) {
	let docEl = doc.documentElement
	const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
	const recalc = function () {
		const clientWidth = docEl.clientWidth
		if (!clientWidth) return
		docEl.style.fontSize = 20 * (clientWidth / 375) + 'px'
	}
	if (!doc.addEventListener) return
	win.addEventListener(resizeEvt, recalc, false)
	doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)

/*方法三------------淘宝写法处理1pxbug--------------*/

;(function (doc, win) {
	const radio = win.devicePixelRatio || 1
	const scale = 1 / radio
	const docEl = doc.documentElement
	const meta = document.createElement('meta')
	const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
	const recalc = function () {
		const clientWidth = docEl.clientWidth
		if (!clientWidth) return
		docEl.style.fontSize = 20 * (clientWidth / 375) + 'px'
	}
	recalc()
	docEl.setAttribute('data-dpr', radio)
	meta.setAttribute('name', 'viewport')
	meta.setAttribute('content', 'width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
	if (docEl.firstElementChild) docEl.firstElementChild.appendChild(meta)

	if (!doc.addEventListener) return

	win.addEventListener(resizeEvt, recalc, false)
	doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)

/*
 **
 **方法一二需要引入meta标签
 **
 **<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,user-scalable=no">
 **
 */
