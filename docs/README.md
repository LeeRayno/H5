# 笔记

该文档采用 [docute](https://github.com/egoist/docute) 编写

## 闭包

### 什么是闭包

[JavaScript 闭包的底层运行机制](http://blog.leapoahead.com/2015/09/15/js-closure/)

> 当函数可以 **记住** 并 **访问** 所在的词法作用域，即使函数是在当前词法作用域之外执行，这时就产生了闭包  
> 即函数在 **调用** 时可以访问他在 **定义** 时的词法作用域

常见的如 函数作为返回值，函数作为参数传递

```js
// demo1
var a = 1
function foo() {
  var a = 2
  console.log(a) // 2
  bar() // 1 在这里调用访问的是他定义的时候的词法作用域
}

function bar() { // 在这里定义
  console.log(a)
}

foo()

// demo2
var a = 1
function foo() {
  a = 2 // 这里改变了全局的 a ⚠️⚠️⚠️⚠️⚠️
  console.log(a) // 2
  bar() // 2 在这里调用访问的是他定义的时候的词法作用域
}

function bar() { // 在这里定义
  console.log(a)
}

foo()

// demo3 返回函数
function foo() {
  var a = 2;

  function bar() { // 在这里定义
    console.log(a);
  }

  return bar;
}

var baz = foo();
baz(); // 2 在这里调用

// demo4 回调函数
function debounce(cb, delay = 300) {
  let timer;

  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb && cb.apply(this, args);
    }, delay);
  };
}
```

### 如何释放闭包

> 闭包是什么时候被销毁的？当它不被任何其他的对象引用的时候。

## 作用域链

> 函数在查找一个变量时，先在自己的函数作用域中查找，如果没有找到就去父函数作用域查找，一直往上面找，就形成了作用域链

## 原型链

> 对象在查找某一个属性时，先找自己，没有找到再依次往上面找，就形成了原型链

记住：实例的链式原型(`__proto__`)永远指向该实例的构造函数的原型(`prototype`)

即：`instance.__proto__ === Constructor.prototype`

记住：所有构造函数都是`Function`的实例,包括`Function`自己，所有的原型对象的`prototype`都是`Object`的实例除了`Object`自身

```js
// demo 理解
// 1. Function 是 Function 的实例, 所以实例的 __proto__ 指向构造的 prototype
Function.__proto__ === Function.prototype

// 2. 所有的 原型对象的 prototype 都是 Object 的实例，除了 Object 自己

// Function.prototype 是 Object 的实例，实例的 __proto__ 永远指向 构造的 prototype
Function.prototype.__proto__ === Object.prototype

// 除了 Object 自己
Object.prototype.__proto__ === null

// Object 也是构造函数,所以 Object 是 Function 的实例
Object.__proto__ === Function.prototype


```

```js
Object.prototype.__proto__ === null
Object.__proto__ === Function.prototype
Function.prototype.__proto__ === Object.prototype
Function.__proto__ === Function.prototype

```

![原型链](https://tva1.sinaimg.cn/large/007S8ZIlly1gg6t1tgsc9j30n00rsavw.jpg)

## GET & POST

> GET 和 POST 的区别 [原文链接](https://sunshinevvv.coding.me/blog/2017/02/09/HttpGETv.s.POST/)

| 方法             | GET                                                                                                       | POST                                                                               |
| ---------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 后退按钮/刷新    | 无害                                                                                                      | 数据会被重新提交(浏览器应该告知用户数据会被重新提交)                               |
| 书签             | 可收藏为书签                                                                                              | 不可收藏为书签                                                                     |
| 历史             | 参数保留在浏览器历史中                                                                                    | 参数不会保存在浏览器历史中                                                         |
| 缓存             | 能被缓存                                                                                                  | 不能被缓存                                                                         |
| 编码类型         | application/x-www-form-urlencoded                                                                         | application/x-www-form-urlencoded 或 multipart/form-data。为二进制数据使用多重编码 |
| 对数据长度的限制 | 是的。当发送数据时，GET 方法向 URL 添加数据；URL 的长度是受限制的(URL 的最大长度是 2048 个字符)           | 无限制                                                                             |
| 对数据类型的限制 | 只允许 ASCII 字符                                                                                         | 没有限制，也允许二进制数据                                                         |
| 安全性           | 与 POST 相比，GET 的安全性较差，因为所发送的数据时 URL 的一部分，在发送密码或其他敏感信息时绝不要使用 GET | POST 比 GET 更安全，因为参数不会被保存在浏览器历史中或 web 服务器日志中            |
| 可见性           | 数据在 URL 中对所有人都是可见的                                                                           | 数据不会显示在 URL 中                                                              |

## 性能优化

> 性能优化是软件工程永恒的话题，前端的性能优化大头基本上在网络这个层面

- 雅虎军规
- 缓存
- 图片懒加载
- 组件路由级别的代码分割
- transfrom -> top/left （提升合成层）
- will-change: scroll-position // 表示开发者希望在不久后改变滚动条的位置或者使之产生动画。
- webpack 打包优化(减少文件搜索范围,Dll动态链接库，commchunksplugin)
- 防抖(debounce) 适用场景
  - 每次 resize/scroll 触发统计事件
  - input 搜索输入框，输入完成才去发送搜索请求，减小服务器压力
- 节流(throttle)适用场景
  - DOM 元素的拖拽功能实现（mousemove）
  - 射击游戏的 mousedown/keydown 事件（单位时间只能发射一颗子弹）
  - 计算鼠标移动的距离（mousemove）
  - Canvas 模拟画板功能（mousemove）
  - 监听滚动事件判断是否到页面底部自动加载更多：给 scroll 加了 debounce 后，只有用户停止滚动后，才会判断是否到了页面底部；如果是 throttle 的话，只要页面滚动就会间隔一段时间判断一次

## reflow、repaint

> 回流、重绘

[segmengfaulf](https://segmentfault.com/a/1190000008849210)
[掘金](https://juejin.im/post/5ca0c0abe51d4553a942c17d?utm_source=gold_browser_extension)

<p class="warning">
回流一定会触发重绘，重绘不一定会回流
</p>

浏览器渲染过程：

1. parse HTML 解析 HTML 生成 DOM Tree
2. parse CSS 解析 CSS 生成 CSSOM Tree
3. 组合 HTML Tree 和 CSSOM Tree 构建 Render Tree
4. reflow 根据 Render Tree 计算每个可见元素的布局(Layout)，即几何属性
5. repaint 通过绘制流程，将每个元素渲染到屏幕上

### reflow

reflow 在渲染过程中称为回流，发生在 Render Tree 阶段，它主要用来确定每个元素在屏幕上的几何属性(位置，大小等)，需要大量计算，**每改变一个元素几何属性，均会发生一次回流**

### repaint

erpaint 在渲染过程称为重绘，发生在 reflow 之后，当元素的集合属性确定之后便要开始将元素绘制在屏幕上，repaint 执行过程就是将元素的色彩(背景色，颜色等)属性绘制出来，**每改变一次颜色属性，均会对相关元素执行一次重绘**

#### 如何触发回流，重绘

1. 改变元素 `fontSize`:

```js
ele.style.fontSize = "10px"; // reflow, repaint
```

2. 改变元素盒模型(几何尺寸)width, padding, margin, border

```js
ele.style.width = "100px"; // reflow, repaint
ele.style.margin = "100px"; // reflow, repaint
ele.style.padding = "100px"; // reflow, repaint
ele.style.border = "1px solid red"; // reflow, repaint
```

3. 改变元素颜色、背景色等

```js
ele.style.color = "red"; // repaint
ele.style.backgroundColor = "blue"; // repaint
```

4. 特殊 `offset*`、`scroll*`、`client*`、`getComputedStyle`、`currentStyle`

#### 如何减少回流，重绘

1. 减少 JS 逐行修改元素样式

```js
ele.classList.add("className");
```

2. 减少样式的重新计算，即减少 `offset`、`scroll`、`client*`、`getComputedStyle`、`currentStyle` 的使用，因为每次调用都会刷新操作缓冲区，执行 reflow & repaint。

## Promise

简易实现 promise [原文链接](https://levelup.gitconnected.com/understand-javascript-promises-by-building-a-promise-from-scratch-84c0fd855720)

```js
class PromiseSimple {
  constructor(excuteFn) {
    this.promiseChainFns = [];
    this.handleError = () => {};

    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);

    this.excuteFn(this.resolve, this.reject);
  }

  then(fn) {
    this.promiseChainFns.push(fn);

    return this;
  }

  catch(handleError) {
    this.handleError = handleError;

    return this;
  }

  resolve(v) {
    try {
      let storeValue = v;
      this.promiseChainFns.forEach(fn => {
        storeValue = fn(storeValue);
      });
    } catch (error) {
      this.promiseChainFns = [];

      this.reject(error);
    }
  }

  reject(error) {
    this.handleError(error);
  }
}
```

## call、apply、bind

🐶💯 简易实现 call、apply、bind [参考原文](https://segmentfault.com/a/1190000014448674)

```js
/**
 * call
 *
 * o1.fn.call(o2)
 * 将 fn 里面的 this 指向 o2, 即方法借用
 * 核心思想就是 o2 没有 fn 这个方法，那我们给 o2 创建一个 方法 等于 fn不就可以了.
 *
 * fn.mycall(o2)
 *
 */

Function.prototype.mycall = function(ctx, ...args) {
  const hash = Date.now(); // 避免 ctx 有 某个特定的属性而产生冲突 如： ctx.fn 所以采用时间戳避免属性名重复
  ctx[hash] = this; // 即给 ctx 加个 方法 这个方法就是 fn 实例

  const res = ctx[hash](...args);

  delete ctx[hash];

  return res;
};

/**
 * apply 思想一致，只是接收参数为数组
 */

Function.prototype.myapply = function(ctx, args = []) {
  const hash = Date.now();

  ctx[hash] = this;

  const res = ctx[hash](...args);

  delete ctx[hash];

  return res;
};

/**
 * bind
 *
 *一个函数被 bind 之后，以后无论怎么调用 call、apply、bind, this 指向都不会变，都是第一 bind 的上下文，因为他始终返回 ctx.fn 执行之后的值，即闭包原理
 * 借用 apply 实现
 *
 * 如需要考虑 关键字 new 轻参照 MDN上面实现
 *
 */

Function.prototype.mybind = function(ctx, ...args1) {
  const _this = this;

  return function(...args2) {
    // apply 可以参照上面实现
    return _this.apply(ctx, args1.concat(args2)); // 将 bind 的参数和 执行时的参数合并
  };
};

// 测试

const a = {
  name: "a",
  fn: function() {
    console.log(this.name);
    // console.log(arguments.length)
  }
};

const b = {
  name: "b"
};

a.fn.mycall(b, 1, 2);
a.fn.myapply(b, [1, 2]);
a.fn.mybind(b, 1, 2)(3, 4);
// b
```

## 柯里化

柯里化（Currying）,维基百科上的解释是，把接受多个参数的函数转换成接受一个单一参数的函数 [参考原文](https://www.jqhtml.com/33137.html)
> 核心思想就是 **判断所有参数个数是否相等** 如果`_add`接收的参数的个数大于等于传入的函数`add`的参数的个数时就执行传入的函数，否则就返回里面的函数

```js
function add(a, b, c) {
  return a + b + c;
}

function currying(fn, ...args) {
  const { length } = fn;
  let allArgs = [...args];

  return function inner(...args1) {
    allArgs = allArgs.concat(...args1);

    // 如果参数 大于等于 fn 得参数 就 执行
    return allArgs.length >= length ? fn.apply(this, allArgs) : inner;
  };
}

// 测试
const _add = currying(add);

console.log(_add(1)(2)(3));
console.log(_add(1,2)(3));
console.log(_add(1,2,3))

const _add2 = currying(add, 1)
console.log(_add2(2,3))
console.log(_add2(2)(3))
// 6
```

## Ajax、Jsonp

### Ajax

To send an HTTP request, create an XMLHttpRequest object, open a URL, and send the request. After the transaction completes, the object will contain useful information such as the response body and the HTTP status of the result.

```js
/**
 * 调用
 * ajax({
 *  url: '',
 *  data: {
 *    a: 1,
 *    b: 2
 *  }
 *  method: 'get',
 *  cache: false,
 *  timeout: 3000,
 *  success: function() {},
 *  fail: function() {}
 * })
 *
 */
function ajax({
  url = "",
  data = {},
  method = "get",
  cache = false,
  success = null,
  fali = null,
  timeout = 3000
} = {}) {
  if (!url) return;

  // 创建 ajax 对象
  const oAjax = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP");

  // 是否缓存
  if (!cache) data._ = Date.now();

  // 发送数据
  switch (method.toLowerCase()) {
    case "get":
      oAjax.open("get", `${url}?${data2Url(data)}`, true);
      oAjax.send();
    case "post":
      oAjax.open("post", url);
      oAjax.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      oAjax.send(data2Url(data));
  }

  // 接受数据
  let timer;
  oAjax.onreadystatechange = function() {
    if (oAjax.readystate === 4) {
      clearTimeout(timer);
      const { status, responseText } = oAjax;
      if ((status >= 200 && status < 300) || status === 304) {
        success && success(responseText);
      } else {
        fail && fail(status);
      }
    }
  };

  timer = setTimeout(() => {
    fail && fail("网络异常!");
    oAjax.onreadystatechange = null;
  }, timeout);
}
```

### Jsonp

```js
// utils

/**
 * 将 json 转换成 url 如 {a:1,b:2} => a=1&b=2
 *
 */
function data2Url(json = {}) {
  return Object.keys(json)
    .reduce((acc, cur) => {
      acc.push(`${cur}=${json[cur]}`);
      return acc;
    }, [])
    .join("&");
}

/**
 *
 * Jsonp 原理即动态加载 script 标签。
 * callback 为特定标识 通过 url 传到后台去，后台需要通过 cb 来解析 获取函数 如： a=1&cb=jsonp_1552289219269
 * callbackFn 为 自定义得回调函数，后台会解析 cb 之后 返回 如： jsonp_1552289219269({status: 0, data: {},...})
 *
 */
function jsonp({ url = "", data = {}, callback = "cb", success = null } = {}) {
  if (!url) return;

  const callbackFn = `jsonp_${Date.now()}`;
  data[callback] = callbackFn;

  const oHead = document.querySelector("head");
  const oScript = document.createElement("script");

  const src = `${url}?${data2Url(data)}`;
  oScript.src = src;

  oHead.appendChild(oScript);

  window[callbackFn] = function(res) {
    success && success(res);
    // GC 垃圾回收
    oHead.removeChild(oScript);
    window[callbackFn] = null;
  };
}

// 也可以不用回调，返回一个promise

function jsonp({ url = "", data = {}, callback = "cb" }) {
  if (!url) return;
  return new Promise((resolve, reject) => {
    const callbackFn = `jsonp_${Date.now()}`;
    data[callback] = callbackFn;

    const oHead = document.querySelector("head");
    const oScript = document.createElement("script");

    const src = `${url}?${data2Url(data)}`;
    oScript.src = src;

    oHead.appendChild(oScript);

    window[callback] = function(res) {
      resolve(res);

      oHead.removeChild(oScript);
      window[callback] = null;
    };
  });
}

// jsonp().then()

// 以百度搜索接口来测试

jsonp({
  url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
  data: {
    wd: "a",
    json: 1,
    sid: "1423_21089_28607_28584_28557_28604_28605",
    req: 2,
    csor: 1,
    _: Date.now()
  },
  callback: "cb",
  success: function(res) {
    console.log(res);
  }
});
```

## 跨域总结

什么是同源策略？ [原文](https://juejin.im/post/5c9c38e2e51d452db7007f66?utm_source=gold_browser_extension)

> 所谓同源策略是指`协议+域名+端口`三者相同，即便两个不同的域名指向同一个`ip`地址,也非同源。他是浏览器最核心也最基本的功能，如果没有同源策略，浏览器很容熙收到`XSS`,`CSFR`等攻击

<p class="danger">同源策略限制以下几种行为：</p>

1. Cookie, LocalStorage, IndexDB 无法读取
2. Ajax 无法发送
3. DOM 无法获取

### 跨域解决方案

1. Jsonp
2. CORS
3. ngnix 反向代理
4. nodejs 中间件代理跨域
5. WebSocket 协议跨域
6. postMessage
7. document.domain + iframe
8. location.hash + iframe
9. window.name + iframe

#### JSONP

优点：Jsonp 是服务端与客户端跨源通信最常用的方法，最大的特点是简单适用，老式浏览器全部支持，服务器改造非常小；  
缺点：只能实现 get 一种请求，不安全，容易招受`xss`攻击

#### CORS

> CORS 是 W3C 标准，全称是**跨域资源共享**(Cross-origin resource sharing)它允许浏览器向跨源服务器发出`XMLHttpRequest`请求，从而克服了`Ajax`只能使用同源的限制

1. 目前，所有浏览器都支持该功能(IE8+：IE8/9 需要使用 XDomainRequest 对象来支持 CORS）)，CORS 也已经成为主流的跨域解决方案。
2. 整个 CORS 通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS 通信与同源的 AJAX 通信没有差别，代码完全一样。浏览器一旦发现 AJAX 请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。
3. CORS 与 JSONP 的使用目的相同，但是比 JSONP 更强大。JSONP 只支持 GET 请求，CORS 支持所有类型的 HTTP 请求。JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS 的网站请求数据。
4. 浏览器默认是不允许跨域可发送 `cookie` 到服务端的，通过`CORS`可以

```js
// 客户端代码
const xhr = new XMLHttpRequest(); // create
xhr.open("GET", "http://localhost:3001/cors"); // open
xhr.withCredentials = true; // 客户端必须设置允许发送cookie
xhr.send(); // send

// 服务端代码
const express = require("express");
const app = express();
app.get("/cors", (req, res) => {
  res.set("Access-control-Allow-Credentials", true); // 设置为true 接收 cookie
  res.set("Access-control-Allow-Origin", "http://localhost:3000"); // 不能设置为 * 必须指定某一个源
});
app.listen(3001, () => console.log("app listing 3001"));
```

#### NGNIX

> 跨域原理： 同源策略是浏览器的安全策略，不是 HTTP 协议的一部分，服务端调用 HTTP 接口只是使用了 HTTP 协议不会执行 JS 脚本不需要同源策略，也就不存在跨域问题。

实现思路：通过 nginx 配置一个代理服务器（域名与 domain1 相同，端口不同）做跳板机，反向代理访问 domain2 接口，并且可以顺便修改 cookie 中 domain 信息，方便当前域 cookie 写入，实现跨域登录。

```ngnix
#proxy服务器
server {
    listen       81;
    server_name  www.domain1.com;

    location / {
        proxy_pass   http://www.domain2.com:8080;  #反向代理
        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
        index  index.html index.htm;

        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
        add_header Access-Control-Allow-Credentials true;
    }
}
```

#### nodejs 中间件代理

node 中间件实现跨域代理，原理大致与 nginx 相同，都是通过启一个代理服务器，实现数据的转发，也可以通过设置 cookieDomainRewrite 参数修改响应头中 cookie 中域名，实现当前域的 cookie 写入，方便接口登录认证。

#### websocket

WebSocket protocol 是 HTML5 一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是 server push 技术的一种很好的实现。  
WebSocket 是一种通信协议，使用 ws://（非加密）和 wss://（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

#### postMessage

HTML5 为了解决这个问题，引入了一个全新的 API：跨文档通信 API（Cross-document messaging）。  
这个 API 为 window 对象新增了一个 window.postMessage 方法，允许跨窗口通信，不论这两个窗口是否同源。  
postMessage 方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即`协议 + 域名 + 端口`。也可以设为`*`，表示不限制域名，向所有窗口发送。

#### document.domain + iframe

此方案仅限主域相同，子域不同的跨域应用场景(网页一级域名相同，只是二级域名不同)。实现原理：两个页面都通过 js 强制设置 document.domain 为基础主域，就实现了同域。

#### location.hash

实现原理： a 与 b 跨域相互通信，通过中间页 c 来实现(且 c 与 a 是同域)。 三个页面，不同域之间利用 iframe 的 location.hash 传值，相同域之间直接 js 访问来通信。具体实现：A 域：a.html -> B 域：b.html -> A 域：c.html，a 与 b 不同域只能通过 hash 值单向通信，b 与 c 也不同域也只能单向通信，但 c 与 a 同域，所以 c 可通过 parent.parent 访问 a 页面所有对象。

#### window.name + iframe

浏览器窗口有 window.name 属性。这个属性的最大特点是，无论是否同源，只要在同一个窗口里，前一个网页设置了这个属性，后一个网页可以读取它。并且可以支持非常长的 name 值（2MB）。

## XSS & CSRF

### XSS

[原文](https://github.com/dwqs/blog/issues/68)
> XSS，即 Cross Site Script，中译是跨站脚本攻击；其原本缩写是 CSS，但为了和层叠样式表(Cascading Style Sheet)有所区分，因而在安全领域叫做 XSS。  
> XSS 攻击是指攻击者在网站上注入恶意的客户端代码，通过恶意脚本对客户端网页进行篡改，从而在用户浏览网页时，对用户浏览器进行控制或者获取用户隐私数据的一种攻击方式。

XSS攻击可以分为3类：反射型（非持久型）、存储型（持久型）、基于DOM。

- **反射型** XSS 只是简单地把用户输入的数据 “反射” 给浏览器
- **存储型** XSS 会把用户输入的数据 "存储" 在服务器端，当浏览器请求数据时，脚本从服务器上传回并执行
- **基于 DOM** 的 XSS 攻击是指通过恶意脚本修改页面的 DOM 结构，是纯粹发生在客户端的攻击

### CSRF

>CSRF，即 Cross Site Request Forgery，中译是跨站请求伪造，是一种劫持受信任用户向服务器发送非预期请求的攻击方式。

### 防御

1. 防御XSS攻击
   1. HttpOnly 防止窃取 cookie
   2. 用户的检查输入(白名单)
   3. 服务端的输出检查
2. 防御CSRF攻击
   1. 验证码
   2. Reffer Check
   3. Token 验证

## for...in  &  for...of

### for...in

> for...in 一般 循环某个对象的**可枚举**属性包括**原型链**上面的属性, 并且循环的是`key`

```js
function Parent(name) {
  this.name = name
}

Parent.prototype.say = function() {
  console.log(this.name)
}

function Child(name, age) {
  Parent.call(this, name) // 属性继承

  this.age = age
}

Child.prototype = Object.create(Parent.prototype) // 方法继承
Child.prototype.constructor = Child

const p = new Parent('p')

for (const name in p) {
  console.log(name)
}
// logs: name, say

const c = new Child('c')

for (const name in c) {
  console.log(name)
}
// logs: name, age, say, constructor

for (const name in c) {
  if (c.hasOwnProperty(name)) {
    console.log(name)
  }
}

// logs: name, age  相当于Object.keys(c)
```

### for...of

> 一般循环有**可迭代对象**(Symbol.iterator)的数据, eg: Array, Map, Set...,并且循环的是`value`

```js

const arr = [1,2,3]

for(const v of arr) {
  console.log(v)
}
// logs: 1,2,3

for (const k in arr) {
  console.log(k)
}
// logs: 0,1,2
```
