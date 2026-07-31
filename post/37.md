---
layout: post
cid: 37
title: 使用ES6 Class类手写简易JQuery
slug: 37
date: 2022/06/10 07:00:00
updated: 2022/06/10 14:19:41
status: publish
author: Gonwe
categories: 
tags: 
  - ECMAScript
---


```javascript
class JQuery {
    constructor(selector) {
        const dom = document.querySelectorAll(selector);
        for (let i = 0; i < dom.length; i++) {
            this[i] = dom[i];
        }
        this.length = dom.length;
        this.selector = selector;
    }
    each(fn) {
        for (let i = 0; i < this.length; i++) {
            fn(this[i], i);
        }
    }
    get(index) {
        return this[index];
    }
    on(eventName, fn) {
        this.each(function (item) {
            item.addEventListener(eventName, fn);
        });
    }
}

// 插件增加扩展功能 本质是使用原型增加Function
JQuery.prototype.css = function (attr, value) {
    if (arguments.length === 1) {
        return this[0].style[attr];
    }
    this.each(function (item) {
        item.style[attr] = value;
    });
}

// 复写函数（“造轮子”）本质上是使用继承方法
class MyJQuery extends JQuery {
    constructor(selector) {
        super(selector);
    }
    css(attr, value) {
        if (arguments.length === 1) {
            return this[0].style[attr];
        }
        this.each(function (item) {
            item.style[attr] = value;
        });
    }
    // 其他方法
    addEventListener(eventName, fn) {
    }
}

```