---
layout: post
cid: 158
title: 安装wsl2 报错，WslRegisterDistribution failed with error: 0x80070002
slug: 158
date: 2022/10/20 10:21:00
updated: 2023/01/12 14:33:23
status: publish
author: Gonwe
categories: 
  - 服务端开发
  - 教程·资源
tags: 
desctitle: 
mode: default
---


```bash
Installing, this may take a few minutes...
WslRegisterDistribution failed with error: 0x80070002
Error: 0x80070002 The system cannot find the file specified.
 
Press any key to continue...
```



#### 解决方法：

1. 不要默认用wsl2，默认用wsl1（[powershell](https://so.csdn.net/so/search?q=powershell&spm=1001.2101.3001.7020)打开后输入`wsl --set-default-version 1`）

2. 重新安装发行版 ` wsl --install -d Debian`。

3. 切换到wsl2 ` wsl --set-default-version 2`

![WSL2.jpeg][1]


  [1]: http://www.gonwe.cn/usr/uploads/2023/01/4194574982.jpeg