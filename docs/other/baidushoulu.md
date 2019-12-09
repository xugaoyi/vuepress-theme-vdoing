# 解决百度爬虫无法爬取搭建在GitHub上的个人博客的问题



## 背景

由于GitHub禁止百度爬虫访问，造成托管在GitHub Pages上的博客无法被百度收录。相关问题可以通过百度站长平台的抓取诊断再现，每次都是403 Forbidden的错误…

## 解决方案

将博客同时同步托管到GitHub Pages和[coding.net](https://coding.net/)上，解决百度不收录问题。

步骤：

1、注册[coding.net](https://coding.net/)账号

2、创建一个跟账号用户名同名的仓库，例如：https://e.coding.net/username/username.git

3、配置 SSH 公钥，配置方法请查看[帮助](https://help.coding.net/docs/project/features/ssh.html)

4、在终端下进入本地博客目录evanblog（假设目录名为evanblog），添加coding.net的远程地址，新建分支，提交代码到coding.net

```bash
cd evanblog
git remote add coding https://e.coding.net/username/username.git # 关联远程仓库
git checkout -b coding-pages
git checkout master
git branch
>  coding-pages
>  * master
git push coding master/coding-pages # 提交代码到远程仓库的指定分支
```

> 关于git操作可查阅：[Git使用文档](./git.md)