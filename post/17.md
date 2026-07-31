---
layout: post
cid: 17
title: JS里面function和Function的区别 
slug: 17
date: 2022/05/09 15:36:00
updated: 2022/05/10 14:41:41
status: publish
author: Gonwe
categories: 
tags: 
---


简单点说:大写的Function是一个类 ,而小写的function是一个对象。 Function是一个构造器,function是Function实例化的一个对象,包含[[call]][[code]]等等属性,可以被执行。

具体使用方法：
```typescript
function callAnotherFunc(fnFunction, vArgument) {
   fnFunction(vArgument);
}
var doAdd = new Function("iNum", "alert(iNum + 10)");
callAnotherFunc(doAdd, 10); //输出 "20" 
```

定义普通函数就用function：
```typescript
var func = function(arg0, arg1, ... argN) { statements };//函数直接量
```