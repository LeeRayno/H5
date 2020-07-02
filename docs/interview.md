# 面试题

## 求html出现最多次数的标签

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
