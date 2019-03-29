# 基础算法

[javascript-algorithms](https://github.com/trekhleb/javascript-algorithms)  
[javascript-sorting](https://h3manth.com/javascript-sorting/)

[![alorithms](https://github.com/LeeRayno/H5/blob/master/img/algorithm.png?raw=true)](https://github.com/LeeRayno/H5/blob/master/img/algorithm.png?raw=true)

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
