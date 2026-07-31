---
layout: post
cid: 172
title: 修复TypeScript tsconfig 错误 无法写入文件 'xxx.js&quot; 因为它会覆盖输入文件
slug: 172
date: 2023/02/21 14:26:23
updated: 2023/02/21 14:26:23
status: publish
author: Gonwe
categories: 
  - TypeScript
  - 教程·资源
tags: 
  - TypeScript
desctitle: 
mode: default
---


##### 问题原因

```json
使用了 "allowJs": true 这一项
```

#####  解决方法

```json
将 "outDir" 这一项指向打包的文件夹 例如 
"outDir": "./dist" // Vite框架的默认打包文件夹为dist
```

![js.jpg][1]


  [1]: http://www.gonwe.cn/usr/uploads/2023/02/1914824654.jpg