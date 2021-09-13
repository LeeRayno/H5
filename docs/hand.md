# 手写

## New

- 创建一个新对象
- 新对象的链式原型`__proto__`指向函数的原型`prototype`
- 函数里面的`this`指向新对象
- 返回新对象

```js
// 1.
function New(fn, ...args) {
  let o = {};

  if (fn.prototype !== null) {
    o.__proto__ = fn.prototype;
  }

  const res = fn.apply(o, args);

  if ((typeof res === "object" || typeof res === "function") && res !== null) {
    return res;
  }

  return o;
}

// 2.
function New(fn, ...args) {
  let o = Object.create(fn.prototype);
  let res = fn.apply(o, args);
  if (typeof res === 'object' && res !== null) {
    return res;
  }
  return o;
}

// 测试

function test(a) {
  this.name = a;
}

const a = New(test, "a");
const b = new test("b");

console.log(a);
console.log(b);

console.log(a.__proto__ === test.prototype);
console.log(b.__proto__ === test.prototype);
```

## instanceOf

> 链式查找，即实例的链式原型`__proto__`指向构造函数的原型`prototype`

```js
function instanceOf(left, right) {
  let proto = left.__proto__;
  const prototype = right.prototype;

  while (true) {
    if (proto === null) return false;
    if (proto === prototype) return true;

    proto = proto.__proto__;
  }
}

// 测试

const a = "a";

console.log(instanceOf(a, String));
console.log(instanceOf(a, Array));
```

## deepClone

```js
// 1. 简单的
function deepClone(obj) {
  if (!isObj(obj)) return obj;

  let res = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    res[key] = isObj(obj[key]) ? deepClone(obj[key]) : obj[key];
  }

  return res;
}

function isObj(o) {
  return typeof o === "object" && o !== null;
}

// 2. 考虑引用和symbol的情况
function deepClone(obj, hash = new WeakMap()) {
  if(!isObj(obj)) return obj;
  // 考虑引用
  if(hash.has(obj)) {
    return hash.get(obj)
  }
  const res = Array.isArray(obj) ? [] : {};
  hash.set(obj, res);
  
  Reflect.ownKeys(obj).forEach((key) => {
    res[key] = isObj(obj[key]) ? deepClone(obj[key]) : obj[key]
  })
  return res;
}
```

## pub/sub

> emit 时 循环执行函数，on 的时候添加函数，原理类似 promise 的 then 添加 和 resolve 执行

```js
class EventEmiter {
  constructor() {
    this.events = this.events || new Map();
  }

  emit(ev, ...args) {
    const handlers = this.events.get(ev);
    handlers &&
      handlers.forEach(hanlder => {
        handler.apply(this, args);
      });
  }

  on(ev, fn) {
    const handlers = this.events.get(ev);
    this.events.set(ev, handlers ? handlers.concat(fn) : [fn]);
  }

  off(ev, fn) {
    const handlers = this.events.get(ev);
    const i = handlers.findIndex(fn);
    handlers.splice(i, 1);
    this.events.set(ev, handlers);
  },

  once(ev, fn) {
    const _once = (...args) => {
      fn && fn.apply(this, args);
      this.off(ev, fn)
    }

    this.on(ev, _once)
  }
}

// test
function a(v) {
  console.log(v);
}

const event = new EventEmiter();

event.on("click", a);
event.on("click", function(v) {
  console.log(v);
});

event.emit("click", 2);
event.off("click", a);
```

## 大数相加

> 非常大的数字相加，转为字符串形式相加

```js
function bigNumberSum(a, b) {
  a = a + '';
  b = b + '';

  // const diff = Math.abs(a.length - b.length);
  // const prefix = '0'.repeat(diff);

  // a.length > b.length ? (b = prefix + b) : (a = prefix + a);
  const length = Math.max(a.length, b.length);
  a = a.padStart(length, '0');
  b = b.padStart(length, '0');

  // console.log(a);
  // console.log(b);

  let carry = 0; // 进位
  let res = '';

  for (let i = a.length - 1; i >= 0; i--) {
    const sum = Number(a[i]) + Number(b[i]) + carry;

    carry = sum > 9 ? 1 : 0;

    res = sum + res;

    if (carry === 1) {
      res = res.slice(1);
    }
  }

  // console.log(res);
  return res;
}

// test
bigNumberSum(5353451235559999, 9999);
// 5353451235569998
```
