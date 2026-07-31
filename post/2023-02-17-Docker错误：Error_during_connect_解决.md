---
layout: post
cid: 168
title: Docker错误：Error during connect 解决
slug: 168
date: 2023/02/17 16:04:36
updated: 2023/02/17 16:04:36
status: publish
author: Gonwe
categories: 
  - 前端开发
tags: 
  - Docker
  - 容器化
desctitle: 
mode: default
---



在Windows执行docker命令的提示如下错误

```bash
    docker: error during connect: This error may indicate that the docker daemon is not running.: Post “http://%2F%2F.%2Fpipe%2Fdocker_engine/v1.24/containers/create”: open //./pipe/docker_engine: The system cannot find the file specified.
 See ‘docker run --help’.
```

**遇到错误消息：** docker 进程没有启动。

##### 方法一：
直接找到Docker的图标启动Docker即可

##### 方法二：
进到文件夹：C:\Program Files\Docker\Docker

```bash
cd "C:\Program Files\Docker\Docker"
```

执行 DockerCli -switchDaemon

```bash
 ./DockerCli -switchDaemon
```
Docker运行起来后再去执行命令即可。
![docker.png][1]


  [1]: http://www.gonwe.cn/usr/uploads/2023/02/1114215282.png