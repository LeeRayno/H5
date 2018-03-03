/*
 * @Author: LeeRay
 * @Date: 2018-03-03 13:12:59
 * @Last Modified by: LeeRay
 * @Last Modified time: 2018-03-03 13:21:25
 */

// 常用工具函数整理

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
 * @desc 补零
 * @param {Number} n
 * @returns {Number}
 */
export const toDub = n => {
	return n < 10 ? '0' + n : '' + n
}

/**
 * @desc 金钱格式化
 * @param {Number} n
 * @returns {String}
 */
export const formatCash = n => {
	return n.toLocaleString()
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
	if ('classList' in ele) {
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
	if ('classList' in ele) {
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
	if ('classList' in ele) {
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
	if ('classList' in ele) {
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
		const now = +new Date()
		const context = this
		if (now - previous > delay) {
			cb && cb.apply(context, args)
			previous = now
		}
	}
}
