---
title: Git使用手册
date: 2019-12-25 14:27:01
permalink: /pages/9a7ee40fc232253e
categories: 
  - 技术
  - 技术文档
tags: 
  - null
author: 
  name: xugaoyi
  link: https://github.com/xugaoyi
---


# Git使用手册

## 安装

官网下载：<https://git-scm.com/downloads> 下载完成后使用默认进行安装。

安装完成后，在开始菜单里找到 `Git` -> `Git Bash`，蹦出一个类似命令行窗口的东西，就说明Git安装成功！
还需要最后一步设置，在命令行输入：

```bash
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

<!-- more -->

## 创建版本库（仓库）

```bash
# 创建仓库
mkdir <仓库name> 

# 进入仓库
cd <仓库name>

# 此命令用于显示当前目录
pwd

# 把当前目录初始化成Git仓库
git init
```

> 也不一定必须在空目录下创建Git仓库，选择一个已经有东西的目录直接`git init`也是可以的。



## 添加文件到仓库

在仓库目录下放入文件，如新建一个`test.txt`文件，然后使用`git add test.txt`命令告诉Git，把文件添加到缓存区，然后使用`git commit -m "提交描述"`告诉Git，把文件提交到仓库。

```bash
# 添加指定文件或文件夹到缓存区，文件需添加后缀
git add <文件或文件夹name>                   # 单个文件
git add <文件或文件夹name> <文件或文件夹name>  # 多个文件

# 或 全部文件同时添加到缓存区
git add .

# 把文件从缓存区提交至仓库
git commit -m "提交描述"
```



#### 提交描述规范

在提交代码时输入清晰的说明有利于版本管理，建议搭配如下关键字编写提交描述

```bash
# 新建(add)
# 删除(rm)
# 更新(update)
# 改动(change)
# 实现
# 发布
# 修复
...
```





## 版本管理

#### 提交修改

如修改`test.txt`的内容后，运行`git status`命令看看被修改的文件，然后再使用`git add test.txt`、
`git commit -m "修改描述"`把修改后的文件提交到仓库，提交后可再次使用`git status`查看当前状态。

```bash
# 显示 新增/删除/被改动等 的文件
git status
```



#### 查看版本记录

```bash
# 查看版本记录
git log   # 显示版本号、提交时间等信息
```

> 也可使用可视化工具查看Git版本历史：
> 在仓库目录右键 > `Git BUI Here`



#### 回退版本

首先，Git必须知道当前版本是哪个版本，在Git中，用`HEAD`表示当前版本，也就是最新的提交1094adb...（注意我的提交ID和你的肯定不一样），上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，当然往上100个版本写100个^比较容易数不过来，所以写成`HEAD~100`。

```bash
# 回退到上一个版本
$ git reset --hard HEAD^
```

此时查看`git log`记录发现，原来最新的版本已经没有了，想回到原来最新的版本怎么办？这就需要知道最新的版本的版本号

``` bash
# 跳转到指定版本
git reset --hard <版本号前几位>
```

但是不知道版本号怎么办？Git提供了一个命令`git reflog`用来记录你的每一次命令

```bash
git reflog
```

#### 撤销修改

<https://www.liaoxuefeng.com/wiki/896043488029600/897889638509536>

#### 删除文件

https://www.liaoxuefeng.com/wiki/896043488029600/900002180232448



## 远程仓库

#### SSH验证

使本机能关联远程仓库，首次需要SSH验证

* 第1步：创建`SSH Key`。在用户主（C:\Users\dell）目录下，看看有没有.ssh目录，
  如果有，再看看这个目录下有没有`id_rsa`和`id_rsa.pub`这两个文件，如果已经有了，可直接跳到下一步。
  如果没有，打开Shell（Windows下打开Git Bash），创建`SSH Key`：

```bash
# 创建SSH Key
ssh-keygen -t rsa -C "邮件地址"
```

* 第2步：登陆GitHub，右上角头像 > settings > SSH and GPG keys >Add SSH Key，在key的文本框里粘贴`id_rsa.pub`文件的内容

  

#### 关联远程仓库

SSH验证完成后，在github创建仓库，创建仓库时记得取消 `Initialize this repository with a README`的勾选，然后在本地命令：

```bash
# 关联远程仓库，仓库名一般使用origin
git remote add <仓库名> <远程仓库地址>

# 示例
git remote add origin git@github.com:xugaoyi/test.git
```

下一步，就可以把本地库的所有内容推送到远程库上

```bash
# 把文件推送到远程仓库
git push -u <仓库名> <分支名>

# 示例
git push -u origin master
```

由于远程库是空的，我们第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。

> 前提是目录已经`git init`初始化成仓库，并且`git status`状态是没有改动的，如果有改动则先`git add .`添加至缓存区，`git commit -m '提交描述'`提交至仓库，然后执行上面命令。
>
> 如创建仓库时勾选了 `Initialize this repository with a README` 则需先拉取`README.md`文件到本地仓库`git pull`
>
> 可关联多个远程仓库，注意给不同的远程仓库取不一样的名称，提交是分别按名称提交到不一样的远程仓库。



```bash
# 简化的推送命令
git push
```



#### 查看远程仓库

```bash
# 查看远程仓库
git remote -v
```



#### 删除远程仓库

```bash
# 删除远程仓库
git remote rm <仓库名>
```



#### 从远程库克隆项目

```bash
# 从远程库克隆项目
git clone <仓库地址>
```

##### 克隆指定分支

```bash
# 克隆指定分支
git clone -b <分支名> <仓库地址>
```



## 分支管理

#### 创建分支

```bash
# 创建分支
git checkout -b <分支名>
```



#### 查看分支

```bash
# 查看分支
git branch
```

查看分支时，在分支前带 * 号的表示当前的分支



#### 切换分支

```bash
# 切换分支
git checkout <分支名>
```



#### 合并分支

```bash
# 合并本地的分支
git merge <分支名>

# 合并远程的分支
git merge <远程仓库名>/<分支名>
```

**注意**，是将指定分支合并到当前分支，并非当前分支合并到指定分支。

一般情况下是把当前分支切换到**主分支**，然后把**子分支**合并到**主分支**。







#### 删除分支

```bash
# 删除分支
git branch -d <分支名>
```



#### 修改分支名

```bash
# 修改分支名
git branch -m <原分支名> <新分支名>
```





## 帮助命令

如对命令不清楚时，可使用`git help`命令显示出git命令介绍。

```bash
# 帮助命令
git help
```



```bash
$ git help
usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]

These are common Git commands used in various situations:

start a working area (see also: git help tutorial)
   clone      Clone a repository into a new directory
   init       Create an empty Git repository or reinitialize an existing one

work on the current change (see also: git help everyday)
   add        Add file contents to the index
   mv         Move or rename a file, a directory, or a symlink
   reset      Reset current HEAD to the specified state
   rm         Remove files from the working tree and from the index

examine the history and state (see also: git help revisions)
   bisect     Use binary search to find the commit that introduced a bug
   grep       Print lines matching a pattern
   log        Show commit logs
   show       Show various types of objects
   status     Show the working tree status

grow, mark and tweak your common history
   branch     List, create, or delete branches
   checkout   Switch branches or restore working tree files
   commit     Record changes to the repository
   diff       Show changes between commits, commit and working tree, etc
   merge      Join two or more development histories together
   rebase     Reapply commits on top of another base tip
   tag        Create, list, delete or verify a tag object signed with GPG

collaborate (see also: git help workflows)
   fetch      Download objects and refs from another repository
   pull       Fetch from and integrate with another repository or a local branch
   push       Update remote refs along with associated objects

'git help -a' and 'git help -g' list available subcommands and some
concept guides. See 'git help <command>' or 'git help <concept>'
to read about a specific subcommand or concept.
```



翻译工具翻译中文

```bash
$ git help
使用：git [--version] [--help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]

这些是在各种情况下使用的通用Git命令：

start a working area (参见命令: git help tutorial)
   clone      将存储库克隆到新目录中
   init       创建一个空的Git存储库或重新初始化一个现有的存储库

work on the current change (参见命令: git help everyday)
   add        将文件内容添加到索引中
   mv         移动或重命名文件、目录或符号链接
   reset      将当前磁头重置为指定状态
   rm         从工作树和索引中删除文件

examine the history and state (参见命令: git help revisions)
   bisect     使用二分查找查找引入错误的提交
   grep       打印与模式匹配的行
   log        显示提交日志
   show       显示各种类型的对象
   status     显示工作树状态

grow, mark and tweak your common history
   branch     列出、创建或删除分支
   checkout   切换分支或还原工作树文件
   commit     记录对存储库的更改
   diff       显示提交、提交和工作树等之间的更改
   merge      将两个或多个开发历史连接在一起
   rebase     在另一个基本提示之上重新应用提交
   tag        创建、列表、删除或验证用GPG签名的标记对象

collaborate (参见命令: git help workflows)
   fetch      从另一个存储库下载对象和引用
   pull       从另一个存储库或本地分支获取并与之集成
   push       更新远程引用和相关对象

'git help -a' 和 'git help -g' 列出可用的子命令和一些概念指导。
命令'git help <command>' 或 'git help <concept>' 查看特定子命令或概念.
```



## 参考文档

<https://www.liaoxuefeng.com/wiki/896043488029600>

