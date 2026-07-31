---
layout: post
cid: 97
title: 解决Please make sure you have the correct access rights问题
slug: 97
date: 2022/08/17 12:01:29
updated: 2022/08/17 12:01:41
status: publish
author: Gonwe
categories: 
  - 教程·资源
tags: 
  - git
  - 版本控制
---


问题:

> Please make sure you have the correct access rights and the repository exists 

原因:

> 公钥出问题了,需要删除.ssh下文件,然后重设置用户名和邮箱再重新生成ssh公钥即可解决

下面请看解决办法!

打开终端 输入

```bash
# 进入ssh文件夹
$ cd ~/.ssh

# 查看是否存在
$ ls -r 
 Directory: C:\Users\Administrator\.ssh
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---            2022/4/8    16:19            122 config
-a---            2021/8/6    16:38           2602 id_rsa
-a---            2021/8/6    16:38            570 id_rsa.pub
-a---           2022/8/17    11:38           1338 known_hosts
-a---            2021/9/3    16:35            379 known_hosts.old

# 删除已经存在的id_rsa文件
$  rm .\id_rsa
$  rm .\id_rsa.pub

# 输入你的邮箱重新生成公钥
$ ssh-keygen -t rsa -C 'your@qq.com'

# 输入用户名密码阶段 可以直接 enter 跳过
Generating public/private rsa key pair.
Enter file in which to save the key (C:\Users\Administrator/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in C:\Users\Administrator/.ssh/id_rsa.
Your public key has been saved in C:\Users\Administrator/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:K7q5udGqpJlbAvMA9hYhcH0JRdS0 your@qq.com
The key's randomart image is:
+---[RSA 3072]----+
| . +..    .      |
|  + +            |
|.. =    S        |
|* * o.   .       |
|=*.*. o .        |
|+=+  * .         |
|o+..O+           |
+----[SHA256]-----+

# 查看是否生成成功
$ cat ~/.ssh/id_rsa.pub
```

生成成功

```bash
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDyGYJ0Qb/5iYnu5UgjKUwUAFAhG7QabJZclicf2brcKaEIO1T6OZLRv8G9fhk5H7cnWbVYzDBEDVRPusIHEgxosdf1iQ99nh1p+yguJ/LcYM1TGAgYEWpYs3SMjLXZ29uDh5o8+ID9nnAFMYdOgvFcK4bbpAvQBV8CH1ElRua0l974tnvE28k7Sc7KR2JduOqtoSIYSFM4rBy7xwSZYk6YPyFsmMbgaVtn8hbo384XEa5nH2jCsfYBur/nQ4Rb6K+qriEw01hi4UCSQFU+1HETGxi3EVr0Ja0tt6ch705Ik6ZqspO9Y6qAKi9IPgzPN8RCHf1bP3unMm/s= your@qq.com
```

将内容复制到`github`上设置 ssh密钥的地方

下一步保存 就OK啦！