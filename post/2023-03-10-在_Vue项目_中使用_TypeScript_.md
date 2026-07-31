---
layout: post
cid: 189
title: 在 Vue项目 中使用 TypeScript 
slug: 189
date: 2023/03/10 00:08:05
updated: 2023/03/10 00:08:05
status: publish
author: Gonwe
categories: 
  - 前端开发
  - TypeScript
  - 教程·资源
tags: 
  - TypeScript
  - Vue
desctitle: 
mode: default
---




在 Vue 中使用 TypeScript 的入门教程
==========================

TypeScript 是 JavaScript 的一个超集，它为开发者提供了更强的类型检查、代码提示以及更好的可维护性。在 Vue 应用程序中使用 TypeScript 可以帮助我们更好地理解和管理代码库。本文将介绍如何在 Vue 项目中使用 TypeScript。
![vuets.png][1]
安装 TypeScript
-------------

首先，确保你已经安装了 Node.js 环境。然后，在终端运行以下命令来全局安装 TypeScript：

```
npm install -g typescript
```

创建 Vue 项目
---------

使用 Vue CLI 可以方便地创建一个默认配置的 Vue 项目，其中包含了一些常用插件和工具。如果你还没有安装 Vue CLI，可以通过以下命令安装：

```
npm install -g @vue/cli
```

使用 Vue CLI 创建 Vue 项目非常简单，只需运行以下命令并根据提示回答即可：

```
vue create my-project
```

配置 TypeScript
-------------

创建完项目之后，我们需要对项目进行一些配置才能够开始使用 TypeScript。打开 `tsconfig.json` 文件，配置如下：

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "sourceMap": true,
    "types": [
      "webpack-env"
    ],
    "allowSyntheticDefaultImports": true
  }
}
```

> "target": "esnext" 表示 TypeScript 编译器会将 TypeScript 代码编译成目标标准为 ESNext （即 ECMAScript 最新的草案）的 JavaScript 代码。这可以保证编译后的代码可以在目前最新的浏览器上运行。
> "module": "esnext" 表示 TypeScript 编译器会使用 ES6 module 语法来生成 JavaScript 模块化代码。
> "strict": true 表示 TypeScript 编译器会启用所有严格的类型检查选项。
> "jsx": "preserve" 表示 TypeScript 编译器会将 JSX 代码转换为 createElement 函数调用形式而不是默认的 React.createElement 函数调用形式。
> "moduleResolution": "node" 表示 TypeScript 编译器会使用 Node.js 的模块解析规则来解析模块导入路径。
> "esModuleInterop": true 表示 TypeScript 编译器会对 CommonJS 模块进行额外处理，以确保能够兼容 ES6 模块的导入导出规范。
> "resolveJsonModule": true 表示 TypeScript 编译器会支持直接导入 JSON 文件。
> "sourceMap": true 表示 TypeScript 编译器会产生 source map 文件，以便在开发阶段中进行调试。
> "types": ["webpack-env"] 表示 TypeScript 编译器会引入指定的类型声明文件，在这个例子中是 webpack-env 的类型声明文件。
> "allowSyntheticDefaultImports": true 表示 TypeScript 编译器会在遇到没有默认导出的模块时自动创建一个默认导出。

这里我们配置了编译器选项 `target` 和 `module`，分别指定编译后的JavaScript版本和模块系统。另外需要注意的是，这里我们启用了 strict 模式，这将会使编译器更加严格地检查类型。

接下来， 我们需要安装 TypeScript 对应的类型声明文件。在终端中执行以下命令：

```
npm install --save-dev @types/node @types/vue
```

这里我们安装了 node.js 和 Vue 的类型声明文件，并将其保存在 devDependencies 中。

现在，我们已经成功配置了 TypeScript 环境，可以开始撰写代码以及使用类型检测了。

使用 TypeScript 编写 Vue 组件
-----------------------

当我们想要在 Vue 中使用 TypeScript 时，可以使用 .vue 文件格式代替传统的 .js 或 .jsx 文件，在 .vue 文件中嵌入组件模板、样式和逻辑代码。

首先，在 `@/components` 目录下创建一个新的组件文件 `HelloWorld.vue` ：

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ num }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
    num: Number
  },
  setup(props) {
    console.log('props:', props);
  }
});
</script>
```

这里我们使用 TypeScript 中的 `defineComponent` 函数，创建一个包含组件选项的对象。我们定义了两个属性： `msg` 和 `num`，分别表示要显示的消息和数字。然后在 `setup` 方法中，我们打印出了 `props` 对象。

最后，让我们在 `App.vue` 组件中引入 `HelloWorld.vue` 并传递消息和数字属性：

```html
<template>
  <div id="app">
    <HelloWorld msg="Hello Vue 3 + TypeScript" :num="42" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  }
});
</script>
```


  [1]: http://www.gonwe.cn/usr/uploads/2023/03/1255382121.png