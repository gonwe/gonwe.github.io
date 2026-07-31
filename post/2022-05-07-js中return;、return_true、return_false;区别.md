---
layout: post
cid: 15
title: js中return;、return true、return false;区别
slug: 15
date: 2022/05/07 17:25:00
updated: 2022/05/10 14:41:35
status: publish
author: Gonwe
categories: 
  - 前端开发
tags: 
---


一、返回控制与函数结果

语法为：return 表达式

语句结束函数执行，返回调用函数，而且把表达式的值作为函数的结果

二、返回控制

无函数结果，语法为：return;

 

在大多数情况下，为事件处理函数返回false,可以防止默认的事件行为。例如，默认情况下点击一个<a>元素，页面会跳转到该元素href属性指定的页面。

return false; 就相当于终止符，

return true;  就想当于执行符。

在js中，return false的作用一般是用来取消默认动作的。比如你单击一个链接除了触发你的onclick事件（如果你指定的话）以外还要触发一个默认事件就是执行页面的跳转。所以如果你想取消对象的默认动作就可以return false.

首先在js中，我们常用return false来阻止提交表单或者继续执行下面的代码，通俗的来说就是阻止执行默认的行为。

    function a(){
    
       if(true)
    
          return false;
    
    }

这是没有任何问题的

如果我改成这种

    function Test(){
    
       a();
    
       b();
    
       c();
    
    }

即使a函数返回return false阻止提交了，但是不影响b()以及c()函数的执行。在Test()函数里调用a()函数，那a()里面的return false对于Test()函数来说，只是相当于返回值。而不能阻止Test()函数执行。

总之：return false只在当前函数有效，不会影响其他外部函数的执行。

三：总结

retrun true;返回正确的处理结果。

retrun false;返回错误的处理结果，终止处理。

retrun;把控制权返回给页面。

 来源：http://www.cnblogs.com/weiwang/archive/2013/08/19/3268374.html