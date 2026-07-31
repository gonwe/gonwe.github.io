---
layout: post
cid: 66
title: JS-Web-API - DOM&amp;BOM
slug: 66
date: 2022/07/13 20:22:38
updated: 2022/07/13 20:23:58
status: publish
author: Gonwe
categories: 
  - 前端开发
  - 教程·资源
tags: 
  - W3C
  - ECMA 262标准
  - 文档对象模型
  - DOM
  - 浏览器对象模型
  - BOM
---


> JS基础知识，规定语法（ECMA 262标准）；
>
> JS-Web-API，网页操作的API（W3C标准）
>
> 前者是后者的基础

### 一、DOM

**文档对象模型 (DOM)**：**[Document Object Model](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)**

####　1.DOM的本质

​		DOM是由HTML文件解析出来的一棵树。

#### 2.DOM的节点操作

```javascript
//1.获取节点
    document.getElementById("id"); //获取id为id的节点 返回节点对象
    document.getElementsByTagName("tag"); //获取tag为tag的节点 返回节点集合
    document.getElementsByClassName("class"); //获取class为class的节点 返回节点集合
    document.querySelector("css选择器"); //获取css选择器为css选择器的节点 返回节点对象
    document.querySelectorAll("css选择器"); //获取css选择器为css选择器的节点 返回节点集合

//设置节点的值 property形式
    const node = document.getElementById("id");
    node.value = "value";
    node.innerHTML = "innerHTML";
    node.className = "class";

//获取和设置节点的属性和值 attribute方式
    const node = document.getElementById("id");
    node.setAttribute("name", "value");
    node.getAttribute("name");
```

> - property：修改对象属性，不会体现到HTML结构中
> - attribute：修改HTML属性，会修改HTML结构
> - 两个都有可能会影响DOM渲染，推荐使用property

#### 3.DOM的结构操作

```javascript
// 新增/插入节点
const node = document.getElementById("id");
const newNode = document.createElement("tag"); //创建节点
node.appendChild(newNode); //在node节点后面插入newNode节点

// 移动节点
const node2 = document.getElementById("id2");
node.appendChild(node2); //移动node2节点到node节点

// 获取子元素节点列表
const node = document.getElementById("id");
node.childNodes; //获取node节点的所有子节点

//获取父元素
const node = document.getElementById("id");
node.parentNode; //获取node节点的父节点

//删除节点
const node = document.getElementById("id");
node.removeChild(newNode); //删除node节点的newNode节点
node.remove(); //删除node节点
```

> 注意：
>
> node.nodeType = 1 表示是普通DOM节点

#### 4.DOM性能

DOM操作很耗性能，会大量占用CPU内存，导致页面卡顿。要避免频繁DOM操作。

##### 4.1缓存DOM查询

```javascript
//对DOM查询缓存
const pList = document.querySelectorAll("p");
const length = pList.length;
for (let i = 0; i < length; i++) {
    //缓存DOM查询，提高性能;
}
```

##### 4.2将频繁DOM操作改为一次操作

```javascript
// 将频繁DOM操作改为一次操作
const listNode = document.getElementById("list");
//创建一个文档片段，这里还没有插入到DOM树中
const fragment = document.createDocumentFragment();
//执行插入
for (let i = 0; i < 10; i++) {
    const liNode = document.createElement("li");
    liNode.innerHTML = "item" + i;
    fragment.appendChild(liNode);
}
// 都完成后，将文档片段插入到DOM树中
listNode.appendChild(fragment);
```

### 二、BOM

**浏览器对象模型 (BOM)**：Browser Object Model

- **BOM部分主要是针对浏览器的内容，其中常用的就是window对象和location**
- **window** 是全局对象很对关于浏览器的脚本设置都是通过它。
- **location **则是与地址栏内容相关，比如想要跳转到某个页面，或者通过URL获取一定的内容。
- **navigator** 中有很多浏览器相关的内容，通过判断浏览器内容都是通过这个对象。
- **screen **常常用来判断屏幕的高度宽度等。
- **history **不太常用，一般应该不会有写关于历史记录的脚本。
