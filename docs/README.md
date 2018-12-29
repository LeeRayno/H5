# 笔记

该文档采用 [docute](https://github.com/egoist/docute) 编写

## 闭包

### 什么是闭包

[JavaScript闭包的底层运行机制](http://blog.leapoahead.com/2015/09/15/js-closure/)

> `当函数可以记住并访问所在的词法作用域，即使函数是在当前词法作用域之外执行，这时就产生了闭包`

> `即函数在调用时可以访问他在定义时的词法作用域`

常见的如 函数作为返回值，函数作为参数传递

``` js
// 返回函数
function foo(){
  var a = 2;

  function bar(){
    console.log(a);
  }

  return bar;
}

var baz = foo();
baz(); // 2

// 回调函数
function debounce(cb, delay=300){
  let timer;

  return function(...args){
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb && cb.apply(this, args);
    }, delay)
  }
}
```

### 如何释放闭包

> 闭包是什么时候被销毁的？当它不被任何其他的对象引用的时候。

## 作用域链

> 函数在查找一个变量时，先在自己的函数作用域中查找，如果没有找到就去父函数作用域查找，一直往上面找，就形成了作用域链

## 原型链

> 对象在查找某一个属性时，先找自己，没有找到再依次往上面找，就形成了原型链

## GET & POST

> GET 和 POST 的区别 [原文链接](https://sunshinevvv.coding.me/blog/2017/02/09/HttpGETv.s.POST/)

| 方法 | GET | POST |
| ---- | ----- | ---- |
| 后退按钮/刷新 | 无害 | 数据会被重新提交(浏览器应该告知用户数据会被重新提交) |
| 书签 | 可收藏为书签 | 不可收藏为书签 |
| 历史 | 参数保留在浏览器历史中 | 参数不会保存在浏览器历史中 |
| 缓存 | 能被缓存 | 不能被缓存 |
| 编码类型 | application/x-www-form-urlencoded | application/x-www-form-urlencoded 或 multipart/form-data。为二进制数据使用多重编码 |
| 对数据长度的限制 | 是的。当发送数据时，GET 方法向 URL 添加数据；URL 的长度是受限制的(URL的最大长度是2048个字符) | 无限制 |
| 对数据类型的限制 | 只允许 ASCII 字符 | 没有限制，也允许二进制数据 |
| 安全性 | 与 POST 相比，GET 的安全性较差，因为所发送的数据时 URL 的一部分，在发送密码或其他敏感信息时绝不要使用GET | POST 比 GET 更安全，因为参数不会被保存在浏览器历史中或 web 服务器日志中 |
| 可见性 | 数据在 URL 中对所有人都是可见的 | 数据不会显示在 URL 中 |

## 性能优化

> 性能优化是软件工程永恒的话题，前端的性能优化大头基本上在网络这个层面

* 雅虎军规
* 缓存
* 懒加载
* 组件路由级别的代码分割
* 防抖(debounce)、节流(throttle)

## reflow、repaint

> 回流、重绘 [原文链接](https://segmentfault.com/a/1190000008849210) 

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

erpaint 在渲染过程称为重绘，发生在reflow 之后，当元素的集合属性确定之后便要开始将元素绘制在屏幕上，repaint 执行过程就是将元素的色彩(背景色，颜色等)属性绘制出来，**每改变一次颜色属性，均会对相关元素执行一次重绘**

#### 如何触发回流，重绘

1. 改变元素 `fontSize`:
```js
ele.style.fontSize = '10px' // reflow, repaint
```

2. 改变元素盒模型(几何尺寸)width, padding,  margin, border
```js
ele.style.width = '100px' // reflow, repaint
ele.style.margin = '100px' // reflow, repaint
ele.style.padding = '100px' // reflow, repaint
ele.style.border = '1px solid red' // reflow, repaint
```

3. 改变元素颜色、背景色等
```js
ele.style.color = 'red' // repaint
ele.style.backgroundColor = 'blue' // repaint
```

4. 特殊 `offset*`、`scroll*`、`client*`、`getComputedStyle`、`currentStyle`

#### 如何减少回流，重绘
1. 减少 JS 逐行修改元素样式

```js
ele.classList.add('className')
```
2. 减少样式的重新计算，即减少 `offset`、`scroll`、`client*`、`getComputedStyle`、`currentStyle` 的使用，因为每次调用都会刷新操作缓冲区，执行 reflow & repaint。
