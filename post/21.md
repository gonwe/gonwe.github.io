---
layout: post
cid: 21
title: JavaScript对象数组通过参数获取对应的值
slug: 21
date: 2022/05/12 15:21:00
updated: 2022/05/12 15:30:26
status: publish
author: Gonwe
categories: 
  - TypeScript
tags: 
---


#### 例如根据id得到name？
```typescript
const List: { id: number, name: string }[] = [
	{ id: 1, name: '审核' },
	{ id: 2, name: '上线' },
	{ id: 3, name: '开发' },
	{ id: 4, name: '下线' }
];

/** 遍历,逐个遍历,匹配id */
function getNameById(field: number) {
	return client.userList.value.find(i => i.id === field);
};


console.log(getNameById(4).name);//下线

```

