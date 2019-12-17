## 《Evan Blog》

## 介绍

使用 [VuePress](https://v1.vuepress.vuejs.org/zh/guide/) 构建 SEO 友好的静态博客站。内置 `deploy.sh` 和 [GitHub Action](https://github.com/features/actions) 两种自动部署脚本，一键发布到 GitHub Pages。



## 使用

#### 1、克隆项目后进入

```bash
git clone https://github.com/xugaoyi/evanblog
cd evanblog
```

#### 2、安装依赖并运行开发服务

```bash
npm install # or yarn install
npm run dev # or yarn dev
```

> 使用yarn的可以把以下`npm run`命令替换为`yarn`

#### 3、编辑

编辑或新增 \*.md文件，以及修改 `docs/.vuepress/config.js` 中的 nav 导航栏等信息（具体可查看 [VuePress](https://v1.vuepress.vuejs.org/zh/guide/) 文档），需重新运行·`npm run dev`并刷新浏览器查看更新。

#### 4、部署

本项目包含两种部署方式：

##### 1）、使用deploy.sh脚本部署

第一步，修改`deploy.sh`脚本内的仓库地址为你的仓库，如有自定义域名则一并修改，没有则注释

```bash
# 如果是发布到自定义域名
echo 'evanblogweb.com' > CNAME

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
```

第二步，一键部署命令

```bash
npm run deploy # 运行部署脚本deploy.sh,并发布到仓库的gh-pages分支
```
> windows系统下使用bash命令窗

第三步，设置GitHub Pages为gh-pages分支。



##### 2）、使用GitHub Action自动持续集成

第一步，按照[官方文档](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)，生成一个GitHub 密钥。

第二步，将这个密钥储存到当前仓库的`Settings/Secrets`里面。
> `Settings/Secrets`是储存秘密的环境变量的地方。环境变量的名字可以随便起，这里用的是`ACCESS_TOKEN`。如果你不用这个名字，`.github/workflows/ci.yml`脚本里的变量名也要跟着改。

第三步，提交代码到GitHub仓库master分支。

第四步，设置GitHub Pages为gh-pages分支。



参考 [教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)


> 注意：如果您有自定义域名，需要在`.github/workflows/ci.yml`中修改`evanblogweb.com`为你的域名。
>
> 如没有自定义域名，需要在`.github/workflows/ci.yml`中去掉`cd docs/.vuepress/dist && echo 'evanblogweb.com' > CNAME && cd -`命令



## 自定义域名以及解析 (可选)

#### 1、申请域名

申请域名当然去哪都行。 国内的[阿里云](https://link.zhihu.com/?target=https%3A//wanwang.aliyun.com/domain/)，腾讯云，国外的[freenom](https://link.zhihu.com/?target=http%3A//www.freenom.com/)，namecheap什么的 。 操作大同小异，都是

* 注册账号，登录

* 搜索并找到可用的域名，买下来。比如我在阿里云买的一个域名：`evanblogweb.com`

#### 2、DNS解析

想要在浏览器里面输入`evanblogweb.com`就能跳到博客页面。我们首先需要做的就是将`evanblogweb.com` 与固定的ip地址绑定起来(A)，或者是与某已有域名绑定起来（CNAME）。

这里以阿里云操作为例，步骤如下：

* 域名列表中点击`解析`

![dns1](https://raw.githubusercontent.com/xugaoyi/image_store/master/blogdns1.png)

* 进入解析页面后，点击`添加记录`。填入，记录类型：`CNAME`，主机记录：`www`，解析线路：默认，记录值：你的github pages地址`<userName>.github.io`，TTL：默认的10分钟，确定。

![dns2](https://raw.githubusercontent.com/xugaoyi/image_store/master/blogdns2.png)

#### 3、使github pages与域名关联

deploy.sh添加如下脚本

```bash
echo 'evanblogweb.com' > CNAME # // 域名替换成你的
```

在自动部署配置文件ci.yml的jobs.build.steps.<Build and Deploy\>.env.BUILD_SCRIPT中添加脚本

```sh
"cd docs/.vuepress/dist && echo 'evanblogweb.com' > CNAME" && cd -
# 域名替换成你的
```




## 提示

#### md文件的yaml代码

必须放在 md 文件在最上方才能生效


#### 百度自动推送和统计

加入了自动推送和统计插件

```js
'vuepress-plugin-baidu-autopush', // 百度自动推送，作用：加快将页面推送给百度搜索，https://ziyuan.baidu.com/

[
    'vuepress-plugin-baidu-tongji', // 百度统计，https://tongji.baidu.com
    {
        hm: '8a59017a97d9fc47d607481723b7815d'
    }
]
```

> 如果你也需要百度统计功能，请把hm参数该为你自己的，请到https://tongji.baidu.com获取你自己的hm参数