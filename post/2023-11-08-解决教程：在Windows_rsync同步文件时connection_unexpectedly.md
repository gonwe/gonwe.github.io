---
layout: post
cid: 207
title: 解决教程：在Windows rsync同步文件时connection unexpectedly
slug: 207
date: 2023/11/08 14:36:00
updated: 2024/05/24 12:24:56
status: publish
author: Gonwe
categories: 
  - 教程·资源
tags: 
abstract: 
description: 
keyword: 
keywords: 
mode: default
thumb: 
thumbnail: 
video: 
---


![OIP.jpg](https://www.gonwe.cn/usr/uploads/2023/11/2728559145.jpg)


### 问题描述
在使用cwrsync客户端软件将文件同步到服务器时，我们遇到了一些问题。具体来说，当我们尝试使用rsync命令时，命令报错。错误信息如下：

```bash
rsync: connection unexpectedly closed (0 bytes received so far) [Receiver]
rsync error: error in rsync protocol data stream (code 12) at io.c(228) [Receiver=3.2.3]
rsync: connection unexpectedly closed (0 bytes received so far) [sender]
rsync error: error in rsync protocol data stream (code 12) at io.c(228) [sender=3.2.3]
```
    
### 解决方案
经过仔细检查，我们发现在客户端Windows 10系统中之前安装了openssh。
为了解决这个问题，我们将cwrsync的bin目录设置为PATH环境变量，并将其顺序放在openssh之前。
![QQ截图20240524122358.png][1]



这样，当我们运行rsync命令时，系统会优先使用cwrsync而不是openssh。问题得到了解决。


  [1]: https://www.gonwe.cn/usr/uploads/2024/05/1864186584.png