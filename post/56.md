---
layout: post
cid: 56
title: JS基础 - 异步进阶 - async / await
slug: 56
date: 2022/06/24 22:08:00
updated: 2022/06/27 14:37:01
status: publish
author: Gonwe
categories: 
  - 前端开发
  - 教程·资源
tags: 
  - ECMAScript
  - Javascript笔记
  - Promise
  - 异步
  - Event Loop
  - ES7
  - async/await
  - try/catch
---


- `async/await` 是ES7 （ECMAscript 2016）提出的基于**`Promise`**的解决异步回调的最终方案；

- 使用同步语法编写异步代码，彻底消灭回调函数；

- `async / await`是基于`Promise`实现的，不能用于普通的回调函数；

- `async / await` 并不能改变异步的本质（ js是单线程的，异步需要回调，都是要基于 `event loop` 来实现）；

- `await` 后面的代码，都可以看做是异步回调 `callback` 里的内容，都是异步的；

- `async` / `await` 和`Promise`不互斥，两者相辅相成。

  

#### 1.基本使用方法  

**`async`关键字：** 放在函数声明之前，表明该函数是一个异步函数。该异步函数会返回一个`Promise`对象，当函数执行完毕的时候，我们可以像使用`Promise`一样进行调用`then`方法处理后续流程。

```javascript
async function getAsync() {
    return 'ASYNC DATA';
}
const a1 = getAsync(); // Promise

a1.then(function (value) {
    console.log(value);
}).catch(function (err) {
    console.log(err);
})
// ASYNC DATA
```

**`await`关键字：**需要和`async`一起使用。如果我们将`await`关键字放在异步函数调用之前，则当代码执行到此处的时候，如果是`Promise`对象，代码将会暂停，等到异步函数执行完成后，才会继续向下执行。如果不是`Promise`对象会把这个非`Promise`对象的东西当做 `await` 表达式的结果。

```javascript
async function getAwait() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('await');
        }, 1000);
    });
}
// await只能放在async定义的函数内 否则会报错
!(async function () {
    console.log('start');
    console.log(await 100);
    // 获取到Promise中值后语句才会往下执行,如果Promise返回的是reject，则会抛出错误
    console.log('data', await getAwait());
    console.log('end');
})()
// 立即输出：start
// 立即输出：100
// 1秒后输出：data await
// 1秒后输出：end
```

#### 2.async / await 和Promise的关系

1.执行 `async` 函数，返回的是 `Promise` 对象；

```javascript
async function start() {
    return 'start';
}
console.log(start()); 
// Promise {<fulfilled>: 'start'}
```

2.`await` 相当于 `Promise` 的 `then`；

```javascript
const p1 = Promise.resolve('p1');
 //await 相当于 Promise then
async function start() {
    console.log(await p1);   
}
p1.then(function (value) {
    console.log(value); //p1
});
start(); // p1

 //await 相当于 Promise.resolve(100);
async function start1() {
    console.log(await 100);  
}
start1(); // 100
```

3.用 `try/catch` 捕获异常，可以代替 `Promise` 的 `catch`;

```javascript
const p2 = Promise.reject('error');
// try...catch 相当于 Promise catch
async function start() {
    try {
        const ret = await p2
        console.log(ret);
    } catch (error) {
        console.error(error);
    }
}
start(); // error
```


> - `async/await`代码更简洁，不用像`Promise`需要调用`then()`，不用·写匿名函数处理`Promise`的`resolve`值，也不用定义多余的`data`变量，避免了嵌套代码。
> - `async/await `中可以使用标准的 `try/catch` 进行错误捕获，像处理同步代码处理错误。

#### 3.异步的本质

- `async / await` 并不能改变异步的本质（ js是单线程的，异步需要回调，都是要基于 `event loop` 来实现）；
- `async / await` 本质上是语法糖，是基于ES6里的`迭代函数——generator函数`；
- `await` 后面的代码，都可以看做是异步回调 `callback` 里的内容，都是异步的；

```javascript
async function async1() {
    //函数会立即执行里面的同步代码，虽然是异步函数，但是还没有回调不到异步的时候，会立即执行内容；；
    console.log('async1 start');
    await async2();  // await后面的代码都是异步的；
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
async1();
console.log('script end');

// script start
// async1 start
// async2
// script end
// async1 end
```