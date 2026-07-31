---
layout: post
cid: 92
title: JWT (JSON Web Tokens)跨域认证解决方案
slug: 92
date: 2022/07/28 14:33:00
updated: 2022/08/10 12:32:19
status: publish
author: Gonwe
categories: 
  - 服务端开发
tags: 
  - 同源策略
  - 跨域
  - Authorization
  - JWT
---


### 1. 什么是JWT？

```
JWT (JSON Web Tokens)是一种跨域认证解决方案。
```

> - 数据传输简单、高效
> - JWT会生成签名，保证传输安全
> - JWT具有时效性
> - JWT更高效利用集群做好单点登录

### 2. 原理

```
服务端认证后，生成一个JSON对象，后续通过JSON进行通信。
```

### 3. 数据结构

   Header（头部）.Payload（负载）.Signature（签名）

   - Header结构

     ```json
     {
         "alg":"HS256", //是指定加密的算法
         "typ":"JWT" //声明类型
     }
     ```

   - Payload结构

     ```javascript
     1.iss token的发行者
     2.sub 该jwt所面向的用户
     3.aud 接收该jwt的一方
     4.exp token的失效时间
     5.nbf 在此时间段之前,不会被处理
     6.iat jwt发布时间
     7.jti jwt唯一标识,防止重复使用
     ```

   - Signature（签名）

     signature 是签证信息，该签证信息是通过header和payload，加上secret(密钥)，通过算法加密生成。

     `公式 signature = 加密算法(header + “.” + payload, 密钥)`;

### 4. 使用方式

      1. /api?token=xxx
      2. cookie写入token
      3. storage写入token，请求头添加：`Authorization：Bearer<token>`