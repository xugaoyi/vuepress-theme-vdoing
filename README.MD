Evan Blog

## 介绍

使用 vuepress 创建 SEO 友好的静态博客站。一键发布到 github page，内置 github action 自动部署脚本。

vuepress 通过一定*号称简单*的配置之后，为每一个 md 文件生成静态 html 脚本，并通过主题挂接起来。
用来写文档是非常不错的。写博客就要做一点工作，踩**一点**坑。

## 相关技术

[vuepress](https://v1.vuepress.vuejs.org/zh/guide/)

Github Aciton

## 使用

1. 克隆项目后进入

`git clone https://github.com/xugaoyi/evanblog`

`cd evanblog`

2. 安装依赖并运行开发服务：

`yarn install` 或者 `npm i`

（没有安装 yarn 的，把以下命令中的 yarn 替换为 npm run:

```
yarn dev
```

3. 编辑

编辑或新增\*.md，以及修改 docs/.vuepress/config.js 中的 nav 导航栏等信息。具体可查看上面的 vuepress 文档，重新运行`yarn dev`并 ctrl+f5 刷新浏览器查看设置更改。

4. 打包

```
yarn list
yarn built
```

第一个命令将文章栏目下三个文件夹中的文件加入侧边栏（文章索引），
第二个打包为部署在根路径下的 index.html 文件和其他所有静态页面资源。

5. 或者利用自动持续集成发布到 github page

这里需要：开启项目 action，开启 page，设置 secret，修改脚本中的/evanblog/为自己的项目名。然后 git push 就好，CI 脚本自动发布。



## 自定义域名以及解析

#### 1、申请域名

申请域名当然去哪都行。 国内的[阿里云](https://link.zhihu.com/?target=https%3A//wanwang.aliyun.com/domain/)，腾讯云，国外的[freenom](https://link.zhihu.com/?target=http%3A//www.freenom.com/)，namecheap什么的 。 操作大同小异，都是

* 注册账号，登录

* 搜索并找到可用的域名，买下来。比如我在阿里云买的一个域名：`evanblogweb.com`

#### 2、DNS解析

想要在浏览器里面输入`evanblogweb.com`就能跳到博客页面。我们首先需要做的就是将`evanblogweb.com` 与固定的ip地址绑定起来(A)，或者是与某已有域名绑定起来（CNAME）。

这里以阿里云操作为例，步骤如下：

* 域名列表中点击`解析`



* 进入解析页面后，点击`添加记录`。填入，记录类型：`CNAME`，主机记录：`www`，解析线路：默认，记录值：你的github pages地址`<userName>.github.io`，TTL：默认的10分钟，确定。



#### 3、使github pages与域名关联

进入github pages设置，在`Custom domain`中填入域名`evanblogweb.com`，Save保存。这时你会在gh-pages分支中看到新增了一个`CNAME`文件，内容为刚刚填入的域名。到这，你就可以通过域名愉快的访问博客啦



#### 4、提交代码会自动删除`CNAME`文件的问题（有问题待修改）

```bash
echo 'www.evanblogweb.com' > CNAME # 新建CNAME文件,并输入内容为域名

# 一顿git操作提交到博客仓库的deployment分支
git init
git add -A
git commit -m 'create CNAME'
git push -f git@github.com:<USERNAME>/<REPONAME>.git master:deployment

```





## 小提示

#### 注意 yaml

必须放在 md 文件在最上方才能生效

#### 无法热更新

修改 config.js 后，是没办法热更新的，只能 ctrl+c 结束任务然后重新 yarn dev

#### 想要自动发现新 md 文件并加入侧边栏索引列表？

BLOG 的最基本功能，需要加一点 node 的脚本来更新 sidebar:[]的配置。
放在了 utils/getFilenames.js 了。
脚本运行时会查找/article_child/等 3 个文件夹下的所有目录和文件，将名称列表置入.vuepress/config/sidebar.json。
之后重新 yarn list，列表更新

#### 百度统计代码

加入了
"vuepress-plugin-baidu-autopush"
"vuepress-plugin-baidu-tongji"
两个包，统计功能虽然正常，但是首页检测代码失败。所以增加了一个 utils/db_hm.js 脚本，在 build 之后手动复制统计代码到首页。

#### 如何打包为部署到非根目录下

```
build:gitpage
push:gitpage
```

使用这两条命令，编译为 github page 或其他部署到非根目录下的 html。

要 **修改** package.json 中 build:gitpage 命令里的： VUEPRESS_BASE=/evanblog/为自己要部署的子目录名，
其中 github page 即为项目名，发布方式为分支名 gh-pages 方式推送。
