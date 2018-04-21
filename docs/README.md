# 面试笔记

该文档采用 [docute](https://github.com/egoist/docute) 编写

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

## 作用域链

> 函数在查找一个变量时，先在自己的函数作用域中查找，如果没有找到就去父函数作用域查找，一直往上面找，就形成了作用域链

## 原型链

> 对象在查找某一个属性时，先找自己，没有找到再依次往上面找，就形成了原型链
