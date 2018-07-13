# 你不知道的 Javascript 中卷笔记

## `toFixed`

> 对于`.`运算符需要给予特别注意，因为它是一个有效的数字字符，会被优先识别为数字常量的一部分，然后才是对象属性访问运算符。

``` js

42.toFixed(3)     // Uncaught SyntaxError: Invalid or unexpected token

(42).toFixed(3)   // "42.000"
0.42.toFixed(3)   // "0.420"
42..toFixed(3)    // "42.000"
```

## `0.1 + 0.2 === 0.3; // false`

> 二进制浮点数最大的问题（不仅 JavaScript，所有遵循 IEEE 754 规范的语言都是如此）

``` js
0.1 + 0.2 = 0.30000000000000004

// polyfill
if (!Number.EPSILON) {
  Number.EPSILON = Math.pow(2, -52)
}

function numbersCloseEnoughTOEqual(n1, n2) {
  return Math.abs(n1 - n2) < Number.EPSILON
}

const a = 0.1 + 0.2
const b = 0.3
numbersCloseEnoughTOEqual(a, b) // true
numbersCloseEnoughTOEqual(0.000001, 0.000002) // fasle
```

## [[Class]]

> 所有 typeof 返回值为 "object" 的对象（如数组）都包含一个内部属性 [[Class]]

``` js
Object.prototype.toString.call(null)  // "[object Null]"

Object.prototype.toString.call(undefined) // "[object Undefined]"

Object.prototype.toString.call('abc')  // "[object String]"

Object.prototype.toString.call(123)  // "[object Number]"

Object.prototype.toString.call(true) // "[object Boolean]"

Object.prototype.toString.call([])  // "[object Array]"

Object.prototype.toString.call({}) // "[object Object]"

Object.prototype.toString.call(/a/i) // "[object RegExp]"

Object.prototype.toString.call(function() {}) // "[object Function]"
```

## falsy

``` js
1. false
2. null
3. undefined
4. ±0
5. NaN
6. "" // Tip " " 为 true
```

## timestamp

> `Unix` 时间戳单位是`秒`、`js` 时间戳单位是`毫秒`

``` js
Date.now() // ES5 推荐，一般用于获取当前时间戳
(new Date()).getTime() // 一般用来获得指定时间得时间戳
+new Date()
```

## || 和 &&

> && 和 || 运算符的返回值并不一定是布尔类型，而是两个操作数其中一个的值。

``` js
a || b  // 大致相当于 a ? a : b
1 || 2  // 1
a = b || 'something'

a && b  // 大致相当于 a ? b : a
1 && 2  // 2
callback && callback()  // 守护运算符(guard operator)
```
