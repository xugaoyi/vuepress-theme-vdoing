---
title: GitHub Actions 定时运行代码：每天定时百度链接推送
date: 2019-12-30 21:23:00
permalink: /pages/f44d2f9ad04ab8d3
categories: 
  - 技术
  - GitHub技巧
tags: 
  - github
  - 博客
author: 
  name: xugaoyi
  link: https://github.com/xugaoyi
---
#  GitHub Actions 定时运行代码：每天定时百度链接推送

博客上线已经有些日子了，却发现百度迟迟没有收录我的博客页面，在百度推送工具当中除了有自动推送的代码嵌入网站之外，还有一个实时的主动推送更高效。

最近刚好了解到GitHub Actions的定时运行代码功能，可以用它来每天自动运行命令生成所有博客链接并进行一次性推送给百度。

GitHub Actions 是一个 CI/CD（持续集成/持续部署）工具，但也可用作代码运行环境。**功能非常强大，能够玩出许多花样。**

<!-- more -->

## 百度主动链接推送

链接主动推送在百度站长中有介绍，如图。

![主动提交](https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200103124306.png)

具体使用方法就是创建一个文件`urls.txt`，文件内每行一条链接的格式写入提交的多个链接，如图。

![urls.txt](https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200103124305.png)

运行命令

```sh
curl -H 'Content-Type:text/plain' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=xugaoyi.com&token=T5PEAzhG*****"
```

上面命令的地址和参数由百度站长提供。运行完命令会返回推送结果，不出意外的话就会把`urls.txt`内的所有链接一次性推送给百度。

这个方法虽然比嵌入网站头部的自动推送更高效，但是也有它的麻烦之处，就是得自己填入链接到`urls.txt`文件，然后手动运行命令。



## 自动生成urls.txt

没关系，技术的本质就是让人"偷懒"的。于是，我写了一个nodejs工具，用于把所有的博客页面链接生成到`urls.txt`

```js
// baiduPush.js

/**
 * 生成百度链接推送文件
 */
const fs = require('fs');
const path = require('path');
const logger = require('tracer').colorConsole();
const matter = require('gray-matter'); // FrontMatter解析器 https://github.com/jonschlinkert/gray-matter
const readFileList = require('./modules/readFileList');
const urlsRoot = path.join(__dirname, '..', 'urls.txt'); // 百度链接推送文件
const DOMAIN = process.argv.splice(2)[0]; // 获取命令行传入的参数

if (!DOMAIN) {
  logger.error('请在运行此文件时指定一个你要进行百度推送的域名参数，例：node utils/baiduPush.js https://xugaoyi.com')
  return
}

main();
function main() {
  fs.writeFileSync(urlsRoot, DOMAIN)
  const files = readFileList(); // 读取所有md文件数据

  files.forEach( file => {
    const { data } = matter(fs.readFileSync(file.filePath, 'utf8')); 

    if (data.permalink) {
      const link = `\r\n${DOMAIN}${data.permalink}/`;
      console.log(link)
      fs.appendFileSync(urlsRoot, link);
    }
  })
}
```

上面代码仅是针对我个人的博客生成链接到`urls.txt`文件。更多代码在 [这里](https://github.com/xugaoyi/vuepress-theme-vdoing/blob/master/utils/baiduPush.js)。

运行如下命令就可以生产一个包含博客所有链接的`urls.txt`文件：
```sh
node utils/baiduPush.js https://xugaoyi.com
```
哈哈，第一个麻烦解决了:smirk:，接下来是解决第二个需要手动运行推送命令的问题。

> **如果你没办法自动生成，你也可以自己手动创建一个`urls.txt`文件，放到github仓库。**



## GitHub Actions 定时运行代码

今天的主角GitHub Actions 要登场了。（相关：[GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html?20191227113947#comment-last)、[GitHub Actions 实现自动部署静态博客](https://xugaoyi.com/pages/6b9d359ec5aa5019/)）

GitHub Actions 是一个 CI/CD（持续集成/持续部署）工具，但也可用作代码运行环境。**功能非常强大，能够玩出许多花样。**

### 配置 GitHub Actions

触发 GitHub Actions 需要在项目仓库新建一个`.github/workflows`子目录，里面是 [YAML 格式](https://xugaoyi.com/pages/4e8444e2d534d14f/)配置文件，文件名可以随便取。GitHub 只要发现配置文件，就会运行 Actions。

配置文件的第一部分是触发条件。

```sh
## baiduPush.yml
name: 'baiduPush'
 
on:
  push:
  schedule:
    - cron: '0 23 * * *'
```

上面代码中，`name`字段是配置文件的描述，`on`字段是触发条件。我们指定两种情况下触发，第一种是代码 Push 进仓库，第二种是[定时任务](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows#scheduled-events-schedule)，每天在国际标准时间23点（北京时间+8，即早上7点）运行。

> 定时设置看[这里](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows#scheduled-events-schedule)

接着，就是运行流程。

```sh
jobs:
  bot:
    runs-on: ubuntu-latest # 运行环境为最新版的Ubuntu
    steps:
      - name: 'Checkout codes' # 步骤一，获取仓库代码
        uses: actions/checkout@v1
      - name: 'Run baiduPush.sh' # 步骤二，执行sh命令文件
        run: npm install && npm run baiduPush # 运行命令。（注意，运行目录是仓库根目录）
```

上面代码中，指定运行环境是最新的ubuntu，流程的第一步是从代码仓库获取代码，第二步运行两个命令，先安装项目依赖，再运行写在`package.json`的`baiduPush`命令。完整代码看 [这里](https://github.com/xugaoyi/vuepress-theme-vdoing/blob/master/.github/workflows/baiduPush.yml)



### `baiduPush`命令在`package.json`配置

```js
// package.json
"scripts": {
	"baiduPush": "node utils/baiduPush.js https://xugaoyi.com && bash baiduPush.sh"
}
```

上面脚本中在`node utils/baiduPush.js`的后面加入你的域名参数。运行此命令生成`urls.txt`文件，然后执行`baiduPush.sh`文件。

注意，在使用window系统时，请使用git bash命令窗运行上面的脚本。

> `baiduPush`命令之所以没有放在`baiduPush.yml`的 run 里面是因为我想在本地也可以执行`npm run baiduPush`命令。



### `baiduPush.sh`执行百度推送命令

`baiduPush.sh`文件：

```sh
#!/usr/bin/env sh

set -e

# 百度链接推送
curl -H 'Content-Type:text/plain' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=https://xugaoyi.com&token=T5PEAzhGa*****"

rm -rf urls.txt # 灭迹
```

上面代码中，把`urls.txt`文件中的所有链接一次性推送。

> baiduPush.sh内的命令之所以没有写在`package.json`是因为我觉得命令太长了，不方便阅读。



写好配置，推送到仓库，就会在每天的早上7点钟，自动运行命令生成一个包含博客所有页面链接的`urls.txt`文件，并把所有链接一次性推送到百度。麻麻再也不用担心我的网站不被收录~~:kissing_heart: :kissing_heart: :kissing_heart: 

在这个基础上可以扩展，使用GitHub Actions满足你自己的各种定时需求。



## 相关文章

[《 GitHub Actions 实现自动部署静态博客》](https://xugaoyi.com/pages/6b9d359ec5aa5019/)

[《解决百度无法收录搭建在GitHub上的静态博客的问题》](https://xugaoyi.com/pages/41f87d890d0a02af/)



