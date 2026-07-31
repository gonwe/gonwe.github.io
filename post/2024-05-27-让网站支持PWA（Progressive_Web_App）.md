---
layout: post
cid: 224
title: 让网站支持PWA（Progressive Web App）
slug: 224
date: 2024/05/27 12:29:00
updated: 2024/05/27 12:30:20
status: publish
author: Gonwe
categories: 
  - 前端开发
  - 教程·资源
tags: 
  - 前端开发
  - PWA
  - IOS
description: 
keyword: 
thumbnail: 
---



**PWA（Progressive Web App）**是一种渐进式网页应用，它通过使用各种技术来增强Web应用的功能，使得网站的体验更加接近原生应用。PWA的主要特点包括可靠、快速、具有沉浸式的用户体验等。在移动端，PWA使用标准化框架，使得Web应用具有与原生应用类似的体验。PWA的本质仍然是一个Web应用，它不包含原生操作系统相关的代码，但在缓存、通知、后台功能等方面表现更好。

#### 1.优化index.html

我们需要使我们的应用程序与所有屏幕尺寸兼容，以及其他的配置。

```html
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
     <!-- 设置Web应用是否以全屏模式运行。 -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover" />
    <title>静水Blogs</title>
    <link rel="manifest" href="manifest.json">
     <!-- 用于在iOS设备上显示 -->
    <link rel="apple-touch-icon" sizes="180x180" href="app/icons/apple-icon-180.png">
    <link rel="shortcut icon" href="app/icons/favicon.ico">
</head>
```

> **apple-mobile-web-app-status-bar-style 配置**
>
> - 除非你先使用apple-mobile-web-app-capable指定全屏模式，否则这个meta标签不会起任何作用。
> - content：default，则状态栏正常显示，默认值。
> - content：blank，则状态栏会有一个黑色的背景。
> - content：blank-translucent，则状态栏显示为黑色半透明。
> - content：default-blank，则页面显示在状态栏的下方，即状态栏占据上方部分，页面占据下方部分，二者没有遮挡对方或被遮挡。
> - content：blank-translucent，则页面会充满屏幕，其中页面顶部会被状态栏遮盖住 

#### 2.创建清单文件

在项目根目录下创建一个manifest文件（例如：`manifest.json`），并在其中定义应用的基本信息和配置。例如：

```json
{
    "name": "静水Blogs"
    "short_name": "静水Blogs"
    "start_url": "/index.html",
    "display": "standalone",
    "background_color": "#0e9c95",
    "theme_color": "#16a0d6e7",
    "orientation": "portrait",
    "icons": []
}

```

**配置解析**

- **name**：应用程序的显示名称。
- **short_name**：安装时将在应用程序图标下显示的名称。
- **start_url**：浏览器应用程序的根 URL，如果首页是https://www.abc.com/,则直接用“/”即可。
- **display**： PWA的显示模式，standalone或fullscreen。
- **background_color：** 安装时应用程序的背景颜色。
- **theme_color：** 状态栏的颜色。HTML 里设置 theme-color 的 meta 标签会覆盖该值
- **orientation：** 这定义了在应用显示期间使用的方向。
- **icons：** 这定义了不同大小的图标或图像用作我们的应用程序主页图标。

#### 3. 生成主屏幕图标

手动创建主屏幕图标是一项非常复杂的任务，这里使用[pwa-asset-generator](https://github.com/elegantapp/pwa-asset-generator)的第三方模块，使用以下命令根据logo图标`logo.png`生成不同大小的图标：

```powershell
#生成 icons 默认路径是app/icons
#npx pwa-asset-generator 原图片文件 目标目录
npx pwa-asset-generator logo.png app/icons
```

上面的命令将在 app 文件夹中创建一个`icons`文件夹，其中包含我们应用程序的许多图标，以及终端上的一些JSON，我们将粘贴到清单中的图标数组中。然后更新manifest文件的icons数组：

```json
//manifest.json
...
"icons": [
    {
        "src": "app/icons/manifest-icon-192.maskable.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any"
    },
    {
        "src": "app/icons/manifest-icon-192.maskable.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "maskable"
    },
    {
        "src": "app/icons/manifest-icon-512.maskable.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "any"
    },
    {
        "src": "app/icons/manifest-icon-512.maskable.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable"
    }
]
...
```

 **在HTML文件中引用manifest文件，例如在`<head>`标签内添加以下代码：**

```html
...
<link rel="manifest" href="/manifest.json">
...
```

#### 4. 创建 Service Worker

创建一个Service Worker文件（例如：sw.js），并在其中定义离线缓存策略。例如：（例如：sw.js），并在其中定义离线缓存策略。例如：

```javascript
const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  'app/icons/manifest-icon-512.maskable.png',
  // ...其他需要缓存的资源
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
```

**在HTML文件中注册Service Worker**，例如在`<head>`标签内添加以下代码：

```html
...
<script>
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => console.log('Service Worker Registered'))
      .catch(error => console.log('Service Worker Registration Failed:', error));
  }
</script>
...
```

完成以上步骤后，你的网站就已经基本支持PWA了。用户可以将网站添加到设备的主屏幕，实现类似原生应用的体验。同时，通过Service Worker实现的离线缓存策略，可以在网络不稳定或不可用的情况下提供基本的功能和内容。

#### 5. 总结一下PWA的实现步骤

1. **编写manifest.json**：这个文件是PWA的核心配置文件，包含了应用的基本信息和设置。例如，应用的名称、图标、启动页面、主题颜色等。
2. **编写serviceWorker.js**：这是PWA的服务工作者文件，负责处理离线缓存、推送通知等关键功能。
3. **在index.html中引入manifest.json和sw.js**：确保这两个文件被正确地引入到网站的首页中，以便浏览器能够识别和应用它们。
4. **将这三个文件放在网站根目录（或同一目录下）**：这样，无论用户在网站的哪个页面，都能访问到这些文件。
5. **网站需要部署在https环境才能触发**：由于涉及到网络请求和Service Worker 的注册，因此网站必须通过HTTPS协议进行部署，以确保数据的安全传输。

此外，为了提供更好的用户体验，可以考虑使用一些高级功能，如Background Sync、Push Notifications等。

#### 6. 手机浏览器上生成PWA桌面图标

在手机上想要将Web页面转换为类似于本地应用程序的体验，可以按照以下步骤操作：

1. 打开支持PWA的浏览器（如Chrome、Firefox、Safari等）。
2. 访问您的网站。
3. 点击浏览器右上角的菜单按钮（通常是三个垂直点或三条横线）。
4. 在弹出的菜单中选择“更多工具”或“分享”选项。
5. 在下拉菜单中找到并点击“添加到主屏幕”或类似的选项。
6. 根据提示，为应用程序选择一个自定义名称，然后点击“添加”按钮。

网站应该已经成功添加到手机的桌面上，当用户点击该图标时，Web页面将以全屏模式打开，无需浏览器的导航栏和工具栏，提供类似于本地应用程序的体验。