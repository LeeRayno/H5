# 基础算法

[javascript-algorithms](https://github.com/trekhleb/javascript-algorithms)  
[javascript-sorting](https://h3manth.com/javascript-sorting/)  
[codeTop](https://codetop.cc/home)
![复杂度](https://tva1.sinaimg.cn/large/e6c9d24ely1h00hly61pdj21ip0u0wh2.jpg)
![算法](https://tva1.sinaimg.cn/large/e6c9d24egy1h00hpx6b7dj21dg0u0agj.jpg)

## 冒泡排序 -- Bubble Sort

> 数组中有 `n` 个数，比较每相邻两个数，如果前者大于后者，就交换位置，这样一来第一轮就能选出最大得数放在最后面；那么经过 `n - 1`轮，就完成了所有得排序 [原文](https://segmentfault.com/a/1190000014175918)

[![Bubble Sort](https://camo.githubusercontent.com/383b23979d4d7f279f8fb285b36bcdd357b10a35/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f632f63382f427562626c652d736f72742d6578616d706c652d33303070782e676966)](https://camo.githubusercontent.com/383b23979d4d7f279f8fb285b36bcdd357b10a35/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f632f63382f427562626c652d736f72742d6578616d706c652d33303070782e676966)

```js
let arr = [4, 3, 2, 1];

function bSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let bFlag = true;

    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let tem;
        tem = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tem;

        // or [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
        bFlag = false;
      }
    }

    if (bFlag) break;
  }

  return arr;
}

console.log(bSort(arr));
```

## 选择排序 -- Selection Sort

> 它的工作原理是每一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。 以此类推，直到全部待排序的数据元素排完。 选择排序是不稳定的排序方法

[![selection Sort](https://camo.githubusercontent.com/adfa2cdcc3825092dc405aadd87453571d6e0dc4/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f392f39342f53656c656374696f6e2d536f72742d416e696d6174696f6e2e676966)](https://camo.githubusercontent.com/adfa2cdcc3825092dc405aadd87453571d6e0dc4/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f392f39342f53656c656374696f6e2d536f72742d416e696d6174696f6e2e676966)

```js
let arr = [4, 5, 3, 2, 1];

function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = arr[i];
    let imin = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < min) {
        min = arr[j];
        imin = j;
      }
    }

    let tem;
    tem = arr[i];
    arr[i] = arr[imin];
    arr[imin] = tem;

    // or [arr[i], arr[imin]] = [arr[imin], arr[i]]
  }

  return arr;
}

console.log(selectionSort(arr));
```

## 插入排序 -- Insertion Sort

> 是一种简单直观的排序算法。 它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入

[![Insertion Sort](https://camo.githubusercontent.com/8f6fedc10da579f13b22b949f6ad29255b6d721f/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f302f30662f496e73657274696f6e2d736f72742d6578616d706c652d33303070782e676966)](https://camo.githubusercontent.com/8f6fedc10da579f13b22b949f6ad29255b6d721f/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f302f30662f496e73657274696f6e2d736f72742d6578616d706c652d33303070782e676966)

```js
let arr = [6, 3, 2, 4, 1, 5];

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let tem = arr[i];
    let j = i;

    for (; j > 0; j--) {
      if (tem >= arr[j - 1]) break;
      arr[j] = arr[j - 1];
    }
    arr[j] = tem;
  }

  return arr;
}

console.log(insertionSort(arr));
```

## 快速排序 -- Quick Sort

> 算法原理 快速排序是图灵奖得主 C. R. A. Hoare 于 1960 年提出的一种划分交换排序。 它采用了一种分治的策略，通常称其为分治法(Divide-and-ConquerMethod)。

[![Quick Sort](https://camo.githubusercontent.com/2499d89bbb30337a5d2d7770cc034b4b71fbfdc6/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f362f36612f536f7274696e675f717569636b736f72745f616e696d2e676966)](https://camo.githubusercontent.com/2499d89bbb30337a5d2d7770cc034b4b71fbfdc6/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f362f36612f536f7274696e675f717569636b736f72745f616e696d2e676966)

```js
let arr = [6, 3, 2, 4, 1, 5];

function quickSort(arr) {
  if (arr.length < 1) return [];

  let center = arr.splice(Math.floor(arr.length / 2), 1);

  let left = [];
  let right = [];

  for (let i = 0; i < arr.length; i++) {
    arr[i] < center[0] ? left.push(arr[i]) : right.push(arr[i]);
  }

  return quickSort(left).concat(center, quickSort(right));
}

console.log(quickSort(arr));
```

## 归并排序 -- Merge Sort

> 归并排序（MERGE-SORT）是建立在归并操作上的一种有效的排序算法,该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。 将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。 若将两个有序表合并成一个有序表，称为二路归并。

[![Merge Sort](https://camo.githubusercontent.com/64ba2bcbd5c11779657e40a1d03d0ea691f6fa57/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f632f63632f4d657267652d736f72742d6578616d706c652d33303070782e676966)](https://camo.githubusercontent.com/64ba2bcbd5c11779657e40a1d03d0ea691f6fa57/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f632f63632f4d657267652d736f72742d6578616d706c652d33303070782e676966)

```js
let arr = [6, 3, 2, 4, 1, 5];

function mergeSort(arr) {
  if (arr.length < 2) return arr;

  let middle = parseInt(arr.length / 2);

  let left = arr.slice(0, middle);
  let right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let res = [];

  while (left.length && right.length) {
    left[0] <= right[0] ? res.push(left.shift()) : res.push(right.shift());
  }

  while (left.length) res.push(left.shift());
  while (right.length) res.push(right.shift());

  return res;
}

console.log(mergeSort(arr));
```

## 希尔排序 -- Shell Sort

> 希尔排序的基本思想是：先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录基本有序时，再对全体记录进行依次直接插入排序。 [原文](https://segmentfault.com/a/1190000009461832)

[![Shell Sort](https://camo.githubusercontent.com/e80043bbd0ce86517a91198be315740504c6980e/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f642f64382f536f7274696e675f7368656c6c736f72745f616e696d2e676966)](https://camo.githubusercontent.com/e80043bbd0ce86517a91198be315740504c6980e/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f642f64382f536f7274696e675f7368656c6c736f72745f616e696d2e676966)

```js
function shellSort(arr) {
  let len = arr.length,
    temp,
    gap = 1;
  while (gap < len / 3) {
    //动态定义间隔序列
    gap = gap * 3 + 1;
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < len; i++) {
      temp = arr[i];
      for (let j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
    }
  }
  return arr;
}
```

## 简单

### [1. 两数之和](https://leetcode-cn.com/problems/two-sum/)

```js
function twoSum(arr, target) {
  let map = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), 9];
    } else {
      map.set(nums[i], i);
    }
  }
}
```

### [88. 合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)

```js
/*
 * 先填充 nums1
 * 再用 arr.sort 排序
 */
function merge(nums1, m, nums2, n) {
  for (let i = m; i < m + n; i++) {
    nums1[i] = nums2[i - m];
  }
  nums1.sort((a, b) => a - b);
}
```

### [112. 路径总和](https://leetcode-cn.com/problems/path-sum/)

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * 递归的出口在 叶子节点 并且和等于targetSum
 * 叶子节点 是指没有子节点的节点。
 */
function hasPathSum(root, targetSum) {
  let b = false;
  function dfs(node, v) {
    if (!node) return false;
    const { left, right, val } = node;
    // 出口
    if (!left && !right && val + v === targetSum) {
      b = true;
    }

    left && dfs(left, v + val);
    right && dfs(right, v + val);
  }

  dfs(root, 0);
  return b;
}
```

类似的还有查找路径

```js
const arr = [
  {
    id: 1,
    children: [
      {
        id: 12,
      },
    ],
  },
  {
    id: 2,
    children: [
      {
        id: 22,
      },
    ],
  },
];

// 查找路径
// findPath(arr, 12) => [1, 12]
function findPath(arr, target) {
  let path = [];
  function dfs(arr, pre) {
    arr.forEach(({ id, children }) => {
      if (id === target) {
        path.concat(pre);
      } else {
        children?.length && dfs(children, pre.concat(id));
      }
    });
  }
  dfs(arr, []);
  return path;
}

// 铺平嵌套对象
// flatPath(arr[0]) => {'id': 1, 'children.[0].id': 12}
function flatPath(obj) {
  let res = {};

  function dfs(val, pre) {
    const isArray = Array.isArray(val);

    for (const k in val) {
      const cur = val[k];
      const key = pre
        ? isArray
          ? `${pre}.[${k}]`
          : `${pre}.${k}`
        : isArray
        ? `[${k}]`
        : k;
      if (!isObj(cur)) {
        res[key] = cur;
      } else {
        dfs(cur, key);
      }
    }
  }

  dfs(obj, "");
  return res;
}
```

## 链表

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
```

### 反转链表

```js
/**
 * https://leetcode-cn.com/problems/UHnkqh/
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null;
  let cur = head;
  let next = null;
  while (cur) {
    next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }

  return prev;
};
```

### 回文链表

```js
/**
 * https://leetcode-cn.com/problems/aMhZSa/
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  let stack = [];
  let cur = head;

  while (cur) {
    stack.push(cur.val);
    cur = cur.next;
  }

  let i = 0;
  let j = stack.length - 1;

  while (i <= j) {
    if (stack[i] !== stack[j]) {
      return false;
    }
    i++;
    j--;
  }
  return true;
};
```

### 循环链表

> 龟兔晒跑法

```js
/**
 * [快指针每次跑两个，满指针](https://leetcode-cn.com/problems/linked-list-cycle/solution/huan-xing-lian-biao-by-leetcode-solution/)
 *
 */
function hasCycle(head) {
  let slower = head;
  let faster = head;

  while (faster && faster.next) {
    faster = faster.next.next;
    slower = slower.next;
    if (slower === faster) return true;
  }
  return false;
}
```

### 相交链表

```js
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let set = new Set();
  let A = headA;
  let B = headB;

  while (A) {
    set.add(A);
    A = A.next;
  }

  while (B) {
    if (set.has(B)) return B;
    B = B.next;
  }
  return null;
};
```

### 倒数第 K 个元素

```js
/**
 * https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/
 * 快指针先跑 K 个。这样快慢指针相差 K 个位置，然后在一起跑。快指针跑到末尾了，慢指针就是在 倒数 K 个位置
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
  // let stack = [];
  // let cur = head;
  // while (cur) {
  //     stack.push(cur);
  //     cur = cur.next
  // };
  // return stack[stack.length - k]

  let slower = head;
  let faster = head;

  while (k--) {
    faster = faster.next;
  }

  while (faster) {
    faster = faster.next;
    slower = slower.next;
  }

  return slower;
};
```

### 876. 链表的中间结点

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  let slower = head;
  let faster = head;

  while (faster && faster.next) {
    faster = faster.next.next;
    slower = slower.next;
  }

  // 如果 faster 不为 null 说明是基数， slower 往后移动一个
  if (faster) {
    slower = slower.next;
  }

  return slower;
};
```

### 合并两个升序链表

```js
/**
 * https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;

  let res = l1.val < l2.val ? l1 : l2;
  res.next = mergeTwoLists(res.next, l1.val < l2.val ? l2 : l1);

  return res;
};
```

## 字符串

### 最长回文字符串

### 无重复最长子串

```js
/**
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let res = 0;
  let str = "";

  for (let i = 0; i < s.length; i++) {
    const cur = str[i];
    const index = str.indexOf(cur);
    if (index < 0) {
      str += cur;
      res = Math.max(res, str.length);
    } else {
      str = str.slice(index + 1) + cur;
    }
  }

  return res;
};
```

### 最长递增序列

```js
/**
 * https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence/
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {
  let res = 0;
  let start = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] <= nums[i - 1]) {
      start = i;
    }
    res = Math.max(res, i - start + 1);
  }
  return res;
};
```
