---
layout: post
cid: 18
title: vscode使用editorconfig插件以及常用.editorconfig配置文件
slug: 18
date: 2022/05/09 20:42:51
updated: 2022/05/09 20:42:51
status: publish
author: Gonwe
categories: 
  - 前端开发
tags: 
---


**简介**
EditorConfig和Prettier一样，都是用来配置格式化你的代码的，这个格式化代码，要和你lint配置相符！否则会出现你格式化代码以后，却不能通过你的代码校验工具的检验

EditorConfig 文件中的设置用于在基本代码库中维持一致的编码风格和设置，例如缩进样式、选项卡宽度、行尾字符以及编码等，而无需考虑使用的编辑器vscode使用editorconfig插件以及.editorconfig配置文件说明详解
或 IDE

editorConfig不是什么软件，而是一个名称为.editorconfig的自定义文件。该文件用来定义项目的编码规范，编辑器的行为会与.editorconfig 文件中定义的一致，并且其优先级比编辑器自身的设置要高，这在多人合作开发项目时十分有用而且必要

有些编辑器默认支持editorConfig，如webstorm；而有些编辑器则需要安装editorConfig插件，如ATOM、Sublime、VS Code等

当打开一个文件时，EditorConfig插件会在打开文件的目录和其每一级父目录查找.editorconfig文件，直到有一个配置文件root=true

EditorConfig的配置文件是从上往下读取的并且最近的EditorConfig配置文件会被最先读取. 匹配EditorConfig配置文件中的配置项会按照读取顺序被应用, 所以最近的配置文件中的配置项拥有优先权

如果.editorconfig文件没有进行某些配置，则使用编辑器默认的设置

**配置.editorconfig**
在当前项目根目录下添加.editorconfig文件

```bash
root = true

[*]
charset = utf-8
indent_style = tab
indent_size = 4
insert_final_newline = true
trim_trailing_whitespace = true
end_of_line = lf

[*.{yml,yaml}]
indent_size = 2
indent_style = space

[*.md]
max_line_length = off
trim_trailing_whitespace = false

```

**安装 EditorConfig扩展**
在vscode里面安装EditorConfig


EditorConfig扩展的作用是读取第一步创建的editorconfig文件中定义的规则，并覆盖user/workspace settings中的对应配置（从这我们也可以看出vscode本身其实是并不直接支持editorconfig的）

全局安装或局部安装

editorconfig依赖包(npm install -g editorconfig | npm install -D editorconfig)
安装editorconfig依赖包主要是因为EditorConfig依赖于editorconfig包，不安装的可能会导致EditorConfig无法正常解析我们在第一步定义的editorconfig文件