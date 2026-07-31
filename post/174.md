---
layout: post
cid: 174
title: 修复TypeScript tsconfig 错误 Cannot find module 'xx.xx' or its corresponding type declarations.
slug: 174
date: 2023/02/21 14:28:00
updated: 2023/02/21 14:28:00
status: publish
author: Gonwe
categories: 
  - 前端开发
  - TypeScript
  - 教程·资源
  - Web框架
tags: 
  - TypeScript
  - Vite
desctitle: 
mode: default
---


##### 问题原因

```json
使用了 Vite 添加了别名 ，但是TS没有对应的路径，tsconfig.json和vite.config.ts需要相互设置好
```

#####  解决方法

**vite.config.ts**

```json
{
    resolve: {
      alias: { 
        "@": path.join(__dirname, "./src"), // 这里定义了别名 @ 相当于 ./src
      },
    },
}
```

**tsconfig.json**

```json
{
	"extends": "@tsconfig/svelte/tsconfig.json",
	"compilerOptions": {
		"target": "ESNext",
		"useDefineForClassFields": true,
		"module": "ESNext",
		"resolveJsonModule": true,
		/**
		 * Typecheck JS in `.svelte` and `.js` files by default.
		 * Disable checkJs if you'd like to use dynamic types in JS.
		 * Note that setting allowJs false does not prevent the use
		 * of JS in `.svelte` files.
		 */
		"allowJs": true,
		"checkJs": true,
		"isolatedModules": true,
		"outDir": "./dist",
		"ignoreDeprecations": "5.0",
		"paths": {
			"@/*": ["./src/*"] // 这里要和Vite的别名对应
		},
	},
	"include": ["src/**/*.d.ts", "src/**/*.ts", "src/**/*.js", "src/**/*.svelte"],
	"exclude": [
		"node_modules",
		"dist"
	],
	"references": [{
		"path": "./tsconfig.node.json"
	}]
}

```
![vite-ts.jpeg][1]


  [1]: http://www.gonwe.cn/usr/uploads/2023/02/3125944132.jpeg