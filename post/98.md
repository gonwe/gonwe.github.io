---
layout: post
cid: 98
title: JavaScript代码整洁（ Clean Coding ）最佳实践
slug: 98
date: 2022/08/18 18:04:45
updated: 2022/08/18 18:07:14
status: publish
author: Gonwe
categories: 
  - 前端开发
  - 服务端开发
  - TypeScript
  - 教程·资源
tags: 
  - Nodejs
  - ECMAScript
  - Javascript笔记
  - Promise
  - ES6
  - Clean Coding
---


## JavaScript代码整洁（ Clean Coding ）最佳实践

### 代码整洁（ Clean Coding ）是什么意思？

  所谓的clean code 字面上就是整洁代码的含义，落实到我们工程师日常coding中就是如何写出看上去干净、逻辑清晰、有一定抽象能力扩展性好的代码。写的代码是方便和同事协作开发，不单单是为机器编写，所有，代码尽可能让人容易理解。

  这些文字的定义显得不那么生动形象，看看下图

![CleanCode.jpg][1]

左侧的就是clean code，右侧的就是WTF(让人看见想骂xx的意思) code。那么有的人会问clean code也有WTF，是不是还不是真正的clean code，如果你是一个追求极致的人那么这个问题没毛病。但是我想说的是没有什么代码没有0 WTF的，及时所谓非常整洁规范、干净的代码也或多或少是些小毛病。所以我们工程师能够向着0 WTF的方向去努力去优化自己的代码就是成功的。现在我们知道了开发者的目标是什么了，下面来一起看看**最佳实践**吧！

###   变量应该如何命名？

 使用**有意义且准确**的名称，不要因为有长的名称而节省几个键盘敲击。**如果您遵循此实践**，变量会变得方便搜索，当你需要重构或者查找某些关键字的时候会有很大的帮助。

```javascript
// 错误命名
let d
let elapsed
const ages = arr.map((i) => i.age)

// 正确打开方式
let daysSinceModification
const agesOfUsers = users.map((user) => user.age)
```

另外，要进行有意义的区分，不要在变量名中添加额外的、不必要的名词，比如它的类型(匈牙利表示法)。

> 在匈牙利表示法中，变量名以一个或多个小写字母开始，代表变量的类型。后面附以变量的名字，变量名以意义明确的大小写混合字母序列所构成。

```javascript
// 不建议写法
let nameString
let theUsers

// 建议写法
let name
let users
```

变量名称应该准确而简练，琅琅上口，让人更容易理解。

进行代码评审时更方便查阅参考。

简而言之，我们需要让命名含义清楚,知名见意。

```javascript
// 不建议写法
let fName, lName
let cntr

let full = false
if (cart.size > 100) {
  full = true
}

// 建议写法
let firstName, lastName
let counter

const MAX_CART_SIZE = 100
// ...
const isFull = cart.size > MAX_CART_SIZE
```

### 函数应该怎么写？

复杂的方法应该抽离出独立的函数

> **函数应该做一件事。做好这件事。只做这一件事。**— Robert C. Martin (Uncle Bob)

```javascript
// 不建议写法
function getUserRouteHandler (req, res) {
    const { userId } = req.params
    // inline SQL query
    knex('user')
      .where({ id: userId })
      .first()
      .then((user) => res.json(user))
  }
  
  // 建议写法
  // User model (eg. models/user.js)
  const tableName = 'user'
  const User = {
    getOne (userId) {
      return knex(tableName)
        .where({ id: userId })
        .first()
    }
  }
  
  // route handler (eg. server/routes/user/get.js)
  function getUserRouteHandler (req, res) {
    const { userId } = req.params
    User.getOne(userId)
      .then((user) => res.json(user))
  }
```

正确的函数写法方便在遇到问题时调试。

### 使用较长有描述意义的命名

函数名应该是动词或动词短语，它需要传达其意图，以及参数的顺序和意图。

一个长的有描述性的的名字比一个短的，不知所谓的名字或一堆描述性注释要好得多。

```javascript
// DON'T
/**
 * Invite a new user with its email address
 * @param {String} user email address
 */
function inv (user) { /* implementation */ }

// DO
function inviteUser (emailAddress) { /* implementation */ }
```

### 避免参数过长

尽量使用单个对象参数和解构赋值，这样更容易处理可选参数。

```javascript
// DON'T
function getRegisteredUsers (fields, include, fromDate, toDate) { /* implementation */ }
getRegisteredUsers(['firstName', 'lastName', 'email'], ['invitedUsers'], '2016-09-26', '2016-12-13')

// DO
function getRegisteredUsers ({ fields, include, fromDate, toDate }) { /* implementation */ }
getRegisteredUsers({
  fields: ['firstName', 'lastName', 'email'],
  include: ['invitedUsers'],
  fromDate: '2016-09-26',
  toDate: '2016-12-13'
})
```

### 减少副作用

尽可能使用没有副作用的纯函数。这样方便使用和测试。

> 纯函数的概念：一个函数的返回结果只依赖其参数，并且执行过程中没有副作用。

```javascript
// DON'T
function addItemToCart (cart, item, quantity = 1) {
  const alreadyInCart = cart.get(item.id) || 0
  cart.set(item.id, alreadyInCart + quantity)
  return cart
}

// DO
// not modifying the original cart
function addItemToCart (cart, item, quantity = 1) {
  const cartCopy = new Map(cart)
  const alreadyInCart = cartCopy.get(item.id) || 0
  cartCopy.set(item.id, alreadyInCart + quantity)
  return cartCopy
}

// or by invert the method location
// you can expect that the original object will be mutated
// addItemToCart(cart, item, quantity) -> cart.addItem(item, quantity)
const cart = new Map()
Object.assign(cart, {
  addItem (item, quantity = 1) {
    const alreadyInCart = this.get(item.id) || 0
    this.set(item.id, alreadyInCart + quantity)
    return this
  }
})
```

### 自顶向下读代码：向下规则

优先级高的函数应该位于顶层，优先级低的函数应该位于下层。使阅读源代码更自然。

> 我们想要让每个函数后面都跟着位于下一抽象层级的函数，这样一来，在查看函数列表时，就能循抽象层级向下阅读了。这就叫作向下规则。

```javascript
// DON'T
// "I need the full name for something..."
function getFullName (user) {
  return `${user.firstName} ${user.lastName}`
}

function renderEmailTemplate (user) {
  // "oh, here"
  const fullName = getFullName(user)
  return `Dear ${fullName}, ...`
}

// DO
function renderEmailTemplate (user) {
  // "I need the full name of the user"
  const fullName = getFullName(user)
  return `Dear ${fullName}, ...`
}

// "I use this for the email template rendering"
function getFullName (user) {
  return `${user.firstName} ${user.lastName}`
}
```

### 查询或修改

函数要么做某事(修改)，要么回答某事(查询)，但不能同时做这两件事。



##  每个人都喜欢用不同的方式写JavaScript，该怎么办呢?

由于JavaScript是一门动态弱类型的编程语言，很容易在编程过程中出现错误。

在开发过程中使用统一的编码规则和格式插件。例如Eslint

规则越严格，在代码审查中指出错误格式的工作量就越少。应该包括一致的命名，缩进大小，空格的位置，甚至分号。

或者可以使用更严格的TypeScript，TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法，因此现有的 JavaScript 代码可与 TypeScript 一起工作无需任何修改，TypeScript 通过类型注解提供编译时的静态类型检查。



## 如何写漂亮的异步代码?

尽可能使用 [Promises](http://www.gonwe.cn/index.php/archives/54/)。

ES6新增了Promises，从Node.js v4开始，Promises就在Node.js中原生可用。您可以使用Promise链式调用，而不是编写嵌套的回调。

```javascript
// 避免使用
asyncFunc1((err, result1) => {
  asyncFunc2(result1, (err, result2) => {
    asyncFunc3(result2, (err, result3) => {
      console.lor(result3)
    })
  })
})

// 推荐方式
asyncFuncPromise1()
  .then(asyncFuncPromise2)
  .then(asyncFuncPromise3)
  .then((result) => console.log(result))
  .catch((err) => console.error(err))
```

大多数软件库都提供传统的回调接口和promise 接口，更推荐使用后者，您甚至可以通过使用[es6-promisify](https://www.npmjs.com/package/es6-promisify).这样的包来包装回调API ，从而将其转换为基于Promise的回调API 。

```javascript
// 避免使用
const fs = require('fs')

function readJSON (filePath, callback) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return callback(err)
    }

    try {
      callback(null, JSON.parse(data))
    } catch (ex) {
      callback(ex)
    }
  })
}

readJSON('./package.json', (err, pkg) => { console.log(err, pkg) })

// 推荐方式
const fs = require('fs')
const promisify = require('es6-promisify')

const readFile = promisify(fs.readFile)
function readJSON (filePath) {
  return readFile(filePath)
    .then((data) => JSON.parse(data))
}

readJSON('./package.json')
  .then((pkg) => console.log(pkg))
  .catch((err) => console.error(err))
```

使用async/await 来简化调用，这里可以查看 [JS基础 - 异步进阶 - async / await](http://www.gonwe.cn/index.php/archives/56/)

## 如何编写性能代码?

先编写整洁的代码，然后使用性能分析来寻找性能瓶颈。

> 译者：Gonwe
>
> 来源：[blog.risingstack.com](https://blog.risingstack.com/javascript-clean-coding-best-practices-node-js-at-scale/#javascriptcleancodingbestpractices)


  [1]: http://www.gonwe.cn/usr/uploads/2022/08/3986825177.jpg