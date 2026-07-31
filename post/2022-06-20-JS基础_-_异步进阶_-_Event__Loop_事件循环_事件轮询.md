---
layout: post
cid: 51
title: JS基础 - 异步进阶 - Event  Loop 事件循环/事件轮询
slug: 51
date: 2022/06/20 22:08:00
updated: 2022/06/27 14:18:59
status: publish
author: Gonwe
categories: 
  - 前端开发
  - 教程·资源
tags: 
  - Javascript笔记
  - 异步
  - Event Loop
  - 微任务
  - 宏任务
  - DOM渲染
  - ES6
---


####　1.前言

JavaScript单线程语言，为了实现主线程的不阻塞，**Event Loop**这样的方案应运而生，Event Loop 就是异步回调的实现原理。

#### 2.JS的执行机制

- 从前往后一行一行执行，如有报错后面代码停止执行
- 先执行完成同步代码再执行异步代码

#### 3.Event Loop 执行过程

```javascript
console.log('hi');
setTimeout(function cb1() {
    console.log('cb1');
}, 5000);
console.log('bye');
//先执行同步
//hi
//bye
//等待5秒后
//cb1
```

![Event Loop][1]


> 1. 同步代码（栈里面的代码）顺序执行，遇到异步代码就记录一下，在此过程中异步代码如果是宏任务移动到Web APIs，直到定时的时间到就放入宏任务队列，即图中的`Callback Queue`。
> 2. **如果是微任务则放入微任务队列（本例子没有微任务）**，不会经过Web APIs。如果同步代码执行完，调用栈`call stack`为空，去查看微任务队列，每执行完一个微任务，它就会从微任务队列出队，直到微任务队列微空后，尝试DOM渲染（如果DOM结构发生变化）。
> 3. 然后`Event Loop`开始工作，然后轮询查找宏任务队列`Callback Queue`，如有则移动到`Call Stack`执行...
> 4. 每执行完一个宏任务，就会去检查微任务队列，若微任务队列有，就执行到微任务为空，再尝试DOM渲染，然后去看宏任务队列，继续轮询查找（永动机一样不停地重复操作）。

> 注意：
>
> 1.这里的Web APIs就是处理定时或者异步API的。
>
> 2.微任务是ES6语法规定的，宏任务是由浏览器规定的。
>
> 3.**执行的顺序是 `执行栈中的代码 => 微任务 => 宏任务`**
#### 4.DOM事件和Event Loop

```html
<button id="btn1">提交</button>
<script>
    console.log("Hi");
    $("#btn1").click(function(e) {
        console.log("button clicked");
    })
    console.log("Bye");
</script>
```

> - 这个和上面的例子几乎一样，只不过回调函数放在Web APIs，点击按钮的时候回调函数就放在Callback Queue；由此可见只要是基于回调就是基于Event Loop来实现的，异步（setTimeout、Ajax）、DOM事件都是基于Event Loop的。
>
> - DOM事件不是异步

  [1]: http://www.gonwe.cn/usr/uploads/2022/06/1351138967.png