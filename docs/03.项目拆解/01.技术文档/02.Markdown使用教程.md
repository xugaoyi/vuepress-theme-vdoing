---
title: Markdown使用教程
date: 2019-12-25 14:27:01
permalink: /pages/ad247c4332211551
categories:
  - 技术
  - 技术文档
tags:
  - null
author:
  name: xugaoyi
  link: https://github.com/xugaoyi
---
# Markdown使用教程

## 一、Markdown

### 简介

![logo](https://raw.githubusercontent.com/xugaoyi/image_store/master/blog/md_logo.png)

`Markdown` 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。

<!-- more -->

###  应用

当前许多网站都广泛使用 `Markdown` 来撰写帮助文档或是用于论坛上发表消息。例如：GitHub、简书、知乎等

### 编辑器

推荐使用`Typora`，官网：<https://typora.io/>





## 二、徽章

#### 什么是徽章

徽章是一种小巧精美的小图标，一般配有相关文字进行辅助说明，可对数据进行监控，链接跳转等，富有表现力。

常见于`github`项目主页，但其不仅出现于 `github` 项目主页，凡是能够表现图片的地方都可以出现徽章。



#### 徽章的使用

* 在`markdown`中使用

```markdown
格式:
[![图片文字说明](图片源地址)](超链接地址)  # 即超链接内部嵌套图片

语法：
[![github](https://img.shields.io/badge/github-xugaoyi-brightgreen.svg)](https://github.com/xugaoyi)
```
[![github](https://img.shields.io/badge/github-xugaoyi-brightgreen.svg)](https://github.com/xugaoyi)



徽章生成网站：<https://shields.io/>

本文档主要介绍markdown，不对徽章做过多介绍，详细介绍请 [ 戳我 ](https://segmentfault.com/a/1190000019552597) 了解。





## 三、设置目录

设置之后会根据分级标题来自动生成目录。

```markdown
[TOC]
```

> 注：github暂未支持。

[TOC]

在github生成TOC的方法：<https://github.com/ekalinin/github-markdown-toc>

windows系统需要基于golang实现的工具：https://github.com/ekalinin/github-markdown-toc.go

> 如果你有GO语言的编译环境，可以尝试自己编译，如果没有，可以直接下载编译好的二进制文件。
>
> 如windows系统64位 下载：gh-md-toc.windows.amd64.tgz （386 是32位，amd64是64位）
>
> 下载解压后，发现没有后缀名无法识别，实际上这是个exe文件，所以只需要暴力地在后面加上.exe就可以开始愉快使用了。
>
> 使用方法：
>
> 1. 首先将.md文档复制到gh-md-toc.exe的根目录下
> 2. 在该目录下打开系统命令行，输入命令：gh-md-toc.exe README.MD 生成目录
> 3. 把生成的目录复制到.md文件即可。



**这是gh-md-toc生成的目录：**



  * [一、Markdown](#%E4%B8%80markdown)
    * [简介](#%E7%AE%80%E4%BB%8B)
    * [应用](#%E5%BA%94%E7%94%A8)
    * [编辑器](#%E7%BC%96%E8%BE%91%E5%99%A8)
  * [二、徽章](#%E4%BA%8C%E5%BE%BD%E7%AB%A0)
      * [什么是徽章](#%E4%BB%80%E4%B9%88%E6%98%AF%E5%BE%BD%E7%AB%A0)
      * [徽章的使用](#%E5%BE%BD%E7%AB%A0%E7%9A%84%E4%BD%BF%E7%94%A8)
  * [三、设置目录](#%E4%B8%89%E8%AE%BE%E7%BD%AE%E7%9B%AE%E5%BD%95)
  * [四、标题](#%E5%9B%9B%E6%A0%87%E9%A2%98)
* [一级标题](#%E4%B8%80%E7%BA%A7%E6%A0%87%E9%A2%98)
  * [二级标题](#%E4%BA%8C%E7%BA%A7%E6%A0%87%E9%A2%98)
    * [三级标题](#%E4%B8%89%E7%BA%A7%E6%A0%87%E9%A2%98)
      * [四级标题](#%E5%9B%9B%E7%BA%A7%E6%A0%87%E9%A2%98)
        * [五级标题](#%E4%BA%94%E7%BA%A7%E6%A0%87%E9%A2%98)
          * [六级标题](#%E5%85%AD%E7%BA%A7%E6%A0%87%E9%A2%98)
  * [五、文本](#%E4%BA%94%E6%96%87%E6%9C%AC)
    * [段落](#%E6%AE%B5%E8%90%BD)
    * [字体](#%E5%AD%97%E4%BD%93)
    * [删除线](#%E5%88%A0%E9%99%A4%E7%BA%BF)
    * [下划线](#%E4%B8%8B%E5%88%92%E7%BA%BF)
    * [文字高亮](#%E6%96%87%E5%AD%97%E9%AB%98%E4%BA%AE)
    * [分隔线](#%E5%88%86%E9%9A%94%E7%BA%BF)
    * [脚注](#%E8%84%9A%E6%B3%A8)
  * [六、列表](#%E5%85%AD%E5%88%97%E8%A1%A8)
    * [无序列表](#%E6%97%A0%E5%BA%8F%E5%88%97%E8%A1%A8)
    * [有序列表](#%E6%9C%89%E5%BA%8F%E5%88%97%E8%A1%A8)
    * [折叠列表](#%E6%8A%98%E5%8F%A0%E5%88%97%E8%A1%A8)
    * [带复选框列表](#%E5%B8%A6%E5%A4%8D%E9%80%89%E6%A1%86%E5%88%97%E8%A1%A8)
    * [列表嵌套](#%E5%88%97%E8%A1%A8%E5%B5%8C%E5%A5%97)
  * [七、区块引用](#%E4%B8%83%E5%8C%BA%E5%9D%97%E5%BC%95%E7%94%A8)
      * [区块嵌套](#%E5%8C%BA%E5%9D%97%E5%B5%8C%E5%A5%97)
      * [区块中使用列表](#%E5%8C%BA%E5%9D%97%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%88%97%E8%A1%A8)
      * [列表中使用区块](#%E5%88%97%E8%A1%A8%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%8C%BA%E5%9D%97)
  * [八、代码](#%E5%85%AB%E4%BB%A3%E7%A0%81)
    * [代码区块](#%E4%BB%A3%E7%A0%81%E5%8C%BA%E5%9D%97)
  * [九、链接](#%E4%B9%9D%E9%93%BE%E6%8E%A5)
    * [变量链接](#%E5%8F%98%E9%87%8F%E9%93%BE%E6%8E%A5)
    * [Github中使用内部链接](#github%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%86%85%E9%83%A8%E9%93%BE%E6%8E%A5)
    * [锚点链接](#%E9%94%9A%E7%82%B9%E9%93%BE%E6%8E%A5)
  * [十、图片](#%E5%8D%81%E5%9B%BE%E7%89%87)
    * [图片宽高](#%E5%9B%BE%E7%89%87%E5%AE%BD%E9%AB%98)
    * [相对路径以及Github中使用图片](#%E7%9B%B8%E5%AF%B9%E8%B7%AF%E5%BE%84%E4%BB%A5%E5%8F%8Agithub%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%9B%BE%E7%89%87)
  * [十一、表格](#%E5%8D%81%E4%B8%80%E8%A1%A8%E6%A0%BC)
  * [十二、Emoji表情包](#%E5%8D%81%E4%BA%8Cemoji%E8%A1%A8%E6%83%85%E5%8C%85)
  * [十三、其他技巧](#%E5%8D%81%E4%B8%89%E5%85%B6%E4%BB%96%E6%8A%80%E5%B7%A7)
    * [支持的 HTML 元素](#%E6%94%AF%E6%8C%81%E7%9A%84-html-%E5%85%83%E7%B4%A0)
    * [转义](#%E8%BD%AC%E4%B9%89)
    * [数学公式](#%E6%95%B0%E5%AD%A6%E5%85%AC%E5%BC%8F)
    * [图表](#%E5%9B%BE%E8%A1%A8)
    * [流程图](#%E6%B5%81%E7%A8%8B%E5%9B%BE)
    * [时序图](#%E6%97%B6%E5%BA%8F%E5%9B%BE)
    * [甘特图](#%E7%94%98%E7%89%B9%E5%9B%BE)


## 四、标题

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题



## 五、文本

### 段落

Markdown 段落没有特殊的格式，直接编写文字，**需要段落缩进时使用2个Tab**



### 字体

```markdown
*斜体文本*
或 _斜体文本_
**粗体文本**
或  __粗体文本__
***粗斜体文本***
或 ___粗斜体文本___
```

*斜体文本*

_斜体文本_

**粗体文本**

__粗体文本__

***粗斜体文本***

___粗斜体文本___



###  删除线

如果段落上的文字要添加删除线，只需要在文字的两端加上两个波浪线 **~~** 即可，实例如下：

```markdown
~~BAIDU.COM~~
```



~~BAIDU.COM~~



### 下划线

下划线可以通过 HTML 的`<u>` 标签来实现：

```markdown
<u>带下划线的文本</u>
```

<u>带下划线的文本</u>



### 文字高亮

文字高亮能使行内部分文字高亮，使用一对反引号。

```markdown
`html` `css` `javascript`
```

`html` `css` `javascript`



### 分隔线

你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：

```markdown
***

*****

- - -

----------
```





***



### 脚注

脚注是对文本的补充说明。

```markdown
[^变量]
在文档结尾或其他位置給变量赋值：
[^变量]: 注明框内显示的内容

鼠标移到这里> [^哈喽]
[^哈喽]: 注明框内显示的内容
```

> 注：在部分线上预览未支持

鼠标移到这里> [^哈喽]

[^哈喽]: 注明框内显示的内容



## 六、列表

### 无序列表

使用星号`*`、加号`+`或是减号`-`作为列表标记：

```markdown
* 第一项
* 第二项

+ 第一项
+ 第二项

- 第一项
- 第二项
```



* 第一项
* 第二项

### 有序列表

使用数字并加上` .` 号来表示

```markdown
1. 第一项
2. 第二项
```



1. 第一项
2. 第二项



### 折叠列表

```markdown
<details>
<summary>点我打开关闭折叠</summary>
 折叠内容
 <ul>
     <li>1</li>
     <li>2</li>
     <li>3</li>
 </ul>
</details>
```

> 注意：\<details\> 标签内写markdown代码无效，可写html代码，如ul>li、table等

<details>
<summary>点我打开关闭折叠</summary>
 折叠内容
 <ul>
     <li>1</li>
     <li>2</li>
     <li>3</li>
 </ul>
</details>

<details>
<summary>包含table的折叠</summary>
    <table>
        <thead>
            <tr>
                <th align="center">分类</th>
                <th align="center">例词</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td align="center">人称代词-主格</td>
                <td align="center">I我，you你，he他，she她，they他们， we我们</td>
            </tr>
            <tr>
                <td align="center">人称代词-宾格</td>
                <td align="center">me我， you你， him他， her她， them他们， us我们</td>
            </tr>
            <tr>
                <td align="center">物主代词</td>
                <td align="center">my我的， his他的， your你的（your你们的）， their他们的， hers她的</td>
            </tr>
            <tr>
                <td align="center">指示代词</td>
                <td align="center">this这， that那， these这些， those 那些</td>
            </tr>
            <tr>
                <td align="center">反身代词</td>
                <td align="center">myself我自己， himself他自己， themselves他们自己， yourself你(们)自己，herself她自己</td>
            </tr>
            <tr>
                <td align="center">疑问代词</td>
                <td align="center">who谁， what什么， which哪个</td>
            </tr>
            <tr>
                <td align="center">不定代词</td>
                <td align="center">some一些， many许多， both两个、两个都， any许多</td>
            </tr>
            <tr>
                <td align="center">关系代词</td>
                <td align="center">which……的物， who……的人， that……的人或物， who谁， that引导定语从句</td>
            </tr>
            <tr>
                <td align="center">相互代词</td>
                <td align="center">each other 互相， one another互相</td>
            </tr>
            <tr>
                <td align="center">连接代词</td>
                <td align="center">who,whom,whose,what,which,whatever,whichever,whoever,whomever</td>
            </tr>
            <tr>
                <td align="center">替代词</td>
                <td align="center">one（单数），ones（复数）</td>
            </tr>
        </tbody>
    </table>
</details>



### 带复选框列表

```markdown
* [x] 第一项
* [ ] 第二项
* [ ] 第三项
```

> 注：在部分线上预览未支持

- [x] 第一项

- [ ] 第二项

- [ ] 第三项



### 列表嵌套

```markdown
1. 第一项：
    - 第一项嵌套的第一个元素
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
       - 第三层嵌套
```



1. 第一项
   - 嵌套1
   - 嵌套2
2. 第二项
   	- 嵌套1
      	- 嵌套2



## 七、区块引用



区块引用是在段落开头使用 `>`符号 ，然后后面紧跟一个**空格**符号：

```markdown
> 区块引用
```



> 区块引用
>
> Typora中回车键自动延伸区块



#### 区块嵌套

```markdown
> 第一层
> > 第二层
> > > 第三层
```

> 第一层
>
> > 第二层
> >
> > > 第三层



#### 区块中使用列表

```markdown
> 区块中使用列表
> 1. 第一项
> 2. 第二项
> * 111
> * 222
```

> 区块中使用列表
>
> 1. 第一项
> 2. 第二项
>    * 111
>    * 222



#### 列表中使用区块

```markdown
* 第一项
    > 区块
* 第二项
```

* 第一项

  > 区块
  >
  > 区块

* 第二项





## 八、代码

如果是段落上的一个代码片段可以用反引号把它包起来（**`**），示例：

```markdown
`alert()`
```

`alert()`



### 代码区块

用三个反引号 **```** 包裹一段代码，并指定一种语言（也可以不指定），指定代码语言后会有代码的颜色高亮

本代码区块为示例说明：

```markdown
​```javascript
function test() {
	alert('test')
}
​```
```

效果：

```javascript
function test() {
	alert('test')
}
```



## 九、链接

格式：

```markdown
[链接名称](链接地址)

[链接名称](链接地址,可选的alt)

或

<链接地址>
```

示例：

```markdown
[百度](http://www.baidu.com,'百度')
```

[百度](http://www.baidu.com,'百度')

直接显示链接地址：

```markdown
<http://www.baidu.com>
```

<http://www.baidu.com>



### 变量链接

链接可以用变量来代替，文档末尾或其他位置附带变量地址：

```markdown
这个链接用 1 作为网址变量 [Google][1]
这个链接用 baidu 作为网址变量 [Baidu][baidu]

然后在文档的结尾或其他位置给变量赋值（网址）
  [1]: http://www.google.com/
  [baidu]: http://www.baidu.com/
```



这个链接用 1 作为网址变量 [Google][1]

这个链接用 baidu 作为网址变量 [Baidu][baidu]

[1]:http://www.google.com
[baidu]: http://www.baidu.com/



### Github仓库中使用内部链接

```markdown
可使用相对路径（前提是有该路径下的文件）
[test](test.md)
```
[test](./md-img/test.md)



### 锚点链接

本文件中每一个标题都是一个锚点，和HTML的锚点（`#`）类似

```markdown
[Markdown](#Markdown)
```

> 注： github对含有标点符号的标题进行锚点时会忽略掉标点符号，
> 本页中，如果这样写则无法跳转：\[链接](#九、链接)
> 正确写法：\[链接](#九链接)

[Markdown](#一Markdown)

[链接](#九链接)

[流程图](#流程图)



## 十、图片

和链接的区别是前面多一个感叹号`!`

```markdown
![图片名](图片链接)
```

当然，你也可以像链接那样对图片地址使用变量:

```markdown
这里链接用 img 作为图片地址变量
然后在文档的结尾或其他位置给变量赋值（图片地址）
![RUNOOB][img]
[img]: https://raw.githubusercontent.com/xugaoyi/image_store/master/blog/md_logo.png
```

 ![RUNOOB][img]

[img]: https://raw.githubusercontent.com/xugaoyi/image_store/master/blog/md_logo.png



### 图片宽高

如下想设置图片宽高，可以使用 `<img>` 标签。

```html
<img src="https://raw.githubusercontent.com/xugaoyi/image_store/master/blog/md_logo.png" width="50px" height="30px">
```



<img src="https://raw.githubusercontent.com/xugaoyi/image_store/master/blog/md_logo.png" width="50px" height="30px">



### 相对路径以及Github中使用图片

不管是在本地还是在github同一个仓库中，如果图片存在，可以使用**相对路径**。

相对路径图片：

```markdown
![头像图片](./md-img/test.jpg)
```

github上如果引用其他github仓库中的图片则要注意地址格式：`仓库地址/raw/分支名/图片路径` 或 `https://raw.githubusercontent.com/用户名/仓库名/分支名/图片路径`

```markdown
![其他仓库的图片1](https://github.com/xugaoyi/vue-music/raw/master/src/common/image/default.png)
或
![其他仓库的图片2](https://raw.githubusercontent.com/xugaoyi/image_store/master/blog/md_logo.png)

```



![其他仓库的图片](https://github.com/xugaoyi/vue-music/raw/master/src/common/image/default.png)



![其他仓库的图片2](https://raw.githubusercontent.com/xugaoyi/image_store/master/blog/md_logo.png)

## 十一、表格

制作表格使用 `|`来分隔不同的单元格，使用`-`来分隔表头和其他行。

```markdown
|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |
```



|  表头  |  表头  |
| :----: | :----: |
| 单元格 | 单元格 |
| 单元格 | 单元格 |



**对齐方式**

- **-:** 设置内容和标题栏居右对齐
- **:-** 设置内容和标题栏居左对齐
- **:-:** 设置内容和标题栏居中对齐

```markdown
| 左对齐 | 右对齐 | 居中对齐 |
| :-----| ----: | :----: |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |
```

| 左对齐 | 右对齐 | 居中对齐 |
| :----- | -----: | :------: |
| 单元格 | 单元格 |  单元格  |
| 单元格 | 单元格 |  单元格  |



## 十二、Emoji表情包

Emoji表情英文名的前后加冒号，Typore上先输入冒号再输入首字母有表情提示

```markdown
:smirk:
```
:kiss:
:smile_cat::see_no_evil::horse:
:smirk::blush::smiley::smile: :sunny:



更多表情名称请查看：[表情包清单](https://www.webfx.com/tools/emoji-cheat-sheet/)



## 十三、其他技巧

### 支持的 HTML 元素

不在 Markdown 语法涵盖范围之内的标签，都可以直接在文档里面用 HTML 撰写。

目前支持的 HTML 元素有：`<kbd> <b> <i> <em> <sup> <sub> <br>`等等 ，如：

```markdown
使用 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd> 重启电脑
```

使用 <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd> 重启电脑

<b>我是使用b标签的加粗字体</b>



### 转义

Markdown 使用了很多特殊符号来表示特定的意义，如果需要显示特定的符号则需要使用反斜杠转义字符：

```markdown
**未转义星号显示加粗**
\*\* 转义显示星号 \*\*
```

**未转义星号显示加粗**
\*\* 转义显示星号 \*\*



Markdown 支持以下这些符号前面加上反斜杠来帮助插入普通的符号：

```markdown
\   反斜线
`   反引号
*   星号
_   下划线
{}  花括号
[]  方括号
()  小括号
#   井字号
+   加号
-   减号
.   英文句点
!   感叹号
```



***

*\*\* **以下部分在Github或其他在线预览中暂未支持** \*\*\*

***



### 数学公式

当你需要在编辑器中插入数学公式时，可以使用两个美元符 $$ 包裹 TeX 或 LaTeX 格式的数学公式来实现。提交后，问答和文章页会根据需要加载 Mathjax 对数学公式进行渲染。如：

```markdown
$$
\mathbf{V}_1 \times \mathbf{V}_2 =  \begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
\frac{\partial X}{\partial u} &  \frac{\partial Y}{\partial u} & 0 \\
\frac{\partial X}{\partial v} &  \frac{\partial Y}{\partial v} & 0 \\
\end{vmatrix}
$$tep1}{\style{visibility:hidden}{(x+1)(x+1)}}
$$
```


$$
\mathbf{V}_1 \times \mathbf{V}_2 =  \begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
\frac{\partial X}{\partial u} &  \frac{\partial Y}{\partial u} & 0 \\
\frac{\partial X}{\partial v} &  \frac{\partial Y}{\partial v} & 0 \\
\end{vmatrix}
$$

### 图表

````markdown
​```chart
,Budget,Income,Expenses,Debt
June,5000,8000,4000,6000
July,3000,1000,4000,3000
Aug,5000,7000,6000,3000
Sep,7000,2000,3000,1000
Oct,6000,5000,4000,2000
Nov,4000,3000,5000,

type: pie
title: Monthly Revenue
x.title: Amount
y.title: Month
y.suffix: $
​```
​```mermaid
sequenceDiagram
A->>B: 是否已收到消息？
B-->>A: 已收到消息
​```
````

> 注：在Typora中未支持


### 流程图

````markdown
语法：
​```mermaid
graph TD
A[模块A] -->|A1| B(模块B)
B --> C{判断条件C}
C -->|条件C1| D[模块D]
C -->|条件C2| E[模块E]
C -->|条件C3| F[模块F]
​```
````

流程图相关文章：

<https://www.jianshu.com/p/b421cc723da5>

<http://www.imooc.com/article/292708>





### 时序图

````markdown
​```mermaid
sequenceDiagram
A->>B: 是否已收到消息？
B-->>A: 已收到消息
​```
````




 ### 甘特图

```` markdown
​```mermaid
gantt
title 甘特图
dateFormat  YYYY-MM-DD
section 项目A
任务1           :a1, 2018-06-06, 30d
任务2     :after a1  , 20d
section 项目B
任务3      :2018-06-12  , 12d
任务4      : 24d
​```
````

​																														     									[回到顶部](#markdown使用教程)
