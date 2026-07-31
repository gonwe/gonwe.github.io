---
layout: post
cid: 170
title: 修复TypeScript tsconfig 错误
slug: 170
date: 2023/02/21 14:23:45
updated: 2023/02/21 14:23:45
status: publish
author: Gonwe
categories: 
  - TypeScript
  - 教程·资源
tags: 
  - TypeScript
desctitle: 
mode: default
---


###### 报错内容

```json
Flag 'importsNotUsedAsValues' is deprecated and will stop functioning in TypeScript 5.5. Specify 'ignoreDeprecations: "5.0"' to silence this error.
Use 'verbatimModuleSyntax' instead.ts
```



可以通过在项目中添加以下命令来隐藏此警告：`tsconfig.json`

```json
{
  "compilerOptions": {
    "ignoreDeprecations": "5.0",
    ....
  }
}
```

![typescripts.png][1]


  [1]: http://www.gonwe.cn/usr/uploads/2023/02/597136350.png