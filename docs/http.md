# HTTP

## 浏览器（HTTP）缓存机制 

[原文链接](https://heyingye.github.io/2018/04/16/%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6/)

### 缓存过程分析

浏览器与服务器通信方式为应答模式，即 ** 浏览器发起请求 - 服务器相应该请求 **。 浏览器 * 第一次 * 向服务器发送请求后，会根据响应头缓存标识来将请求结果和缓存标识存入到 ** 浏览器缓存** 中 

* 浏览器每次发送请求，都会先在 * 浏览器缓存 * 中查找该请求结果和缓存标识（浏览器 —> 浏览器缓存 —> 服务器）
* 浏览器每次拿到相应结果都会将该结果和缓存标识存入浏览器缓存中

HTTP 缓存分为强制缓存和协商缓存

### 强制缓存

> 强制缓存就是向浏览器缓存查找该请求结果，并根据该结果的缓存规则来决定是否使用该缓存结果的过程，主要分三种情况

1. 存在该缓存结果和缓存标识，且缓存结果有效，则强制缓存生效。直接返回该结果(不发送请求)
2. 不存在该缓存结果和缓存标识，则强制缓存失效。则直接向服务器发送请求(跟第一次发送请求一致)
3. 存在该缓存结果和缓存标识，但该结果已经失效，则使用协商缓存

> 控制强制缓存的字段 是 `Cache-Control`和 `Expires`, 区别在于  `Cache-Control` 是 `HTTP/1.1` 的产物， `Expries` 是 `HTTP/1.0` 的产物， 当两者同时存在的话，`Catch-Control`的优先级大于`Expires`，在某些不支持`HTTP/1.1`的环境下，`Expires`就发挥作用，现阶段他的存在只是一种兼容性的写法

#### Cache-Control

> Cache-Control 主要取值如下：

* public: 所有内容都会被缓存，(客户端和代理服务器都可以缓存)
* pravite: 所有内容只有客户端可以缓存，`Catch-Control`的默认值
* no-catch: 客户端缓存，需要通过协商缓存来验证是否缓存
* no-store: 所有内容都不会被缓存，即不使用强制缓存，也不实用协商缓存
* max-age=300: 缓存内容将会在`300`秒后失效

#### Exipres

> 设置过期时间，如：`expires: Sat, 21 Apr 2018 06:06:15 GMT`

### 协商缓存

> 协商缓存是在强制缓存失效后，浏览器携带缓存标识向服务器发送请求，服务器根据缓存标识决定是否使用缓存的过程，主要以下两种情况：

#### 304(协商缓存生效)

浏览器携带缓存标识发起HTTP请求，服务器查找该资源无更新，返回304，向浏览器缓存要结果

#### 200(协商缓存失效)

浏览器携带缓存标识发起HTTP请求，服务器查找该资源已更新，返回200，重新返回资源给浏览器，并存入浏览器缓存中

协商缓存的控制字段为: `Etag/If-None-Matched` 和 `Last-Modified/If-Modified-Since`，优先级前者大于后者

#### Etag/If-None-Matched

> `Etag(Response Headers)` 是上一次加载资源时，服务器返回当前资源的唯一标识，由服务器生成 ,如： `Etag: b7d8eafd0a3f63f71de7534d02295a3d`。 `If-None-Mathced(Request Headers)`是客户端再次发送请求时，拿上一次的`Etag`作为值，如： `If-None-Match: b7d8eafd0a3f63f71de7534d02295a3d`。发送到服务器，服务器接收到`If-None-Matched`的值和`Etag`比较，如果相等代表资源未更新，命中协商缓存，返回状态码 `304`；不相等代表资源已更新，返回状态码 `200`

#### Last-Modified/If-Modified-Since

> `Last-Modified(Response Headers)`是资源最后一次更新时间，`If-Modified-Since`是客户端再次发送请求时，把上次的`Last-Modified`的时间作为值发送到服务器，如果`Last-Modified`大于`If-Modified-Since`的值，说明资源已更新，重新返回资源，返回状态码 `200`, 否则资源未更新，返回状态码`304`

### 如何清除缓存

> 实际工作中很多场景都需要避免浏览器缓存

1. 浏览器隐私模式
2. 设置请求头：`Cathce-Control: no-cache, no-store, must-revalidate`
3. 给资源加版本号,如： `<javascript src="../js/util.js?v=1.1.1"></javascript>`
4. meta 标签, 如： `<meta http-equiv="Catche-Control" content="no-catche, no-store, must-revalidate" />`

### 用户行为对浏览器缓存的控制

1. F5 刷新，浏览器会设置 `Cathce-Control: max-age=0`，跳过强制缓存判断，会进行协商缓存判断
2. Ctrl + F5 强制刷新，跳过强制缓存和协商缓存，直接从服务器获取资源
