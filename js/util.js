/*
 * @Author: LeeRay
 * @Date: 2018-03-03 13:12:59
 * @Last Modified by: lilei
 * @Last Modified time: 2020-07-20 20:00:45
 */

// 常用工具函数整理
export const ua = navigator.userAgent.toLowerCase()

/**
 * @desc 获取url参数
 * @param {String} name
 * @returns {String}
 */
export const getQueryString = name => {
	const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
	const r = window.location.search.substr(1).match(reg)
	if (r !== null) return decodeURIComponent(r[2])
	return null
}

/**
 * @desc min - max 之间的整数
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
export const rnd = (min, max) => {
	return Math.floor(Math.random() * (max - min)  + min)
}

/**
 * @desc 补零
 * @param {Number} n
 * @returns {String}
 */
export const toDub = n => {
	// return ('0' + n).slice(-2)
	return n < 10 ? '0' + n : '' + n
}

/**
 * @desc 是否是undefined
 * @param {*} v
 * @returns {Boolean}
 */
export const isUndef = (v) => {
	return v === undefined || v === null
}

/**
 * @desc 是否是对象
 * @param {*} v
 * @returns {Boolean}
 */
export const isObject = (v) => {
	return v !== null && typeof v === 'object'
}

export const _toString = Object.prototype.toString

/**
 * @desc 是否是普通对象
 * @param {*} obj
 * @returns {Boolean}
 */
export const isPlainObject = (obj) => {
	return _toString.call(obj) === '[object Object]'
}

/**
 * @desc 是否是正则表达式
 * @param {*} v
 * @returns {Boolean}
 */
export const isRegExp = (v) => {
	return _toString.call(v) === '[object RegExp]'
}

/**
 * @desc 金钱格式化
 * @param {Number} n
 * @returns {String}
 */
export const cashFmt = n => {
	return n.toLocaleString()
}

/**
 * @desc 日期格式化
 * @param {String|Number} ts
 * @param {String} fmt
 * @returns {String}
 */
export const tsFmt = (ts = Date.now(), fmt = 'YYYY-MM-DD HH:mm:ss') => {
	const oD = new Date(ts)

	const YY = oD.getFullYear()
	const MM = oD.getMonth() + 1
	const DD = oD.getDate()
	const HH = oD.getHours()
	const mm = oD.getMinutes()
	const ss = oD.getSeconds()
	const ms = oD.getMilliseconds()

	return fmt
		.replace('YYYY', YY)
		.replace('MM', toDub(MM))
		.replace('DD', toDub(DD))
		.replace('HH', toDub(HH))
		.replace('mm', toDub(mm))
		.replace('ss', toDub(ss))
		.replace('ms', toDub(ms))
}


/**
 * @desc 获取样式
 * @param {HTMLElement} ele
 * @param {String} name
 * @returns {String}
 */
export const getStyle = (ele, name) => {
	return (ele.currentStyle || getComputedStyle(ele, false))[name]
}

/**
 * @desc 设置cookie
 * @param {String} name
 * @param {String} value
 * @param {Number} iDay
 */
export const setCookie = (name, value, iDay) => {
	const oDate = new Date()
	oDate.setDate(oDate.getDate() + iDay)
	document.cookie = iDay ? `${name}=${value}; expires=${oDate}` : `${name}=${value}`
}

/**
 * @desc 获取cookie
 * @param {String} name
 * @returns {String}
 */
export const getCookie = name => {
	const arr = document.cookie.split('; ')
	for (let i = 0; i < arr.length; i++) {
		const aTmp = arr[i].split('=')
		if (aTmp[0] === name) {
			return decodeURIComponent(aTmp[1])
		}
	}
	return undefined
}

/**
 * @desc 删除cookie
 * @param {String} name
 */
export const removeCookie = name => {
	setCookie(name, '', -1)
}

/**
 * @desc 判断元素是否有某个class
 * @param {HTMLElement} ele
 * @param {String} cls
 * @returns {Boolean}
 */
export const hasClass = (ele, cls) => {
	if (ele.classList) {
		return ele.classList.contains(cls)
	} else {
		const reg = new RegExp('\\b' + cls + '\\b')
		return reg.test(ele.className)
	}
}

/**
 * @desc 给元素增加class
 * @param {HTMLElement} ele
 * @param {String} cls
 */
export const addClass = (ele, cls) => {
	if (ele.classList) {
		ele.classList.add(cls)
	} else {
		if (!hasClass(ele, cls)) {
			ele.className += ' ' + cls
		}
	}
}

/**
 * @desc 删除元素某个class
 * @param {HTMLElement} ele
 * @param {String} cls
 */
export const removeClass = (ele, cls) => {
	if (ele.classList) {
		ele.classList.remove(cls)
	} else {
		if (hasClass(ele, cls)) {
			const reg = new RegExp('\\b' + cls + '\\b')
			ele.className = ele.className
				.replace(reg, '')
				.replace(/^\s+|\s+$/g, '')
				.replace(/\s+/g, ' ')
		}
	}
}

/**
 * @desc 切换class
 * @param {HTMLElement} ele
 * @param {String} cls
 */
export const toggleClass = (ele, cls) => {
	if (ele.classList) {
		ele.classList.toggle(cls)
	} else {
		hasClass(ele, cls) ? removeClass(ele, cls) : addClass(ele, cls)
	}
}

/**
 * @desc 函数防抖
 * 就相当于手压住弹簧，手不松，弹簧就不会动。
 * @param {Function} cb
 * @param {Number} delay
 * @returns {Function}
 */
export const debounce = (cb, delay = 300) => {
	let timer
	return function(...args) {
		clearTimeout(timer)
		timer = setTimeout(() => {
			cb && cb.apply(this, args)
		}, delay)
	}
}

/**
 * @desc 函数节流
 * 就相当于拧紧水龙头让它一滴一滴的流
 * @param {Function} cb
 * @param {Number} delay
 * @returns {Function}
 */
export const throttle = (cb, delay = 300) => {
	let previous = 0
	return function(...args) {
		const now = Date.now()
		if (now - previous > delay) {
			cb && cb.apply(this, args)
			previous = now
		}
	}
}

/**
 * @desc requestAnimation polyfill
 */
export const requestAnimationFrame = (() => {
	return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function(cb) {
    	return setTimeout(cb, 16)
    }
})()

export const cancelAnimationFrame = (() => {
	return window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    function(id){
    	return clearTimeout(id)
    }
})()

// 下面代码来自 @see https://segmentfault.com/a/1190000022736837

/**
 * @desc 邮箱
 * @param {*} s
 */
export const isEmail = (s) => {
	return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * @desc 手机号
 * @param {*} s
 */
export const isMobile = (s) => {
	return /^1[0-9]{10}$/.test(s)
}

/**
 * @desc 座机号码
 * @param {*} s
 */
export const isPhone = (s) => {
	return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * @desc URL
 * @param {*} s
 */
export const isURL = (s) => {
	return /^http[s]?:\/\/.*/.test(s)
}

/**
 * @desc 是否是微信浏览器
 */
export const isWeiXin = () => {
	return ua.match(/microMessenger/i) == 'micromessenger'
}

/**
 * @desc 是否移动端
 */
export const isDeviceMobile = () => {
	return /android|webos|iphone|ipod|balckberry/i.test(ua)
}

/**
 * @desc 是否QQ浏览器
 */
export const isQQBrowser = () => {
	return !!ua.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i)
}

/**
 * @desc 是否爬虫
 */
export const isSpider = () => {
	return /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web sprider|sogou orion spider/.test(ua)
}

/**
 * @desc 去除 html 标签
 * @param {*} str
 */
export const removeHtmltag = (str) => {
	return str.replace(/<[^>]+>/g, '')
}

/**
 * @desc 动态引入js
 * @param {*} src
 */
export const loadScript = (src) => {
	return new Promise((resolve, reject) => {

		const s = document.createElement('script')
		s.type = 'text/javascript'
		s.async = true
		s.src = src
		s.onload = resolve
		s.onerror = reject
		const t = document.getElementsByTagName('script')[0]
		t.parentNode.insertBefore(s, t)
	})

}

/**
 * @desc 获取滚动的坐标
 * @param {*} el
 */
export const getScrollPosition = (el = window) => ({
	x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
	y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
})

/**
 * @desc 平滑滚动到顶部
 */
export const scrollToTop = () => {
	const c = document.documentElement.scrollTop || document.body.scrollTop
	if (c > 0) {
		window.requestAnimationFrame(scrollToTop)
		window.scrollTo(0, c - c / 8)
	}
}

/**
 * @desc 是否在视口内
 * @param {*} el
 * @param {*} partiallyVisible
 */
export const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
	const { top, left, bottom, right } = el.getBoundingClientRect()
	const { innerHeight, innerWidth } = window
	return partiallyVisible
		? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
      ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
		: top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
}

/**
 * @desc 复制
 * @param {*} value
 */
export const copyTextToClipboard = (value) => {
	const textArea = document.createElement('textarea')
	textArea.style.background = 'transparent'
	textArea.value = value
	document.body.appendChild(textArea)
	textArea.select()
	try {
		const successful = document.execCommand('copy')
	} catch (err) {
		console.log('Oops, unable to copy')
	}
	document.body.removeChild(textArea)
}

/**
 * @desc 判断类型集合
 * @param {*} str
 * @param {*} type
 */
export const checkStr = (str, type) => {
	switch (type) {
	case 'phone':   //手机号码
		return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str)
	case 'tel':     //座机
		return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str)
	case 'card':    //身份证
		return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)
	case 'pwd':     //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
		return /^[a-zA-Z]\w{5,17}$/.test(str)
	case 'postal':  //邮政编码
		return /[1-9]\d{5}(?!\d)/.test(str)
	case 'QQ':      //QQ号
		return /^[1-9][0-9]{4,9}$/.test(str)
	case 'email':   //邮箱
		return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str)
	case 'money':   //金额(小数点2位)
		return /^\d*(?:\.\d{0,2})?$/.test(str)
	case 'URL':     //网址
		return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
	case 'IP':      //IP
		return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str)
	case 'date':    //日期时间
		return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
	case 'number':  //数字
		return /^[0-9]$/.test(str)
	case 'english': //英文
		return /^[a-zA-Z]+$/.test(str)
	case 'chinese': //中文
		return /^[\\u4E00-\\u9FA5]+$/.test(str)
	case 'lower':   //小写
		return /^[a-z]+$/.test(str)
	case 'upper':   //大写
		return /^[A-Z]+$/.test(str)
	case 'HTML':    //HTML标记
		return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str)
	default:
		return true
	}
}

/**
 * @desc 身份证校验
 * @param {*} sId
 */
export const isCardID = (sId) => {
	if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
		console.log('你输入的身份证长度或格式错误')
		return false
	}
	//身份证城市
	var aCity = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
	if (!aCity[parseInt(sId.substr(0, 2))]) {
		console.log('你的身份证地区非法')
		return false
	}

	// 出生日期验证
	var sBirthday = (sId.substr(6, 4) + '-' + Number(sId.substr(10, 2)) + '-' + Number(sId.substr(12, 2))).replace(/-/g, '/'),
		d = new Date(sBirthday)
	if (sBirthday != (d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate())) {
		console.log('身份证上的出生日期非法')
		return false
	}

	// 身份证号码校验
	var sum = 0,
		weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
		codes = '10X98765432'
	for (var i = 0; i < sId.length - 1; i++) {
		sum += sId[i] * weights[i]
	}
	var last = codes[sum % 11] //计算出来的最后一位身份证号码
	if (sId[sId.length - 1] != last) {
		console.log('你输入的身份证号非法')
		return false
	}

	return true
}

/**
 * @desc 阿拉伯转换成中文
 * @param {*} num
 */
export const numberToChinese = (num) => {
	var AA = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十')
	var BB = new Array('', '十', '百', '仟', '萬', '億', '点', '')
	var a = ('' + num).replace(/(^0*)/g, '').split('.'),
		k = 0,
		re = ''
	for (var i = a[0].length - 1; i >= 0; i--) {
		switch (k) {
		case 0:
			re = BB[7] + re
			break
		case 4:
			if (!new RegExp('0{4}//d{' + (a[0].length - i - 1) + '}$')
				.test(a[0]))
				re = BB[4] + re
			break
		case 8:
			re = BB[5] + re
			BB[7] = BB[5]
			k = 0
			break
		}
		if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
			re = AA[0] + re
		if (a[0].charAt(i) != 0)
			re = AA[a[0].charAt(i)] + BB[k % 4] + re
		k++
	}

	if (a.length > 1) // 加上小数部分(如果有小数部分)
	{
		re += BB[6]
		for (var i = 0; i < a[1].length; i++)
			re += AA[a[1].charAt(i)]
	}
	if (re == '一十')
		re = '十'
	if (re.match(/^一/) && re.length == 3)
		re = re.replace('一', '')
	return re
}

/**
 * @desc 将数字转换成大写金额
 * @param {*} Num
 */
export const changeToChinese = (Num) => {
	//判断如果传递进来的不是字符的话转换为字符
	if (typeof Num == 'number') {
		Num = new String(Num)
	}
	Num = Num.replace(/,/g, '') //替换tomoney()中的“,”
	Num = Num.replace(/ /g, '') //替换tomoney()中的空格
	Num = Num.replace(/￥/g, '') //替换掉可能出现的￥字符
	if (isNaN(Num)) { //验证输入的字符是否为数字
		//alert("请检查小写金额是否正确");
		return ''
	}
	//字符处理完毕后开始转换，采用前后两部分分别转换
	var part = String(Num).split('.')
	var newchar = ''
	//小数点前进行转化
	for (var i = part[0].length - 1; i >= 0; i--) {
		if (part[0].length > 10) {
			return ''
			//若数量超过拾亿单位，提示
		}
		var tmpnewchar = ''
		var perchar = part[0].charAt(i)
		switch (perchar) {
		case '0':
			tmpnewchar = '零' + tmpnewchar
			break
		case '1':
			tmpnewchar = '壹' + tmpnewchar
			break
		case '2':
			tmpnewchar = '贰' + tmpnewchar
			break
		case '3':
			tmpnewchar = '叁' + tmpnewchar
			break
		case '4':
			tmpnewchar = '肆' + tmpnewchar
			break
		case '5':
			tmpnewchar = '伍' + tmpnewchar
			break
		case '6':
			tmpnewchar = '陆' + tmpnewchar
			break
		case '7':
			tmpnewchar = '柒' + tmpnewchar
			break
		case '8':
			tmpnewchar = '捌' + tmpnewchar
			break
		case '9':
			tmpnewchar = '玖' + tmpnewchar
			break
		}
		switch (part[0].length - i - 1) {
		case 0:
			tmpnewchar = tmpnewchar + '元'
			break
		case 1:
			if (perchar != 0) tmpnewchar = tmpnewchar + '拾'
			break
		case 2:
			if (perchar != 0) tmpnewchar = tmpnewchar + '佰'
			break
		case 3:
			if (perchar != 0) tmpnewchar = tmpnewchar + '仟'
			break
		case 4:
			tmpnewchar = tmpnewchar + '万'
			break
		case 5:
			if (perchar != 0) tmpnewchar = tmpnewchar + '拾'
			break
		case 6:
			if (perchar != 0) tmpnewchar = tmpnewchar + '佰'
			break
		case 7:
			if (perchar != 0) tmpnewchar = tmpnewchar + '仟'
			break
		case 8:
			tmpnewchar = tmpnewchar + '亿'
			break
		case 9:
			tmpnewchar = tmpnewchar + '拾'
			break
		}
		var newchar = tmpnewchar + newchar
	}
	//小数点之后进行转化
	if (Num.indexOf('.') != -1) {
		if (part[1].length > 2) {
			// alert("小数点之后只能保留两位,系统将自动截断");
			part[1] = part[1].substr(0, 2)
		}
		for (i = 0; i < part[1].length; i++) {
			tmpnewchar = ''
			perchar = part[1].charAt(i)
			switch (perchar) {
			case '0':
				tmpnewchar = '零' + tmpnewchar
				break
			case '1':
				tmpnewchar = '壹' + tmpnewchar
				break
			case '2':
				tmpnewchar = '贰' + tmpnewchar
				break
			case '3':
				tmpnewchar = '叁' + tmpnewchar
				break
			case '4':
				tmpnewchar = '肆' + tmpnewchar
				break
			case '5':
				tmpnewchar = '伍' + tmpnewchar
				break
			case '6':
				tmpnewchar = '陆' + tmpnewchar
				break
			case '7':
				tmpnewchar = '柒' + tmpnewchar
				break
			case '8':
				tmpnewchar = '捌' + tmpnewchar
				break
			case '9':
				tmpnewchar = '玖' + tmpnewchar
				break
			}
			if (i == 0) tmpnewchar = tmpnewchar + '角'
			if (i == 1) tmpnewchar = tmpnewchar + '分'
			newchar = newchar + tmpnewchar
		}
	}
	//替换所有无用汉字
	while (newchar.search('零零') != -1)
		newchar = newchar.replace('零零', '零')
	newchar = newchar.replace('零亿', '亿')
	newchar = newchar.replace('亿万', '亿')
	newchar = newchar.replace('零万', '万')
	newchar = newchar.replace('零元', '元')
	newchar = newchar.replace('零角', '')
	newchar = newchar.replace('零分', '')
	if (newchar.charAt(newchar.length - 1) == '元') {
		newchar = newchar + '整'
	}
	return newchar
}

/**
 * @desc 去除空格 type: 1-所有空格 2-前后空格 3-前空格 4-后空格
 * @param {*} str
 * @param {*} type
 */
export const trim = (str, type) => {
	type = type || 1
	switch (type) {
	case 1:
		return str.replace(/\s+/g, '')
	case 2:
		return str.replace(/(^\s*)|(\s*$)/g, '')
	case 3:
		return str.replace(/(^\s*)/g, '')
	case 4:
		return str.replace(/(\s*$)/g, '')
	default:
		return str
	}
}

/**
 * @desc 检测密码强度
 * @param {*} str
 */
export const checkPwd = (str) => {
	var Lv = 0
	if (str.length < 6) {
		return Lv
	}
	if (/[0-9]/.test(str)) {
		Lv++
	}
	if (/[a-z]/.test(str)) {
		Lv++
	}
	if (/[A-Z]/.test(str)) {
		Lv++
	}
	if (/[\.|-|_]/.test(str)) {
		Lv++
	}
	return Lv
}

/**
 * @desc .判断两个对象是否键值相同
 * @param {*} a
 * @param {*} b
 */
export const isObjectEqual = (a, b) => {
	var aProps = Object.getOwnPropertyNames(a)
	var bProps = Object.getOwnPropertyNames(b)

	if (aProps.length !== bProps.length) {
		return false
	}

	for (var i = 0; i < aProps.length; i++) {
		var propName = aProps[i]

		if (a[propName] !== b[propName]) {
			return false
		}
	}
	return true
}
