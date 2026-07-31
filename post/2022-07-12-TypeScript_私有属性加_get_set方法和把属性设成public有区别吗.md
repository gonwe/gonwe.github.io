---
layout: post
cid: 63
title: TypeScript 私有属性加 get/set方法和把属性设成public有区别吗
slug: 63
date: 2022/07/12 15:23:48
updated: 2022/07/12 15:24:25
status: publish
author: Gonwe
categories: 
  - 前端开发
  - TypeScript
tags: 
  - 面向对象
  - TS
  - TypeScript
---



```typescript
class test {
    private int:number = 0;
    private double:number = 0;
    
    public getInt():number {
        return this.int;
    }
    public setInt(value:number):void {
        this.int = value;
    }

    public getDouble():number {
        return this.double;
    }

    public setDouble(value:number):void {
        this.double = value;
    }
}
```

> 比如这里有两个私有属性并提供`get/set`方法，和直接设置`public`有什么区别？

如果仅仅是图中的例子，那么你说的这两种方式是没什么区别的。外部调用的结果都可以对属性进行读取与修改。

但是这个例子只是展示了一个常规的私有属性与` get/set `方法的使用模式，仅仅从这个例子中看不出来这个模式有什么好处。实际上，公共属性与私有属性的使用，还是有很大区别的：

- 如果一个属性是 `public`，那么外部可以**直接**对这个属性进行读取与修改；
- 如果一个属性是 `private`，那么外部**不可以直接**对这个属性进行读取与修改，而是通过这个类提供的 `get`、`set `方法去访问。

也就是说，前者把控制权交给别人，而后者的控制权还在自己手中。我举几个简单的例子：

- 比如说一个只读属性，可以提供 get 方法给外界调用读取，但是不允许修改，那么这时候可以不提供 `set `方法，或者在 `set` 方法中抛出异常；
- 比如我的数据格式与别人使用的格式不同，那么我可以在 `get` 与 `set `方法中，加上进行格式转换的代码；
- 比如我的数据可以被读取与修改，但是修改时候必须经过我的验证，那么我的 set 方法中会添加数据验证的代码。

也就是说，`get`、`set `方法的主要作用是**控制**外界对私有属性的访问。这一点，将属性声明为 `public` 是做不到的。

再举个大白话的例子。比如我有一本书，如果这本书声明为 `public`，那么书的控制权在外人手里，外人可以直接把书拿走去读，还可以在书上乱写乱画。但是如果声明为 `private`，书的控制权在我自己手里，别人想要看书，必须先经过我的允许（`get` 方法控制），而且绝对不能在书上乱写乱花（`set `方法控制）。  

`private` 目的是私有, 是不让别人用,` get/set`方法目的是让别人用. 这岂不矛盾了? 
你说的是这个问题吧. 
是这样的`private` 是不让别人用, `public` 是让别人用, 但是有一种需求是让有的人用而让另外一些人不能用. 这时`private/public`的功能就出现短板了. 这时就有了`set/get`方法的用武之地了. 我们可以在`set/get`方法是设置, 如下: 

```typescript
 public set(某某某){ 
     if(你是一些人){ 
       你可以设置 
     }else{ 
       对不起, 你没有设置的权限. 
     } 
} 
```



可以说: `get/set`+`private` 的功能完全包含了`private/public` 的功能. 所以这也成了一种编程的习惯. 