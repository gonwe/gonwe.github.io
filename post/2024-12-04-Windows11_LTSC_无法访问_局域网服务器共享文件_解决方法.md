---
layout: post
cid: 199
title: Windows11 LTSC 无法访问 局域网服务器共享文件 解决方法
slug: 199
date: 2024/12/04 14:48:00
updated: 2024/12/04 14:48:26
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


重新安装系统 Windows 10 企业版 LTSC 后，原本可以访问局域网本地服务器的共享目录，现在不能访问了，就是出现下图信息

![微信截图_20230726120553.png](https://www.gonwe.cn/usr/uploads/2023/07/1648602175.png)


##### 解决方法

###### 方法/步骤

- 开始按住快捷键win+R，在运行窗口输入“gpedit.msc”回车运行或按“确定”按钮
![微信截图_20230726120816.png](https://www.gonwe.cn/usr/uploads/2023/07/664354070.png)


- 在弹出的“本地策略组编辑器里选择”下图红色标记。双击“启用不安全来宾登录”

 
![微信截图_20230726120502.png](https://www.gonwe.cn/usr/uploads/2023/07/1430214014.png)


- 在弹出的窗口里选择下图红色框指向的“已启用”，点“确认”按钮。
![微信截图_20230726120659.png](https://www.gonwe.cn/usr/uploads/2023/07/259836786.png)


这样windows 10 就可以访问smb服务器的共享文件夹了。

### 2024年更新

1.打开组策略，在“本地计算机策略 > 计算机配置 > 管理模板 > 网络 > Lanman 工作站”中启用“启用不安全的来宾登录”。
2.打开组策略，在”本地计算机策略 > 计算机配置 > Windows 设置 > 安全设置 > 本地策略>安全选项”中禁用“Microsoft 网络客户端：对通信进行数字签名（始终）”。
立即生效。
3.还需要追加以下2个命令 搜索 powershell 以管理员身份运行
```bash
  Set-SmbClientConfiguration -RequireSecuritySignature $false
```
输入A  回车
```bash
  Set-SmbServerConfiguration -RequireSecuritySignature $false
```
输入A  回车


