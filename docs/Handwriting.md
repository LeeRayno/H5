# 手写

## New

- 创建一个新对象
- 新对象的链式原型`__proto__`指向函数的原型`prototype`
- 函数里面的`this`指向新对象
- 返回新对象

```js
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
```
