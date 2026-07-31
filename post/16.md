---
layout: post
cid: 16
title: Token 分别放在 cookie、localStorage、sessionStorage 有什么不同？
slug: 16
date: 2022/05/09 11:01:00
updated: 2022/05/12 16:10:16
status: publish
author: Gonwe
categories: 
  - 前端开发
tags: 
---


#### token是什么

简单来说 `token` 其实就是访问资源的凭证

一般是用户通过用户名密码登录成功之后，服务器将登录凭证作为数字签名，加密之后得到的字符串就是 `token`
Token 在用户登录成功之后返回给客户端，客户端组要有三种存储方式

- 储存在 `localStorage` 中，每次调用接口时放在http请求头里面，长期有效

- 储存在 `sessionStorage` 中，每次调用接口时，把它当为一个字段传给后台，浏览器关闭自动清除

- 储存在 `cookie` 中，每次调用接口会自动发送，不过缺点是不能跨域

  

###### 深入了解

将 Token 存储在 webStorage(localStorage,sessionStorage) 中可以通过同域的js访问，这样导致很容易受到 **xss** 攻击，特别是项目中引入很多第三方js库的情况下，如果js脚本被盗用，攻击者就可以轻易访问你的网站。

> xss攻击：是一种注入代码攻击，通过在网站里注入script代码，当访问者浏览网站的时候通过注入的script代码窃取用户信息，盗用用户身份等



将 Token 存储在 cookie 中，可以指定 `httponly` 来防止 js 被读取，也可以指定 secure 来保证 Token 只在 `HTTPS` 下传输，缺点是不符合 `RestFul` 最佳实践，容易受到 **CSRF** 攻击。




> CSRF: 跨站点请求伪造，攻击者盗用已经认证过的用户信息，以用户信息的名义进行操作(转账，购买商品等),由于身份已经认证过了，所以网站会认为此操作是用户本人操作。 CSRF 并不能拿到用户信息，但它可以盗用用户的凭证进行操作。