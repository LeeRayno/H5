# 面试笔记

[在线阅读](https://leerayno.github.io/H5/)

## 闭包

### 什么是闭包

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
