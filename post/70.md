---
layout: post
cid: 70
title: 使用 Promise 手写简易Ajax方法
slug: 70
date: 2022/07/13 20:29:10
updated: 2022/07/13 20:29:55
status: publish
author: Gonwe
categories: 
  - 前端开发
  - 教程·资源
tags: 
  - ECMAScript
  - Javascript笔记
  - Promise
  - ES6
  - Ajax
---



```javascript
// Promise Ajax方法
function ajax(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else if (xhr.status === 404) {
                    reject(new Error('404 not found'))
                }
            }
        }
        xhr.send(null)
    })
}
ajax('/ajax.json').then(res => { console.log(res); }).catch(err => { console.error(err); })
```
