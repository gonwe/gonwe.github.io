---
layout: post
cid: 23
title: 浅析浏览器存储（localStorage、sessionStorage、cookie) 区别
slug: 23
date: 2022/05/12 16:11:00
updated: 2022/05/12 16:11:34
status: publish
author: Gonwe
categories: 
tags: 
---


HTML5新增了本地存储Web Storage，用于存储页面数据的，不同浏览器有差异；不兼容ie8及以下浏览器；Web Storage包含了两种对象：sessionStorage和localSotrage。这两个对象在支持的浏览器中都是以windows对象属性的形式存在，下面简单分析下新增本地存储Web Storage和cookie的区别

#### localStorage 

生命周期是永久，除非主动清除`localStorage`信息，否则这些信息将永远存在。

存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。

```typescript
// 1、保存数据到本地

// 第一个参数是保存的变量名，第二个是赋给变量的值
localStorage.setItem('Author', 'local');

// 2、从本地存储获取数据
localStorage.getItem('Author');

// 3、从本地存储删除某个已保存的数据
localStorage.removeItem('Author');

// 4、清除所有保存的数据
localStorage.clear();
```

#### sessionStorage 

仅在当前会话下有效，关闭页面或浏览器后被清除。

存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。

```typescript
// 1、保存数据到本地
// 第一个参数是保存的变量名，第二个是赋给变量的值
sessionStorage.setItem('Author', 'session');

// 2、从本地存储获取数据
sessionStorage.getItem('Author');

// 3、从本地存储删除某个已保存的数据
sessionStorage.removeItem('Author');

// 4、清除所有保存的数据
sessionStorage.clear();
```

#### 复杂数据存储

上面都是对于简单的数据类型的存储，但当要存储的数据是一个对象或是数组的时候，直接存储是不行的
这个时候，就需要转换数据格式。
存储数据前：利用`JSON.stringify`将对象转换成字符串
获取数据后：利用`JSON.parse`将字符串转换成对象

```javascript
var user = {
	username: 'liu',
	password: '123456'
};

user = JSON.stringify(user);
sessionStorage.setItem('user', user);
var account = sessionStorage.getItem('user');
console.log(account);
account = JSON.parse(account)
console.log(account);
```



#### cookie

cookie机制：如果不在浏览器中设置过期事件，cookie被保存在内存中，生命周期随浏览器的关闭而结束，这种cookie简称为会话cookie。如果在浏览器中设置了cookie的过期事件，cookie会被保存在硬盘中，关闭浏览器后，cookie数据仍然存在，直到过期事件结束才消失。
cookie是服务端发给客户端的特殊信息，cookie是以文本的方式保存在客户端，每次请求时都带上它


```javascript
// 1、保存数据到本地
// 第一个参数是保存的变量名，第二个是赋给变量的值
//保存cookie
//参数：cookie名,cookie值,有效时长(单位：天)

function saveCookie(cookieName, cookieValue, cookieDates) {
    var d = new Date(); d.setDate(d.getDate() + cookieDates);
    document.cookie = cookieName + "=" + cookieValue + "expires = " + d.toGMTString();
}

// cookie的获取
function getCookie(cookieName) {
    var cookieStr = unescape(document.cookie);
    var arr = cookieStr.split("; ");
    var cookieValue = "";
    for (var i = 0; i < arr.length; i++) {
        var temp = arr[i].split("=");
        if (temp[0] == cookieName) {
            cookieValue = temp[1]; break;
        }
    }
    return cookieValue;
}

//删除cookie
function removeCookie(cookieName) {
    document.cookie = encodeURIComponent(cookieName) + "=" + "expires=" + new Date();
}
```

**cookie缺点：**

1. 大小受限

2. 用户可以操作（禁用）cookie，使功能受限
3. 安全性较低
4. 有些状态不可能保存在客户端。
5. 每次访问都要传送cookie给服务器，浪费带宽。
6. cookie数据有路径（path）的概念，可以限制cookie只属于某个路径下。