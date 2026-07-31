---
layout: post
cid: 198
title: export default function foo() 和 const foo =  () =&gt; {} 的区别
slug: 198
date: 2023/05/10 15:37:53
updated: 2023/05/10 15:37:53
status: publish
author: Gonwe
categories: 
  - 前端开发
tags: 
  - Javascript
  - Javascript笔记
  - 面向对象
  - ES6
abstract: 
description: 
keywords: 
mode: default
thumb: 
video: 
---






`export default function foo()` 和 `const foo =  () => {}` 都是用于定义 JavaScript 中的函数的语法，但它们之间有几个区别。

##### 1. 函数声明和函数表达式

`export default function foo()` 使用了函数声明的方式来定义函数。函数声明的形式比较直观，并且具有提升性：即在函数声明之前就可以使用该函数。例如：

```js
foo(); // 正常运行，输出 "This is foo."

function foo() {
  console.log('This is foo.');
}
```

而 `const foo =  () => {}` 所采用的则是函数表达式的形式。函数表达式需要赋值给一个变量，因此也被称为“匿名函数”。函数表达式相对于函数声明来说，更灵活，可以根据需要将其作为变量传递给其他函数、存储在数据结构中等。另外，在 JavaScript 模块中，函数表达式的使用更为广泛。同样的例子，使用函数表达式如下所示：

```js
// 报错：Uncaught ReferenceError: Cannot access 'bar' before initialization
bar();

const bar = function() {
  console.log('This is bar.');
}
```

##### 2. 导出方式

`export default function foo()` 相对于 `const foo =  () => {}` 来说，多了一步将函数导出的步骤。使用 `export default` 关键字导出的函数，包含了模块默认的输出。这意味着，在导入模块时，可以通过 `import` 语句来获取默认的输出。例如：

```js
// 导出 foo() 函数
export default function foo() {
  console.log('This is foo.');
}

// 导入 foo() 函数
import foo from './foo.js';

foo(); // 输出 "This is foo."
```

相对于这种默认导出方式，`const foo =  () => {}` 则需要显式地将变量 `App` 导出才能在其他模块中使用。例如：

```js
// 导出 foo变量
export const foo =  () => {
  console.log('This is App.');
};

// 导入 foo变量
import { foo} from './app.js';

App(); // 输出 "This is App."
```

##### 3.总结

由此可见，`export default function foo()` 和 `const foo =  () => {}` 的主要区别在于函数定义和导出的方式上。选择哪种方式取决于具体的需求和项目的实际情况。