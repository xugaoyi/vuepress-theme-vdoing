---
title: GitHub高级搜索技巧
date: 2019-12-25 14:27:01
permalink: /pages/4c778760be26d8b3
categories: 
  - 技术
  - GitHub技巧
tags: 
  - null
author: 
  name: xugaoyi
  link: https://github.com/xugaoyi
---
# GitHub高级搜索技巧	

`in:name <关键字>`
 仓库名称带关键字查询

`in:description <关键字>`
 仓库描述带关键字查询

`in:readme <关键字>`
 README文件带关键字查询


<!-- more -->


`stars(fork): >(=) <数字> <关键字>`
 star或fork数大于(或等于)指定数字的带关键字查询

`stars(fork): 10..20 <关键词>`
 star或fork数在10到20之间的带关键字查询



`size:>=5000 <关键词>`
 限定仓库大于等于5000K的带关键字查询

`pushed(created):>2019-11-15 <关键字>`
 更新 或 创建 日期在2019年11月16日之后的带关键字查询

`license:apache-2.0 <关键字>`
 LICENSE为apache-2.0的带关键字查询

`language:java <关键词>`
 仓库语言为Java的带关键字查询



`user:<用户名>`
 查询某个用户的项目

`org:<组织名>`
 查询某个组织的项目

***以上查询条件可组合使用，空格隔开**

```sh
# 示例1：搜索仓库名包含javascript，并且stars数大于1000的项目
in:name javascript stars:>1000

# 示例2：搜索描述中包含"小程序"，并且fork大于100，并且最近更新时间在2019-11-15之后的，并且使用开发语言为vue的项目
in:description 小程序 fork:>100 pushed:>2019-11-15 language:vue
```



***或使用高级搜索页搜索：**

<https://github.com/search/advanced>