---
layout: post
cid: 159
title: Vue2下Element UI 实现文件上传功能
slug: 159
date: 2023/01/11 11:07:00
updated: 2023/01/12 14:33:07
status: publish
author: Gonwe
categories: 
  - 前端开发
  - 教程·资源
tags: 
  - Javascript
  - Javascript笔记
  - Vue
  - Element UI
desctitle: 
mode: default
---


本文主要记录下代码，方便下次复制粘贴
![ElementUI.jpeg][1]
**前端部分**

**HTML**

- **limit：** 限制文件个数 1 个
- **on-remove：** 移除附件时的钩子函数，主要就 console 输出下
- **on-error：** 用于处理上传异常后的处理，本人这主要用来关闭弹窗和全屏等待
- **file-list：** 绑定附件
- **auto-upload：** 禁止自动上传，true 的话选了文件就自动上传
- **http-request：** 自定义上传文件请求方法
- **action：** 原上传文件的路径，由于使用了自定义上传文件请求，即 http-request，因此这个字段随便写就好，不写不行好像

```vue
<el-upload
 ref="upload"
 :limit="1"
 :on-remove="handleRemove"
 :on-error="onError"
 :file-list="fileList"
 :auto-upload="false"
 :http-request="uploadFile"
 action="https://jsonplaceholder.typicode.com/posts/"
 class="upload-demo">
 <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
 <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
 <div slot="tip" class="el-upload__tip">支持上传 {{ strRebuild(fileType) }} 格式，且不超过 {{ fileSize }}M</div>
</el-upload>
```

**JS**

```javascript
import { strRebuild, lastSubstring } from '@/utils/strUtil';
import { message } from '@/utils/message';
export default {
    data() {
        return {
            // 附件列表
            fileList: [],
            // 允许的文件类型
            fileType: ['xls', 'xlsx', 'pdf', 'doc', 'docx', 'txt', 'jpg', 'png', 'jpeg'],
            // 运行上传文件大小，单位 M
            fileSize: 10,
        };
    },
    methods: {
        // 清空表单
        clear() {
            // 清空附件
            this.$refs.upload.clearFiles();
        },

        // 附件检查
        // 检查附件是否属于可上传类型
        // 检查附件是否超过限制大小
        checkFile() {
            var flag = true;
            var tip = '';
            var files = this.$refs.upload.uploadFiles;
            files.forEach(item => {
                // 文件过大
                if (item.size > this.fileSize * 1024 * 1024) {
                    flag = false;
                    tip = ' 文件超过' + this.fileSize + 'M';
                }
                // 文件类型不属于可上传的类型
                if (!this.fileType.includes(lastSubstring(item.name, '.'))) {
                    flag = false;
                    tip = ' 文件类型不可上传';
                }
            });
            if (!flag) {
                message('error', tip);
            }
            return flag;
        },

        // 提交附件
        submitUpload() {
            if (this.checkFile()) {
                console.log('上传附件...');
                this.$refs.upload.submit();
            } else {
                console.log('取消上传');
            }
        },
        // 自定义文件上传方法
        uploadFile(file) {
            // 把文件放入 FormData 进行提交
            const param = new FormData();
            param.append('files', file.file);
            uploadFile(param).then(response => {
                // TODO 一些关闭弹框，上传成功提示等
            });
        },
        // 移除附件
        handleRemove(file, fileList) {
            console.log('移除附件...');
        },
        // 附件上传失败，打印下失败原因
        onError(err) {
            message('error', '附件上传失败');
            console.log(err);
        },
        // 字符串重组
        strRebuild(str) {
            return strRebuild(str);
        }
    }
};
```

**工具类 JS**

`strUtil.js`

```javascript
// 字符串相关工具类
// 数组根据分隔符重组为字符串
export function strRebuild(arr, split) {
    if (arr === undefined || arr === null || !(arr instanceof Array) || arr.length === 0) {
        return '';
    }
    if (split === undefined || split === null) {
        split = '，';
    }
    var str = '';
    arr.forEach((v, i) => {
        if (i === arr.length - 1) {
            str = str + v;
        } else {
            str = str + v + split;
        }
    });
    return str;
}
// 截取最后一个特定字符后面的字符串
export function lastSubstring(str, split) {
    if (str === undefined || str === null || split === undefined || split === null) {
        return '';
    }
    return str.substring(str.lastIndexOf(split) + 1);
}
```

`message.js`

```javascript
import { Message } from 'element-ui';
// 提示封装 type 提示类型， msg 提示信息，duration 持续时间
export function message(type, msg, duration) {
    Message({
        message: msg || 'success',
        type: type || 'success',
        duration: duration || 5 * 1000
    });
}
// 带删除键提示，duration 为 0 时，不会自动消失
// 提示封装 type 提示类型， msg 提示信息，duration 持续时间
export function messageShowClose(type, msg, duration) {
    Message({
        message: msg || 'success',
        type: type || 'success',
        duration: duration || 0,
        showClose: true
    });
}
```

**API**

```javascript
// 附件上传
export function uploadFile(file) {
    return request({
        url: '/uploadFile',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data; charset=utf-8'
        },
        data: file
    });
}
```

以上就是本文的全部内容，希望对大家的学习有所帮助


  [1]: http://www.gonwe.cn/usr/uploads/2023/01/1871578179.jpeg