---
layout: post
cid: 197
title: 腾讯轻量级应用服务器 Typecho 配置 SSL 证书
slug: 197
date: 2023/05/05 12:25:22
updated: 2023/05/05 12:25:22
status: publish
author: Gonwe
categories: 
  - 教程·资源
tags: 
  - Typecho
  - 轻量级应用服务器
  - SSL
  - 网站安全
  - HTTPS
  - Nginx
desctitle: 
mode: default
---



#### 前提步骤

在您开始此教程之前，请确保已经完成了以下步骤：

1. 已购买有效的 SSL 证书
2. 已将域名解析到服务器上，并配置了 Nginx 环境。如果您还没有搭建 Nginx ，请参考相关文档。
3. 本文档以证书名称 `www.gonwe.cn` 为例。

#### 配置 SSL证书

下面是在 Typecho 中配置 SSL 证书的步骤：

###### 1. 下载并复制SSL证书

   首先，通过证书授权机构 (CA) 获得 SSL 证书。在获得 SSL 证书后，在本地计算机上可以生成一个 `.crt` 文件和一个 `.key` 文件。需要将这两个文件复制到服务器上。赋值到此目录`/usr/local/lighthouse/softwares/nginx/certificates`)。

   ```bash
   # 证书文件
   www.gonwe.cn.crt
   # 私钥文件
   www.gonwe.cn.key
   ```

   > 如果没有certificates文件夹，直接创建一个。

   

###### 2. 修改 Nginx 配置文件

   打开 Nginx 的配置文件（例如：`/usr/local/lighthouse/softwares/nginx/conf/include/www.gonwe.cn.conf`）并添加以下内容：

   ```nginx
   server {
     	listen 443 ssl;
     	server_name www.gonwe.cn;
     	server_tokens off;
     	keepalive_timeout 10;
        # 添加以下两行以指定 SSL 证书位置
     	ssl_certificate /usr/local/lighthouse/softwares/nginx/certificates/www.gonwe.cn_bundle.crt;
     	ssl_certificate_key /usr/local/lighthouse/softwares/nginx/certificates/www.gonwe.cn.key;
     	ssl_session_timeout 5m;
     	ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
     	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
     	ssl_prefer_server_ciphers on;
       
       # 当请求目录时，默认返回 index.php 或 index.html 文件；
     	index index.php index.html;
   
       # 指定网站根目录
     	root /usr/local/lighthouse/softwares/typecho;
       
       # 当请求文件不存在时，将请求重定向到 index.php 文件；
     	if (!-e $request_filename) {
       	rewrite ^(.*)$ /index.php$1 last;
    	 }
       
     	location ~ .*\.php(\/.*)*$ {
       	include fastcgi.conf;
       	fastcgi_pass 127.0.0.1:9000;
     	}
   
   	# 禁 止 访 问 的 文 件 或 目 录
    	location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md) {
     	   return 404;
    	 }
   
     	location ~ \.well-known {
       	allow all;
     	}
   
     	access_log "logs//www.gonwe.cn.log";
     	error_log "logs//www.gonwe.cn.error.log";
   }
   ```

   注意，一定要将 `server_name` 修改为您自己的域名，并将 `ssl_certificate` 和 `ssl_certificate_key` 指向您的证书文件。

   如果`/usr/local/lighthouse/softwares/nginx/conf/include/`目录下只有一个`typecho.conf`文件，需要自己创建一个文件并添加以上内容。

   

###### 3. 强制开启HTTPS

   强制开启HTTPS最简单的方法就是通过重定向方式转到HTTPS。

   在上述代码中继续添加重写规则，如下：

   ```bash
   server {
     listen 80;
     server_name www.gonwe.cn; 
     rewrite ^(.*)$  https://$host$1 permanent;
   }
   ```

   > 如果HTTP的方式还是可以访问的，将 `www.gonwe.cn` 域名的所有 HTTP 请求重定向到 HTTPS，以达到网站加密传输的目的。

   

###### 4. 重启 Nginx

   在添加了 SSL 配置后，需要重新加载 Nginx。可以使用以下命令：

   ```bash
   /usr/local/lighthouse/softwares/nginx/sbin/nginx -s reload
   ```

###### 5. 测试站点是否成功升级为 HTTPS

   访问您的站点 `https://www.gonwe.cn` ，如果可以正常访问，则说明 SSL 已正确安装。

###### 6. 更新 Typecho 的站点地址

   将 Typecho 站点的地址更新为 `https://www.gonwe.cn` 。打开 Typecho 后台，在“设置”-> “基础”中找到“站点地址”选项，将其更改为 `https://www.gonwe.cn` 并单击“保存”。

###### 7. 强制 Typecho 使用HTTPS协议

   在你项目根目录下，打开 `config.inc.php`，加入以下代码：

   ```php
   /** 开启HTTPS */
   define('__TYPECHO_SECURE__',true);
   ```

> 如果不加入，网站后台还是会调用HTTP资源。

以上就是在 Typecho 中配置 SSL 证书的全部步骤。如果您遇到问题或错误，请参照具体情况进行问题排除。希望本文对您有所帮助！