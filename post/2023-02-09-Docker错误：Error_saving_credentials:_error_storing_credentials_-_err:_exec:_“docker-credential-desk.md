---
layout: post
cid: 164
title: Docker错误：Error saving credentials: error storing credentials - err: exec: “docker-credential-desk
slug: 164
date: 2023/02/09 09:43:16
updated: 2023/02/09 09:43:16
status: publish
author: Gonwe
categories: 
  - 教程·资源
tags: 
  - Docker
  - 容器化
desctitle: 
mode: default
---


![docker.png][1]
报错：Error saving credentials: error storing credentials - err: exec: “docker-credential-desktop”: executable file not found in %PATH%, out: ``
这是docker for window 的 登录远程仓库的报错

在 用户下的`/.docker/config.json`，把`credsStore` 改成 `credStore`就可以了

```json
{
  "credStore": "desktop" #将credsStore 改成 credStore
}

```


  [1]: http://www.gonwe.cn/usr/uploads/2023/02/2070373352.png