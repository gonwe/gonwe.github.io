---
layout: post
cid: 11
title: Nodejs 报错 throw er; // Unhandled 'error' event 解决办法
slug: 11
date: 2022/05/05 14:23:00
updated: 2022/05/10 14:41:53
status: publish
author: Gonwe
categories: 
  - 服务端开发
tags: 
  - Nodejs
---


```bash
node:events:504
[0]       throw er; // Unhandled 'error' event
[0]       ^
[0]
[0] Error: listen EACCES: permission denied 0.0.0.0:8080
[0]     at Server.setupListenHandle [as _listen2] (node:net:1313:21)
[0]     at listenInCluster (node:net:1378:12)
[0]     at doListen (node:net:1516:7)
[0]     at processTicksAndRejections (node:internal/process/task_queues:84:21)
[0] Emitted 'error' event on Server instance at:
[0]     at emitErrorNT (node:net:1357:8)
[0]     at processTicksAndRejections (node:internal/process/task_queues:83:21) {
[0]   code: 'EACCES',
[0]   errno: -4092,
[0]   syscall: 'listen',
[0]   address: '0.0.0.0',
[0]   port: 3100
[0] }
```

错误原因：

```bash
端口号被占用。
```

解决方法：

```bash
修改端口号，或者干掉端口号，重新启动项目
```

干掉端口号方法：

1.进入cmd命令窗口，写netstat -ano|findstr "8080"
![QQ截图20220505141949.png][1]

2.taskkill -PID 13512 -F
![Snipaste_2022-05-05_14-21-14.png][2]


  [1]: http://43.138.147.220/usr/uploads/2022/05/50344790.png
  [2]: http://43.138.147.220/usr/uploads/2022/05/2906407186.png