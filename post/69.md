---
layout: post
cid: 69
title: JS-Web-API - Ajax
slug: 69
date: 2022/07/13 20:26:37
updated: 2022/07/13 20:28:33
status: publish
author: Gonwe
categories: 
  - 前端开发
  - 教程·资源
tags: 
  - Javascript笔记
  - Ajax
  - XMLHttpRequest
  - Ajax状态码
  - 同源策略
  - 跨域
  - CDN
  - JSONP
  - JQuery
  - CORS
  - 跨越解决方案
---


####　1.手写简易Ajax

```javascript
//Ajax - GET请求
const xhr = new XMLHttpRequest();
// true 为异步，false为同步
xhr.open('GET', 'URL', false)
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log(xhr.response);
   		}
    }
}
xhr.send(null)

//Ajax - POST请求
const post = new XMLHttpRequest();
// true 为异步，false为同步
post.open('POST', 'URL', true);
post.onreadystatechange = () => {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            // TODO
        }
    }
}
const postData = {
    userName: 'user',
    passWord: 'xxxx'
}
post.send(JSON.stringify(postData))
```

#### 2.Ajax状态码

##### xhr.readyState

> 0 -（未初始化）还没有调用send()方法
>
> 1 -（载入）已调用send()方法，正在发送请求
>
> 2 -（载入完成）send()方法执行完成，已经接收到全部响应内容
>
> 3 -（交互）正在解析响应内容
>
> 4 -（完成）响应内容解析完成，可以在客户端调用

##### xhr.status

> 2Xx - 表示成功处理请求，如200
> 3Xx - 需要重定向，浏览器直接跳转，如301、302、304
> 4Xx - 客户端请求错误，如404、403
> 5Xx - 服务器端错误

#### 3.同源策略与跨域

- ajax请求时，浏览器要求当前网页和server必须同源（安全）
- 同源：协议、域名、端口，三者必须一致
- 加载图片css js可无视同源策略

> 1. `<img src=跨域的图片地址/>` 可以用于统计打点，使用第三方统计服务
> 2. `<link href:=跨域的css地址/>` 可以和`script `用于加载CDN，CDN一般都是外域
> 3. `<script src:=跨域的js地址></script>` 可实现JSONP前端跨越解决方案

- 所有的跨域，都必须经过server端允许和配合
- 未经server端允许就实现跨域，说明浏览器有漏洞，危险信号

#### 4.跨越解决方案 - JSONP

实现原理:`<script>`可绕过跨域限制，服务器可以任意动态拼接数据返回，所以，`<script>`就可以获得跨域的数据，只要服务端愿意返回。

```html
<script>
    window.callback = function(data) {
        console.log(data);
    };
</script>

<!--  服务端返回一个名字为callback的函数，前端执行这个函数 -->
<!--  等于callback(data) // { name:gonwe, age:18} -->
<script src="https://xxx:8001/api.js"></script> 
```

```javascript
// https://xxx:8001/api.js
let data = { name:gonwe, age:18}
callback({data})
```

```javascript
// JQuery使用JSONP
$.ajax({
    url: 'http:/localhost:8882/x-origin.json',
    dataType: 'jsonp',
    jsonpCallback: 'callback',
    success: function (data) {
        console.log(data)
    }
})
```

#### 5.跨越解决方案 - CORS （服务端）

```javascript
//该字段必需。设置允许请求的域名，多个域名以逗号分隔，也可以设置成 * 即允许所有源访问
Access-Control-Allow-Origin:  http://www.YOURDOMAIN.com
//该字段必需。设置允许请求的方法，多个方法以逗号分隔
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
//该字段可选。设置允许请求自定义的请求头字段，多个字段以逗号分隔
Access-Control-Allow-Headers: Authorization
//该字段可选。设置是否允许发送 Cookies
Access-Control-Allow-Credentials: true      
//设置方法
response.setHeader('Access-Control-Allow-Origin', 'http://www.YOURDOMAIN.com')
```
