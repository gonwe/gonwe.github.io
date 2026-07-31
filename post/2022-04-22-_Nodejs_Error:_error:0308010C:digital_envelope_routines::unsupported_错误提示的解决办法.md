---
layout: post
cid: 4
title:  Nodejs Error: error:0308010C:digital envelope routines::unsupported 错误提示的解决办法
slug: 4
date: 2022/04/22 18:26:00
updated: 2022/08/25 10:50:02
status: publish
author: Gonwe
categories: 
  - 服务端开发
  - Nodejs
tags: 
desctitle: 
mode: default
---


升级了nodejs17后使用`yarn install ` 命令时出现 `Error: error:0308010C:digital envelope routines::unsupported `报错：



**windows**

window10
nodejs版本：v17.0.1

# 原因

node17.0以上的版本不支持这样做，我理解是它不支持直接运行ganache-cli，给出的解决办法也没看懂

可以通过设置环境变量来解决这个问题

> ## **windows**
>
> ```
> NODE_OPTIONS=--openssl-legacy-provider
> ```

> ## **linux**
>
> ```
> export NODE_OPTIONS=--openssl-legacy-provider
> ```

# 解决办法

能根据上面官方解释链接提供的方法去解决就用那个，不能的话就和我一样降低nodejs的版本。

## 降低nodejs版本步骤