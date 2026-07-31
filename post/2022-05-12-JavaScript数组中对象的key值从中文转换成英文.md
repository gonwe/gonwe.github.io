---
layout: post
cid: 22
title: JavaScript数组中对象的key值从中文转换成英文
slug: 22
date: 2022/05/12 15:45:00
updated: 2022/05/12 15:45:55
status: publish
author: Gonwe
categories: 
  - 前端开发
tags: 
---


```typescript
const results = [{
    日期: '2016-05-04',
    姓名: '王小虎',
    地址: '上海市普陀区金沙江路 1517 弄'
}];
```

#### 使用 [Object.keys](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 方法把数组中的对象的key转成中文

```typescript
function transform(results) {
    const mapInfo = {
        '日期': 'date',
        '姓名': 'name',
        '地址': 'address',
    }

    const data = results.map(obj => {
        const newObj = {};
        Object.keys(obj).forEach(zhkey => {
            const enkey = mapInfo[zhkey];
            newObj[enkey] = obj[zhkey];
        })
        return newObj
    })
    return data
}
console.log(transform(results))

//转换后的结果
const tranformArr = [{
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'

}];
```

