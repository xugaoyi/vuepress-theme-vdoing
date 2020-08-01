---
title: GitHub加速下载项目的方法
date: 2020-03-09 10:28:09
permalink: /pages/95331c6a9613faf8
categories: 
  - 技术
  - GitHub技巧
tags: 
  - null
author: 
  name: xugaoyi
  link: https://github.com/xugaoyi
---
# GitHub加速下载项目的方法

国内在github上克隆项目总是异常的慢，据我多次克隆观察，下载速度最快就20k/s左右，特别是在克隆比较大的项目时简直慢得无法忍受！下面介绍一种加载克隆项目的方法。

<!-- more -->

![](https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200309112604.png)



## 利用码云来转接做下载加速

1. 首先你得有一个 [码云](https://gitee.com/) 的账号

2. 登录码云之后在页面右上角的加号选择`从GitHub/GitLab导入项目`

   ![](https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200309112711.jpg)

   

3. 选择`从URL导入`，粘贴从GitHub复制来的仓库地址，然后导入，这个导入过程一般是很快的。

   ![](https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200309112710.jpg)

4. 从码云克隆刚导入的这个项目，克隆速度会快很多，网速好的能达到几兆每秒（具体速度就看你的网速了，吐槽一下我家网速，总在关键时刻显示"视频加载中"....）

   ![](https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200309112712.jpg)

5. 另外要注意的一点，克隆下来的项目关联的是码云的仓库，如果你需要关联github仓库需要更改远程仓库。

   ```bash
   git remote -v # 查看关联的远程仓库
   git remote rm <仓库名> # 删除远程仓库
   git remote add <仓库名> <远程仓库地址> # 关联远程仓库，仓库名一般使用origin
   ```



这个方法适合用于克隆比较大的项目，如果克隆小项目，20k/s的速度好像还能将就~~

