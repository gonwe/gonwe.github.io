---
layout: post
cid: 94
title: Git：You have not concluded your merge (MERGE_HEAD exists) 解决方法
slug: 94
date: 2022/08/10 12:36:17
updated: 2022/08/10 12:36:46
status: publish
author: Gonwe
categories: 
  - 教程·资源
tags: 
  - git
---



#### 导致原因

```bash
You have not concluded your merge (MERGE_HEAD exists):上一次合并还结束
可能是在以前pull下来的代码自动合并失败

```

#### 解决办法一:保留本地的更改,中止合并->重新合并->重新拉取

```bash
$:git merge --abort
$:git reset --merge
$:git pull
```

#### 解决办法二:舍弃本地代码,远端版本覆盖本地版本(慎重)

```bash
$:git fetch --all
$:git reset --hard origin/master
$:git fetch
```

