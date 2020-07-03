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
