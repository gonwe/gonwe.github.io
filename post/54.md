---
layout: post
cid: 54
title: JS基础 - 异步进阶 - Promise
slug: 54
date: 2022/06/22 22:19:00
updated: 2022/06/27 14:26:54
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
  - ES6
  - 回调函数
---


ES6（ECMAScript 2015） 原生提供了 Promise 对象。 Promise 是异步编程的一种解决方法,比传统的回调函数和事件更合理更强大，Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

```javascript
// Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。
let promise = new Promise(function (resolve, reject) {
    console.log('Promise'); // Promise
    resolve();
});
promise.then(function () {
    console.log('resolved.'); // resolved.
});
console.log('Hi!');
// Promise
// Hi!
// resolved.
```

#### 1.Promise 的三种状态

```javascript
function loadImage(url) {
    return new Promise(function (resolve, reject) {  //pending
        const image = new Image();
        image.onload = function () {
            resolve(image); // fulfilled
        }
        image.onerror = function () {
            reject(new Error('Could not load image at ' + url)); //reject
        }
        image.src = url;
    });
}
// resolve 函数的作用是，将Promise对象的状态从“pending”变为“fulfilled”
// reject 函数的作用是，将Promise对象的状态从“pending”变为“rejected”
```

- pending: 初始状态，不是成功或失败状态。
- fulfilled: 解决了，意味着操作成功完成。
- rejected: 拒绝了，意味着操作失败。

> 1.对象的状态不受外界影响，只有异步操作的结果，可以决定当前是哪一种状态；
> 2.一旦状态改变（从`pending变为fulfilled`和从`pending变为rejected`），就不会再变，任何时候都可以得到这个结果
>
> **pending** -> **resolve方法** -> **fulfilled**
> **pending** -> **reject方法** -> **rejected**

![Promise运行流程][1]

**Q1：resolved状态和fulfilled状态是一回事吗？**

> A：并不是一回事，resoved状态指的是完成了，不会再改变的状态,只是一种叫法，并不是真正的状态，
>
> `pending -> resolve方法 -> fulfilled -> resolved`
> `pending -> reject方法 -> rejected -> resolved`
>
> 一开始是 pending，无论 resolve 还是 reject，都是 resolved，这里指得是完成、不会再改变了的状态；对应的 pending 就是尚未完成的状态。
>
> fulfilled 是一种 resolved，rejected 也是一种 resolved
>
> 真正的状态还是前文提到的那三种，pending、fulfilled、rejected这三种，所以resolved状态可能是fulfilled也可能是rejected。

**Q2：Chrome浏览器显示的状态时pending，点开却是fulfilled，到底哪个才是真正的状态？**

> A：这种情况，我们还是可以叫做pending状态。

#### 2.Promise 状态表现

 - pending状态，不会触发then和catch回调

   ```javascript
   !(function () {
       const p = new Promise(function (resolve, reject) {
           console.log('pending'); //默认是pending状态
       });
       p.then(function () {
           console.log('resolved');
       }).catch(function () {
           console.log('rejected');
       });
   })()
   // pending
   ```

 - resolved状态，会触发后续的 then 回调函数

   ```javascript
   !(function () {
       const p = new Promise(function (resolve, reject) {
           resolve();// 将状态变为resolved
       });
       p.then(function () {
           console.log('resolved');
       }).catch(function () {
           console.log('rejected');
       });
   })();
   // resolved
   ```

 - rejected状态，会触发后续的 catch 回调函数

   ```javascript
   !(function () {
       const p = new Promise(function (resolve, reject) {
           reject(); // 将状态变为rejected
       });
       p.then(function () {
           console.log('resolved');
       }).catch(function () {
           console.log('rejected');
       });
   })();
   // rejected
   ```

#### 3.then和catch对状态的影响

 - **then正常返回resolved，里面报错返回rejected**

   ```javascript
   //then正常返回resolved，里面报错返回rejected
   const p1 = Promise.resolve(100); //resolve()直接返回一个fulfilled状态的promise
   p1.then(function (value) {  //then()方法接收一个回调函数，当promise状态变为resolved时，会执行该回调函数
       console.log(value);
   }).catch(function (err) {
       console.log(err); //promise状态是resolved，catch不会被执行
   });
   // 100
   p1.then(function (value) {  
       throw new Error('error'); //then里面抛出错误，promise状态会变为rejected，触发catch回调
   }).catch(function (err) {  //catch()方法接收一个回调函数，当promise状态变为rejected时，会执行该回调函数
       console.log(err);
   });
   // Error: error
   ```

 - **catch正常返回resolved，里面报错返回rejected**

   ```javascript
   //catch正常返回resolved，里面报错返回rejected
   const p2 = Promise.reject(new Error('Error')); //reject()直接返回一个rejected状态的promise
   p2.then(function (value) {
       console.log(value);   //promise状态是rejected，promise状态会变为rejected，触发catch回调
   }).catch(function (err) {
       console.log(err);  //promise状态是rejected，catch会被执行
   }).then(function () {
       console.log('resolved');   //上一个catch没有错误，promise状态会变为resolved，触发then回调
   }).catch(function () {
       console.log('rejected');   //上一个catch没有错误，不会触发catch回调
   });
   // Error: Error
   // rejected
   ```


  [1]: http://www.gonwe.cn/usr/uploads/2022/06/3779803193.png