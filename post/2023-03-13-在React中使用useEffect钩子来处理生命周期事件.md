---
layout: post
cid: 192
title: 在React中使用useEffect钩子来处理生命周期事件
slug: 192
date: 2023/03/13 18:15:00
updated: 2023/04/19 14:18:43
status: publish
author: Gonwe
categories: 
  - 前端开发
  - Web框架
tags: 
  - useEffect
  - React
  - hooks
desctitle: 
mode: default
---


`useEffect`是React中的一个hooks，它允许函数组件执行额外的操作，比如订阅数据、手动修改 DOM，或者其他需要在组件卸载时清除的操作。其中可以控制参数为:
![useEffect.jpg][1]
1. **第一个参数（必须）**：一个回调函数，这个回调函数会在组件渲染后执行
2. **第二个参数（可选）**：是一个数组，用来绑定依赖项的，当依赖项变更的时候，会触发副作用的执行

###### 通常，`useEffect` 是一个尽量少用的 API，每个组件中，应该只要必要的 `useEffect`，避免因为无意义的、重复的代码执行而降低性能。

一般来说，常见的用法有以下几种：

1. 通过`useEffect`获取/更新数据并进行渲染；
2. 处理网络请求；
3. 设置/清除计时器、动画等。

###### 简单使用:

```javascript
  import { useEffect } from 'react';
  
  const MyComponent = () => {
      useEffect(() => {
          console.log('组件更新');
          // 副作用操作...
      }, []);
    return (
        <div>
            // 组件内容
        </div>
    );
  };
```

在上面的例子中，我们使用了`useEffect`钩子函数。
通过传递一个空数组作为第二个参数，来确保在必要时才触发副作用。

###### 如果我们想监听某个数据进入到 component 中，则可以具体指定他是否需要重新渲染。以获取商品信息为例：

```javascript
    useEffect(() => {
        console.log(`发起请求：${id}`);
        fetch(`/api/goods?id=${id}`).then((res) => res.json()).then((data) => {
            setGoodsData(data);
        });
    }, [id]);
```

在这个例子中，当名为 `id` 的依赖发生变化时，即使组件不再重渲染，也会执行于`useEffect`相应内部改变数据的函数。这样就让从API服务器获取商品信息的API调用变得更加优化并有效率。

##### 重点
  
在使用`useEffect` hook时，你可以传递第二个参数作为可选项。这个参数被称为“依赖项数组”。它接受一组变量，当只要这些变量中的一个发生了变化后，就会重新执行`useEffect` hook。

而如果你将空数组（[]）作为第二个参数传递，则该hook将仅在组件初始渲染时被调用一次，并且不会再因任何`prop`或`state`的变化而被重新调用。

相反，如果你完全**省略第二个参数**，那么每当组件上的任何`prop`或`state`发生更改时，都会重新调用`useEffect` hook。因此，如果你有许多`pro`p和`state`，可能导致性能问题并使其难以维护。

因此，选择正确的方法取决于你的具体情况。如果你希望仅在组件第一次加载时运行`useEffect`且不再次提供，但不关心每个`prop`或`state`的变化，则应将空数组[]用作第二个参数传递。否则，请确保传递所有你希望对其进行响应的`props`和`state`的数组。

#### 修正错误（感谢朋友的指正和补充）

`useEffect`的第一个参数是回调函数，并且在这个回调函数中还可以返回一个函数。这个返回函数会在组件卸载时执行，用于清除一些副作用。

举一个具体的例子，假设我们需要在组件渲染后启动一个计时器，每隔1秒更新一次UI，那么我们可以使用以下代码：

```javascript
import React, { useEffect, useState } from 'react';

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);
    
    // 返回清除函数
    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div>{count}</div>
  );
}
```

上面的代码中，我们在useEffect的回调函数中调用了 `setInterval` 启动了一个计时器，并在其中通过 `setCount` 函数更新计数器的值。同时，我们还返回了一个清除函数，在组件卸载时会自动执行该函数，从而清除计时器。

这样，当组件被销毁时，计时器也会一同被清除，避免了内存泄漏等问题。



  [1]: http://www.gonwe.cn/usr/uploads/2023/03/474663936.jpg