---
layout: post
cid: 7
title: 记一次 TimescaleDB 的数据备份与恢复
slug: 7
date: 2022/04/26 10:57:00
updated: 2022/08/25 10:50:11
status: publish
author: Gonwe
categories: 
  - 服务端开发
tags: 
desctitle: 
mode: default
---


## TimescaleDB 相关
- 启动一次服务器，确保已经创建了 `senssion` 表 和 `event` 表
- 连接数据库
	```bash
	psql postgres://postgres:xxx@localhost:5432/xxx
	```

### TimescaleDB 数据备份与恢复
- 导出CSV
	```bash
	set client_encoding=UTF8;
	\COPY (SELECT * FROM senssion) TO 'timescale-senssion.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8';
	\COPY (SELECT * FROM event) TO 'timescale-event.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8';
	```
- 从CSV导入数据
	```bash
	set client_encoding=UTF8;
	\COPY senssion FROM 'timescale-senssion.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8';
	\COPY event FROM 'timescale-event.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8';
	```
