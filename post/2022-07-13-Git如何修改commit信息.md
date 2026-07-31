---
layout: post
cid: 64
title: Git如何修改commit信息
slug: 64
date: 2022/07/13 02:58:00
updated: 2022/07/12 19:00:18
status: publish
author: Gonwe
categories: 
  - 教程·资源
tags: 
  - git
  - 版本控制
---


#### 一、git 如何修改最近一次的commit信息

1. `git commit --amend`   
2. 进入vim操作界面之后, 点击字母键 **i** 然后进入INSERT模式，然后对commit信息进行修改，然后ESC 然后` :wq` 保存退出
3. 然后执行 `git log `会发现最近的一次commit信息被修改成功了

#### 二、git 修改已经提交到git远程仓库的commit信息
 1. 首先回撤到上一次提交，不修改本次提交的改动 `git reset --soft HEAD~1`
 2. 重新做一次提交 `git commit -m “重新提交commit信息”` 
 3. 强推本地分支到远程仓库 `git push -f origin master`
 4. 查看远程仓库中的是否已经修改commit信息