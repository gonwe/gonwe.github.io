---
layout: post
cid: 93
title: Error: permission denied 0.0.0.0:XXX 报错解决
slug: 93
date: 2022/08/10 12:18:27
updated: 2022/08/10 12:25:41
status: publish
author: Gonwe
categories: 
  - 前端开发
  - 服务端开发
  - 教程·资源
tags: 
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

### 错误原因：

```bash
端口号被占用
```

### 解决方法一：

```bash
修改端口号，或者干掉端口号，重新启动项目
```

干掉端口号方法：

1.进入cmd命令窗口，写netstat -ano|findstr "8080"

```powershell
PS C:\Users\Administrator> netstat -ano|findstr "8080"
  TCP    192.168.0.102:4404     123.151.54.57:8080     ESTABLISHED     4680
  TCP    192.168.0.102:4536     183.47.99.30:8080      ESTABLISHED     4680
```

2.taskkill -PID 4680-F

```powershell
PS C:\Users\Administrator> taskkill -PID 4680 -F
成功: 已终止 PID 为 4680 的进程。
```

### 解决方法二：

执行下列代码复制到`.txt`文本文件改为`.bat`后缀，然后执行指令

```bash
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit
cd /d "%~dp0"
net stop winnat
net start winnat
exit
```

