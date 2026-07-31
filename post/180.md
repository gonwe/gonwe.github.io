---
layout: post
cid: 180
title: JavaScript包管理工具 PNPM和Yarn的比较
slug: 180
date: 2023/02/23 23:37:00
updated: 2023/03/09 23:41:31
status: publish
author: Gonwe
categories: 
  - 前端开发
  - Nodejs
tags: 
  - NPM
  - Yarn
  - 包管理器
  - PNPM
desctitle: 
mode: default
---


##### pnpm 和 yarn 是两种常见的 JavaScript 包管理工具，它们通常与 npm 一起使用。下面是它们之间的一些主要区别：
![pnpm.png][1]

###### 安装依赖时的方式不同:
npm：在本地项目目录中创建 node_modules 文件夹，按顺序下载各个依赖项，并将它们存储在该文件夹中。
pnpm：在全局 .pnpm-store 文件夹中存储所有依赖项，同时在本地项目目录中安装链接。这意味着如果同一依赖项被多个项目使用，则只需要下载它一次即可。

###### 存储空间占用情况

npm：采用的本地文件存储方式导致每个项目都需要存储一份完整的依赖库，因此占用的磁盘空间较大。
pnpm：共享依赖库可以减少磁盘空间需求，因此所需的空间更少。

###### 性能
npm：相对于其他包管理器，npm 将脚本执行和安装任务考虑在内，可以很好地平衡用户体验和性能。
pnpm：通过 HardLink/Copy 策略来去重依赖以及 Support Hoisting 提高了性能，从而使依赖安装时间和速度得以大幅缩短。
yarn：Yarn 可以并行安装所有依赖项，从而提供更快的安装速度，但占用的磁盘空间明显较大。

###### 总之，虽然在很多方面 pnpm 较 npm 和 yarn 更加优秀，但实际应用中仍需根据具体情况进行取舍。


  [1]: http://www.gonwe.cn/usr/uploads/2023/03/2166293877.png