# 面试题

## 遍历 DOM 树

### 求 html 出现次数最多的标签

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

## 渲染 100000 条大数据

[原文](https://juejin.im/post/5d76f469f265da039a28aff7#heading-6)

> 1. 一次性渲染这么多数据页面肯定会卡死, 所以我们可以进行分段渲染
> 2. 利用 document.createDocumentFragment 文档碎片将每次的渲染的节点存入内存中
> 3. 利用 requestAnimationFrame 进行分段渲染

```js
function renderBigData(el, total = 10000, once = 10) {
  if (!el) return;

  const totalAccount = total / once; // 总共需要渲染多少次
  const curRenderIndex = 0; // 当前第几次渲染

  // 每一次渲染
  function renderOnce() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < once; i++) {
      const li = document.createElement("li");
      li.innerText = curRenderIndex * once + (i + 1);
      fragment.appendChild(li);
    }
    el.appendChild(fragment);

    curRenderIndex += 1;

    renderLoop();
  }

  // 循环渲染
  function renderLoop() {
    if (curRenderIndex < totalAccount) {
      window.requestAnimationFrame(renderOnce);
    }
  }

  renderLoop();
}

const ul = document.querySelector("ul");
renderBigData(ul);
```

## for & setTimeout

> setTimeout 会推入 macrotask 队列里去

```js
// 1
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
// 1s 后，输出 5 个 5

// 2
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}
// 每隔 1s 输出 一个 5 总共 5 个 5

// 3
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}
// 每隔一秒输出一个数，依次 0 - 4

// 4
for (var i = 0; i < 5; i++) {
  ((j) => {
    setTimeout(() => {
      console.log(j);
    }, j * 1000);
  })(i);
}
// 每隔一秒输出一个数，依次 0 - 4

// 5
for (var i = 0; i < 5; i++) {
  setTimeout(
    (j) => {
      console.log(j);
    },
    i * 1000,
    i
  );
}
// 每隔一秒输出一个数，依次 0 - 4
```

## 数组乱序

[原文](https://www.zhihu.com/question/68330851)

```js
// 1. 洗牌算法
Array.prototype.shuffle = function () {
  const arr = this;
  for (let i = arr.length - 1; i >= 0; i--) {
    const rmd = Math.floor(Math.random() * (i + 1)); // 一定要用;不然无法解析
    [arr[i], arr[rmd]] = [arr[rmd], arr[i]];
  }

  return arr;
};

const arr = [1, 2, 3, 4, 5, 6];
console.log(arr.shuffle());
console.log(arr.shuffle());
console.log(arr.shuffle());

// 2. 不准确
arr.sort((a, b) => {
  return Math.random() > 0.5;
});
```

## 输出季度范围

```js
// 输出 getQuaterRange('2018Q1', '2020Q2') 之前的所有季度

function getQuaterRange(start, end) {
  const [startY, startQ] = start.split("Q").map(Number);
  const [endY, endQ] = end.split("Q").map(Number);

  let res = [];
  for (let i = startY; i <= endY; i++) {
    for (let j = 1; j <= 4; j++) {
      if (!((i === startY && j < startQ) || (i === endY && j > endQ))) {
        res.push(`${i}Q${j}`);
      }
    }
  }

  return res;
}

console.log(getQuaterRange("2018Q2", "2020Q3"));
```

## 数组铺平

```js
// 普通的铺平
const deepFlatten = (arr = []) =>
  [].concat(...arr.map((v) => (Array.isArray(v) ? deepFlatten(v) : v)));

// 如果需要指定铺平到几层
const deepFlatten = (arr = [], deepth = 1) =>
  [].concat(
    ...arr.map((v) =>
      Array.isArray(v) && deepth > 1 ? deepFlatten(v, deepth - 1) : v
    )
  );

const a = [[1, 2, [10, 20, [0]]], [3, 4], [5, [6, 7, [9]]], 12, 1222];
console.log(deepFlatten(a, 2));
```

## 铺平去重排序

编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组[原文](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/8)

```js
// 已知如下数组：

// var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

const duplicateFlattentSort = (arr) => {
  return [
    ...new Set(
      [].concat(
        ...arr.map((v) => (Array.isArray(v) ? duplicateFlattentSort(v) : v))
      )
    ),
  ].sort((a, b) => a - b);
};

// 2. 希望链式调用 arr.flat().unique().sort();
// 铺平
Array.prototype.flat = function () {
  return [].concat(
    ...this.map((item) => (Array.isArray(item) ? item.flat() : item))
  );
};

// 去重
Array.prototype.unique = function () {
  return [...new Set(this)];
};

// 排序
Array.prototype._sort = function () {
  this.sort((a, b) => a - b);
};

console.log(arr.flat().unique()._sort());
```

## 扁平转树

```js
// https://juejin.cn/post/6983904373508145189?utm_source=gold_browser_extension
let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
];

// 1.
function flattenToTree(arr = []) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    arr[i].children = arr[i].children || [];
    if (!arr[i].pid) {
      res.push(arr[i]);
    }
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i].id === arr[j].pid) {
        arr[i].children.push(arr[j]);
      }
    }
  }

  return res;
}

// 2.
function flattenToTree(arr = []) {
  let res = [];
  let map = {};

  for (const item of arr) {
    const { id, pid } = item;
    if (!map[id]) {
      map[id] = {
        children: [],
      };
    }
    map[id] = {
      ...item,
      children: map[id].children || [],
    };

    if (!pid) {
      res.push(map[id]);
    } else {
      if (!map[pid]) {
        map[pid] = {
          children: [],
        };
      }

      map[pid].children.push(map[id]);
    }
  }

  return res;
}

console.log(JSON.stringify(flattenToTree(arr), null, 2));
```

## key 转换成下划线

```js
// 是否是对象
function isObj(obj) {
  return typeof obj === "object" && obj !== null;
}

// aBC  转换成 下划线 a_b_c
function snacklize(str) {
  return str.replace(/([A-Z])/g, (_, c) => `_${c.toLowerCase()}`);
}

function transform(data = {}, depth = 1) {
  let res = {};

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      const snackKey = snacklize(key);
      const cur = data[key];
      res[snackKey] = isObj(cur) && depth > 1 ? transform(cur, depth - 1) : cur;
    }
  }

  return res;
}

const res = {
  aBC: "123",
  cc: "asdf",
  cBA: {
    abBc: "asd",
    sDF: "asdf",
    ASD: {
      asd: "asdf",
      SDFSDF: "adf",
    },
  },
};

console.log(transform(res, 2));
```

## 模板引擎

```js
// https://juejin.cn/post/6987549240436195364?utm_source=gold_browser_extension#heading-194
const template = "嗨，{{ info.name.value }}您好，今天是星期 {{ day.value }}";

const data = {
  info: {
    name: {
      value: "张三",
    },
  },
  day: {
    value: "三",
  },
};

render(template, data); // 嗨，张三您好，今天是星期三

function render(template, data) {
  // .*? 经典的非贪婪匹配，
  // 还可以用 /{{([^}]*)}}/g
  // {{ 后面不是数字就不需要转义
  return template.replace(/{{(.*?)}}/g, (_, a) => {
    const path = a?.trim()?.split(".");
    return getValue(data, path);
  });
}

function getValue(data, path) {
  try {
    return path.reduce((acc, cur) => {
      return acc[cur];
    }, data);
  } catch (e) {
    return undefined;
  }
}
```

## 数组去重

```js
const arr = [
  1, 2, 34, 3423, 1, 2, 34, 3, 4, 5, 6, 7, 7, 7, 73, 3, 32, 2, 2, 2, 2, 1,
];

// 1.
const deduplicate = (arr = []) => {
  const map = new Map();
  return arr.filter((it) => !map.has(it) && map.set(it));
};

console.log(deduplicate(arr));
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
[你不知道的React 和 Vue 的20个区别【面试必备】](https://juejin.cn/post/6847009771355127822)

1. 代码风格
   1. Vue template, 内置 v-for 等指令
   2. React jsx, 循环用 map 等
2. Vue 和 React 在理念上的差别(核心)
   1. Vue 对数据做劫持/代理，对数据更加敏感，精确。知道什么时候进行刷新
   2. React 推崇函数式，直接进行局部刷新，重新渲染，更加粗暴，简单，react 不知道什么时候进行刷新，需要开发者手动调用 setState 告知 React 进行刷新
3. 事件系统
   1. React 对所有事件都进行了代理，全都代理到 document 上，暴露给开发者的不是原生事件，而是合成事件。
   2. Vue 事件处理函数 this 默认指向组件实例，React 需要 bind.
   3. React 的设计是改变开发者，你按照我的来，Vue 的设计是适应开发者，你怎么爽就怎么来
4. 预编译优化问题

### React 的特征是什么？

[「2021」高频前端面试题汇总之React篇（上）](https://juejin.cn/post/6941546135827775525)
[「2021」高频前端面试题汇总之React篇（下）](https://juejin.cn/post/6940942549305524238)
[React 灵魂 23 问，你能答对几个？](https://zhuanlan.zhihu.com/p/304213203)

React 中最值得称道的部分莫过于 Virtual DOM 和 diff 算法的完美结合已提升性能
状态提升(Lifting-state-up)、单项数据流、函数式编程风格、pull-base 系统(数据变化需要手动 setState 通知系统更新，而 Vue 响应式系统会自动更新)

### Virtual DOM 是什么?

[build-your-own-virtual-dom](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060)

对真实 DOM 的映射与描述，其实就是一个 `json schema`、至少包含三个值 `type`、`props`、`children`

优点：

- VD 最大的特点是将页面状态抽象成 JS 对象形式、配合不同的渲染工具可以在不同的平台进行渲染、如 React 借助了 VD 实现了服务端渲染、浏览器渲染和客户端渲染
- 在进行页面更新的时候，借助 VD，DOM 元素的改变可以在内存中进行比较，然后借助框架的事务机制，将多次改变结果合并后一次更新到页面，从而有效的减少页面的渲染次数，提高渲染效率

疑问：[原文](https://zhuanlan.zhihu.com/p/20346379)

- 在简单 UI 变化下、比如就只改变一个纯文本，和传统的效率并没有什么区别，反而 React 要从根节点进行 diff, 反而耗时；
- 在复杂 UI 操作下、一传统节点操作上，加入开发者知道要修改那部分数据，删除、移动哪部分节点、和 React 操作没啥区别，同事反而效率更高；
- 我的理解是：数据驱动，虚拟 DOM 更趋向的是提升了开发效率，减少了开发者各种不必要的 DOM 操作达到性能提升；

### Diff 算法如何运作？

传统的 diff 算法采用`循环递归`对节点进行依次对比，效率低下，算法复杂度达到 O(n^3)，其中 n 是树节点的总数，O(n^3) 到底有多可怕，这意味着如果要展示 1000 个节点，就要依次执行上十亿次的比较。这种指数型的性能消耗对于前端渲染场景来说代价太高了！现今的 CPU 每秒钟能执行大约 30 亿条指令，即便是最高效的实现，也不可能在一秒内计算出差异情况。而 React 制定大胆的策略，将 O(n^3) 复杂度的问题转换为 O(n) 复杂度的问题。

1. Tree Diff: Web UI 中 DOM 节点跨层级移动操作特别少，可以忽略不计(如果出现了，就删除重建)
   1. 只会对同一父节点下的所有子节点比较，如果子节点不存在，就删除，不会进一步比较。这样只需要一次遍历，就能完成整个 DOM 树的比较。
   2. 建议：在开发组件时，保持稳定的 DOM 结构有助于性能提升
2. Component Diff: 两个相同组件产生类似的 DOM 结构，不同的组件产生不同的 DOM 结构；
   1. 同一类型组件，按原策略继续进行 Virtual DOM 比较
   2. 如果不是, 则判断此组件为 dirty component,则会替换该组件下的所有节点
   3. 对于同一类型的组件,有可能其 Virtual DOM 没有变化，如果能够确切的知道这一点可以节省大量的 Diff 运行时间，因此 React 通过在组件内允许用户通过 shouldComponentUpdate 来判断是否需要 Diff，也可以直接继承 PureComponent，然后自动帮你完成
3. Element Diff: 对于同一层次的一组子节点，它们可以通过唯一的 id 进行区分。所以只需要给同一组的元素给与不同的 key 值就可以了
   1. 提供三种操作：INSERT_MARKUP、MOVING_EXISTING、REMOVE_NOD
   2. 添加唯一的 Key，Key 变化就进行插入和删除，否则移动
   3. 在开发过程中，尽量减少将最后一个节点移动到列表首部的操作，当节点的数量过大或者更新过于频繁时，在一定程度上会影响 React 的渲染性能。

## Redux 原理

一个单向数据流的状态管理库，可用于 React/Vue/Angular 等框架，基于 发布订阅模式(View 中通过 Connect 订阅 Store 的修改, 一旦 Store 修改,就会通知所有的订阅者, View 接收到通知之后会使用新的状态重新渲染).

三大原则：

1. 单一数据源，一个应用一般只有一个 Store(`<Provider store={store} />`)
2. State 是只读的，唯一改变 State 的方式是 dispatch 一个 action，action 描述了修改状态的相关信息。便于调试和进行重做（也就是 time traveling
3. 通过纯函数来修改，需要编写 Reducer 来接收 Action 进行实际状态的修改，Reducer 接收上一次的 State 和 Action，返回新的 State。只要传入的 Action 相同，那么返回的新状态一定是一样的结果

流程：

1. 用户触发页面上的操作，dispatch 发送一个 action
2. Redux 接收到这个 Action 后通过 Reducer 函数计算出下一个状态
3. 将新的状态更新进 Store，Store 更新之后通知页面进行重新渲染

`可以用 React 官方的 useContext 和 useReducer 结合使用 替代 redux`
