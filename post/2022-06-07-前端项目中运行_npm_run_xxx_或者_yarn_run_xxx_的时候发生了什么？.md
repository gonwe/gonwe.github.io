---
layout: post
cid: 35
title: 前端项目中运行 npm run xxx 或者 yarn run xxx 的时候发生了什么？
slug: 35
date: 2022/06/07 12:06:01
updated: 2022/06/07 12:06:01
status: publish
author: Gonwe
categories: 
tags: 
---


**NPM，Node Package Manager的缩写，也就是“节点的包管理器”。**

顾名思义，npm是一个软件包管理器，主要进行Javascript的包管理。通过npm，我们可以很方便地进行Javascript包的下载、升级，我们也可以把我们开发的JavaScript包共享给其他使用者。

**Yarn是Facebook最近发布的一款依赖包安装工具。**

*Yarn*是一个新的快速安全可信赖的可以替代NPM的依赖管理工具

当我们执行`npm run xxx` or `yarn run xxx`的时候。首先会先从`package.json`中找到执行的命令。如下所示：

```json
{
	"name": "restful-server",
	"version": "1.0.0",
	"description": "服务器后端程序",
	"main": "index.js",
	"scripts": {
		"dev": "webpack --config webpack.config.js",
		"publish": "node ./tools/publish.js restful-server",
	},
}
```



执行`npm run serve`指令，其实相当于执行`webpack --config webpack.config.js` , 但是我们没有全局安装`webpack`，在操作系统中不存在该指令，直接执行会报错

```powershell
Administrator@DESKTOP-8FESITO$: webpack --config webpack.config.js
webpack : 无法将“webpack”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。
所在位置 行:1 字符: 1
+ webpack --config webpack.config.js
+ ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (webpack:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
 
```



当我们在安装依赖的时候，是通过`npm install xxx` or `yarn install`来执行的，例如`npm install webpack` ,npm在安装这个依赖的时候，就会在`node_modules/.bin/`目录中创建好webpack为名的几个可执行文件了。

```powershell
$: dir ./node_modules/.bin
目录: C:\Workspace\restful-server\node_modules\.bin
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----          2022/5/9     20:45            315 webpack // unix 系默认的可执行文件，必须输入完整文件名
-a----          2022/5/9     20:45            315 webpack-cli
-a----          2022/5/9     20:45            192 webpack-cli.cmd
-a----          2022/5/9     20:45            192 webpack.cmd // windows默认可执行文件，不添加后缀名时，自动根据 pathext 查找文件
```



`.bin`目录下的文件一个个软连接，打开`webpack`文件可以看到文件顶部写着`#!/bin/sh`,表示这是一个脚本。

```shell
#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
    *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir/node" ]; then
  "$basedir/node"  "$basedir/../webpack/bin/webpack.js" "$@"
  ret=$?
else 
  node  "$basedir/../webpack/bin/webpack.js" "$@"
  ret=$?
fi
exit $ret
```



> 每当执行`npm run xxx`，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。
>
> 比较特别的是，`npm run xxx `新建的这个 Shell，会将当前目录的`node_modules/.bin`子目录加入`PATH`变量，执行结束后，再将`PATH`变量恢复原样。
>
> 这意味着，在执行 `npm run xxx ` 的时候当前目录的`node_modules/.bin`子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。



由此可见，当使用 `npm run dev` 执行 `webpack --config webpack.config.js`时，虽然没有全局安装 `webpack`，但是npm会将当前目录的`node_modules/.bin`子目录加入`PATH`变量然后直接用脚本名调用，同时相当于执行了	` ./node_modules/.bin/webpack --config webpack.config.js`（最后的 `--config webpack.config.js`作为参数传入）。



1、运行 `npm run xxx` or `yarn run xxx`
2、先在项目文件夹目录的 `node_modules/.bin `查找要执行的程序，找到则运行；没有则从全局的 `node_modules/.bin` 中查找；
3、如果全局目录还是没找到，那么就从 `path` 环境变量中查找有没有其他同名的可执行程序。


> 如果使用 `npm install -g xxx` 来安装依赖包，那么会将其中的 `bin` 文件加入到全局，比如 `create-react-app` 和 `webpack` ，在全局安装后，就可以直接使用如 `create-react-app appName` 这样的命令来创建项目了。


