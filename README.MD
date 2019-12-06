## 《Evan Blog》

## 介绍

使用 VuePress 创建 SEO 友好的静态博客站。一键发布到 GitHub Pages，内置 GitHub Action 自动部署脚本。

**您不需要在本地进行打包，只需要把代码push到GitHub，Action将自动为您打包和部署。**



VuePress 是一款使用 Vue 驱动的静态网站生成器，通过一定的配置之后，为每一个 md 文件生成静态 html，并通过主题挂接起来。用来写文档是非常不错的，写博客就要做一点工作。

## 相关技术

[VuePress](https://v1.vuepress.vuejs.org/zh/guide/)

[Github Aciton](https://github.com/features/actions)

## 使用

1. ##### 克隆项目后进入

```bash
git clone https://github.com/xugaoyi/evanblog
cd evanblog
```

2. ##### 安装依赖并运行开发服务

>  使用yarn的可以把以下`npm run`命令替换为`yarn`

```bash
npm install # or yarn install
npm run dev
```

3. ##### 编辑

编辑或新增\*.md，以及修改 docs/.vuepress/config.js 中的 nav 导航栏等信息。具体可查看上面的 vuepress 文档，重新运行`npm run dev`并 ctrl+f5 刷新浏览器查看更改。

4. ##### 打包和部署

   * **手动打包和部署**

    ```bash
     npm run list # 将文章栏目下三个文件夹中的文件加入侧边栏（文章索引）
     npm run built # 打包
     # 把打包好的代码提交到github仓库，并设置github pages
 ```
   
* **或利用GitHub Action自动持续集成（推荐）**
   
     第一步，这个项目需要将构建成果发到 GitHub 仓库，因此需要 GitHub 密钥。按照[官方文档](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)，生成一个密钥。
   
     第二步，将这个密钥储存到当前仓库的`Settings/Secrets`里面。
   
     `Settings/Secrets`是储存秘密的环境变量的地方。环境变量的名字可以随便起，这里用的是`ACCESS_TOKEN`。如果你不用这个名字，后面脚本里的变量名也要跟着改。
   
     第三步，设置GitHub Pages为gh-pages分支。
   
     
   
     因为本项目已经内置 GitHub Action 自动部署脚本，您只需要 push 代码到github，
   
     ，CI 脚本将自动为您打包和部署。
   
     参考 [教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
   
     
   
     > 注意：您需要在package.json中修改`/evanblog/`为自己的项目名。
     >
     > 如果您有自定义域名，一并修改`www.evanblogweb.com`为你的域名。



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

![](https://raw.githubusercontent.com/xugaoyi/image_store/master/blogdns2.png)

#### 3、使github pages与域名关联

在pageage.json文件scripts中添加如下脚本

```js
"chame:gitpage": "cd docs/.vuepress/dist && echo 'www.evanblogweb.com' > CNAME"
// 域名替换成你的
```

在自动部署配置文件ci.yml中jobs.build.steps.<Build and Deploy\>.env.BUILD_SCRIPT添加脚本

```sh
npm run chame:gitpage
```






## 提示

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
