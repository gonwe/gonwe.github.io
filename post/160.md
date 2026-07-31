---
layout: post
cid: 160
title: 原生Javascript 实现的document.ready()
slug: 160
date: 2023/01/12 14:30:00
updated: 2023/01/12 14:31:20
status: publish
author: Gonwe
categories: 
  - 前端开发
  - 教程·资源
tags: 
  - Javascript
  - Javascript笔记
  - DOM渲染
desctitle: 
mode: default
---


![DOM对象.jpeg][1]
```javascript
//document是一个DOM对象，这个对象本身没有ready方法，要使用就得自己定义，而且过程颇为复杂
//其中一种方法是：
document.ready = function (callback) {
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {
            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            callback();
        }, false)
    }
    else if (document.lastChild == document.body) {
        callback();
    }
}

    //还有一种方法是：
    (function () {
        var ie = !!(window.attachEvent && !window.opera);
        var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
        var fn = [];
        var run = function () { for (var i = 0; i < fn.length; i++) fn[i](); };
        var d = document;
        d.ready = function (f) {
            if (!ie && !wk && d.addEventListener)
                return d.addEventListener('DOMContentLoaded', f, false);
            if (fn.push(f) > 1) return;
            if (ie)
                (function () {
                    try { d.documentElement.doScroll('left'); run(); }
                    catch (err) { setTimeout(arguments.callee, 0); }
                })();
            else if (wk)
                var t = setInterval(function () {
                    if (/^(loaded|complete)$/.test(d.readyState))
                        clearInterval(t), run();
                }, 0);
        };
    })();

//实际使用的时候，上面两种方法选一个即可使用 document.ready( function(){} );
//结论是原生js本身并没有提供 document.ready方法

```


  [1]: http://www.gonwe.cn/usr/uploads/2023/01/3199666974.jpeg