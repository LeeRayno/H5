# 面试题

## 遍历DOM树

### 求html出现次数最多的标签

> 1. 注意获取 dom 元素一定要用 querySelectorAll
> 2. nodeType === 1 才是 dom 节点
> 3. 有子节点就递归

```js
let res = {}
function getMaxTagName(node) {
  const arrNode = Array.from(node)

  arrNode.forEach(item => {
    const { nodeType, tagName, children } = item

    if (nodeType === 1) { // 如果是 dom 节点
      res[tagName] = (res[tagName] || 0) + 1

      if (children && children.length) {
        getMaxTagName(children)
      }
    }
  })

  return res
}

const = html = document.querySelectorAll('html') // 一定要用 All
const ret = getMaxTagName(html)
// {HTML: 1, HEAD: 1, STYLE: 1, SCRIPT: 2, BODY: 1, DIV: 3}

let name = ''
let max = 0
for(let key in ret) {
  if (ret[key] > max) {
    max = ret[key]
    name = key
  }
}

console.log(`出现最多的标签是${name}, 出现的次数是${max}`)
```

## 渲染100000条大数据

[原文](https://juejin.im/post/5d76f469f265da039a28aff7#heading-6)

> 1. 一次性渲染这么多数据页面肯定会卡死, 所以我们可以进行分段渲染
> 2. 利用 document.createDocumentFragment 文档碎片将每次的渲染的节点存入内存中
> 3. 利用 requestAnimationFrame 进行分段渲染

```js
function renderBigData(el, total=10000, once=10) {
  if (!el) return

  const totalAccount = total / once // 总共需要渲染多少次
  const curRenderIndex = 0 // 当前第几次渲染

  // 每一次渲染
  function renderOnce() {
    const fragment = document.createDocumentFragment();

    for(let i=0; i<once; i++) {
      const li  = document.createElement('li')
      li.innerText = (curRenderIndex * once) + (i + 1)
      fragment.appendChild(li)
    }
    el.appendChild(fragment)

    curRenderIndex +=1

    renderLoop()
  }

  // 循环渲染
  function renderLoop() {
    if (curRenderIndex < totalAccount) {
      window.requestAnimationFrame(renderOnce)
    }
  }

  renderLoop()
}

const ul = document.querySelector('ul')
renderBigData(ul)
```

## for & setTimeout

> setTimeout 会推入 macrotask 队列里去

```js
// 1
for(var i=0; i<5; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000)
}
// 1s 后，输出 5 个 5

// 2
for(var i=0; i<5; i++) {
  setTimeout(() => {
    console.log(i)
  }, i*1000)
}
// 每隔 1s 输出 一个 5 总共 5 个 5

// 3
for(let i=0; i<5; i++) {
  setTimeout(() => {
    console.log(i)
  }, i*1000)
}
// 每隔一秒输出一个数，依次 0 - 4

// 4
for(var i=0; i<5; i++) {
  ((j) => {
    setTimeout(() => {
      console.log(j)
    }, j*1000)
  })(i)
}
// 每隔一秒输出一个数，依次 0 - 4

// 5
for(var i=0; i<5; i++) {
  setTimeout((j) => {
    console.log(j)
  }, i*1000, i)
}
// 每隔一秒输出一个数，依次 0 - 4
```

## 数组乱序

[原文](https://www.zhihu.com/question/68330851)

```js
// 1. 洗牌算法
Array.prototype.shuffle = function() {
  const arr = this;
  for(let i=arr.length-1; i>=0; i--) {
    const rmd = Math.floor(Math.random()*(i+1)); // 一定要用;不然无法解析
    [arr[i], arr[rmd]] = [arr[rmd], arr[i]];
  }

  return arr
}

const arr = [1,2,3,4,5,6]
console.log(arr.shuffle())
console.log(arr.shuffle())
console.log(arr.shuffle())

// 2. 不准确
arr.sort((a,b) => {
  return Math.random() > 0.5
})


```

## 输出季度范围

```js
// 输出 getQuaterRange('2018Q1', '2020Q2') 之前的所有季度

function getQuaterRange(start, end) {
  const [startY, startQ] = start.split('Q').map(Number)
  const [endY, endQ] = end.split('Q').map(Number)

  let res = []
  for(let i=startY; i<=endY; i++) {
    for(let j=1; j<=4; j++) {
      if(!((i===startY && j<startQ) || (i===endY && j>endQ))) {
        res.push(`${i}Q${j}`)
      }
    }
  }

  return res
}

console.log(getQuaterRange('2018Q2', '2020Q3'))
```

## 数组铺平

```js
// 普通的铺平
const deepFlatten = (arr = []) => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v))

// 如果需要指定铺平到几层
const deepFlatten = (arr = [], deepth = 1) => [].concat(...arr.map(v => Array.isArray(v) && deepth > 1 ? deepFlatten(v, deepth-1) : v))

const a = [[1,2, [10, 20, [0]]],[3,4],[5,[6,7,[9]]], 12,1222]
console.log(deepFlatten(a,2))
```

## key 转换成下划线

```js
// 是否是对象
function isObj(obj) {
  return typeof obj === 'object' && obj !== null
}

// aBC  转换成 下划线 a_b_c
function snacklize(str) {
  return str.replace(/([A-Z])/g, (_, c) => `_${c.toLowerCase()}`)
}

function transform(data = {}, depth = 1) {
  let res = {}

  for(let key in data) {
    if(data.hasOwnProperty(key)) {
      const snackKey = snacklize(key)
      const cur = data[key]
      res[snackKey] = isObj(cur) && depth > 1 ? transform(cur, depth - 1) : cur
    }
  }

  return res
}

const res = {
  aBC: "123",
  cc: "asdf",
  cBA: {
    abBc: "asd",
    sDF: "asdf",
    ASD: {
      asd: 'asdf',
      SDFSDF: 'adf'
    }
  }
};

console.log(transform(res, 2));
```

## 模板引擎

```js
// https://juejin.cn/post/6987549240436195364?utm_source=gold_browser_extension#heading-194
const template = '嗨，{{ info.name.value }}您好，今天是星期 {{ day.value }}';

const data = {
  info: {
    name: {
      value: '张三'
    }
  },
  day: {
    value: '三'
  }
};

render(template, data); // 嗨，张三您好，今天是星期三

function render(template, data) {
  // .*? 经典的非贪婪匹配，
  // 还可以用 /{{([^}]*)}}/g 
  // {{ 后面不是数字就不需要转义
  return template.replace(/{{(.*?)}}/g, (_, a) => {
    const path = a?.trim()?.split('.');
    return getValue(data, path)
  })
}

function getValue(data, path) {
  try {
    return path.reduce((acc, cur) => {
      return acc[cur];
    }, data);
  } catch(e) {
    return undefined;
  }
}

```

## 数组去重

```js
const arr = [1,2,34,3423,1,2,34,3,4,5,6,7,7,7,73,3,32,2,2,2,2,1]

// 1.
const deduplicate = (arr = []) => {
  const map = new Map();
  return arr.filter(it => !map.has(it) && map.set(it))
}

console.log(deduplicate(arr))
```

## 两数之和

```js
// toSum([2, 13, 7, 8], 9) => [0, 2]
// 1. O(n^2)
function toSum(arr, target) {
  for(let i=0; i<arr.length; i++) {
    for(let j=i+1; j<arr.length; j++) {
      if (arr[i]+arr[j]=target) {
        return [i, j]
      }
    }
  }
}

// 2. O(n)
function toSum(arr, target) {
  let map = new Map();
  for(let i=0; i<arr.length; i++) {
    if (map.has(target - arr[i])) {
      return [map.get(target - arr[i]), i]
    } else {
      map.set(arr[i], i)
    }
  }
}
```

## Vue vs React

[原文](https://www.zhihu.com/question/301860721/answer/724759264)

1. 代码风格
   1. Vue template, 内置 v-for 等指令
   2. React jsx, 循环用 map 等
2. Vue 和 React 在理念上的差别(核心)
   1. Vue 对数据做劫持/代理，对数据更加敏感，精确。知道什么时候进行刷新
   2. React 推崇函数式，直接进行局部刷新，重新渲染，更加粗暴，简单，react不知道什么时候进行刷新，需要开发者手动调用 setState 告知 React 进行刷新
3. 事件系统
   1. React 对所有事件都进行了代理，全都代理到document上，暴露给开发者的不是原生事件，而是合成事件。
   2. Vue 事件处理函数this默认指向组件实例，React 需要bind.
   3. React的设计是改变开发者，你按照我的来，Vue 的设计是适应开发者，你怎么爽就怎么来
4. 预编译优化问题
