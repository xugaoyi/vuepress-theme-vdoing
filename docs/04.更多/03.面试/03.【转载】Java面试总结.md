---
title: 【转载】Java面试总结
date: 2021-06-18 17:44:07
permalink: /pages/64aa1e/
categories:
  - 更多
  - 面试
tags:
  - 
---

![img](https://img-blog.csdnimg.cn/20200219112303555.png?x-oss-process=image/resize,m_fixed,h_224,w_224)
面试是公司挑选职工的一种重要方法。要想在面试中脱颖而出，就得好好准备.在这里我总结了常见的Java面试知识，分享给大家，祝大家早日收到offer。

Java面试总结主要包括Java基础知识，集合容器，并发，JVM知识，Spring全家桶，MyBatis框架，数据库等。

<!-- more -->
**作者: ThinkWon**

敏于观察，勤于思考，善于综合，勇于创新。


---
### [架构设计&分布式&数据结构与算法面试题](https://blog.csdn.net/ThinkWon/article/details/105870730)

  > 请列举出在JDK中几个常用的设计模式？什么是设计模式？你是否在你的代码里面使用过任何设计模式？静态代理、JDK动态代理以及CGLIB动态代理静态代理动态代理cglib代理单例模式工厂模式观察者模式装饰器模式秒杀系统设计分布式分布式概述分布式集群微服务多线程高并发分布式系统设计理念分布式系统的目标与要素分布式系统设计两大思路：中心化和去中心化分布式与集群的区别是什么？CAP定理CAP...

  


### [并发编程面试题](https://blog.csdn.net/ThinkWon/article/details/104863992)

  > 并发编程的优缺点为什么要使用并发编程（并发编程的优点）并发编程有什么缺点并发编程三要素是什么？在 Java 程序中怎么保证多线程的运行安全？并行和并发有什么区别？什么是多线程，多线程的优劣？线程和进程区别什么是线程和进程?进程与线程的区别什么是上下文切换?守护线程和用户线程有什么区别呢？如何在 Windows 和 Linux 上查找哪个线程cpu利用率最高？什么是线程死锁形成死锁的...



### [MySQL数据库面试题](https://blog.csdn.net/ThinkWon/article/details/104778621)

  > 为什么要使用数据库什么是SQL？什么是MySQL?数据库三大范式是什么mysql有关权限的表都有哪几个MySQL的binlog有有几种录入格式？分别有什么区别？数据类型mysql有哪些数据类型引擎MySQL存储引擎MyISAM与InnoDB区别MyISAM索引与InnoDB索引的区别？InnoDB引擎的4大特性存储引擎选择索引什么是索引？索引有哪些优缺点？索引使用场景（重点）...2020-03-10 17:20:40

  

### [Linux面试题](https://blog.csdn.net/ThinkWon/article/details/104588679)

  > 什么是LinuxUnix和Linux有什么区别？什么是 Linux 内核？Linux的基本组件是什么？Linux 的体系结构BASH和DOS之间的基本区别是什么？Linux 开机启动过程？Linux系统缺省的运行级别？Linux 使用的进程间通信方式？Linux 有哪些系统日志文件？Linux系统安装多个桌面环境有帮助吗？什么是交换空间？什么是root帐户什么是LILO？什...

  

### [消息中间件MQ与RabbitMQ面试题](https://blog.csdn.net/ThinkWon/article/details/104588612)

  > 为什么使用MQ？MQ的优点消息队列有什么优缺点？RabbitMQ有什么优缺点？你们公司生产环境用的是什么消息中间件？Kafka、ActiveMQ、RabbitMQ、RocketMQ 有什么优缺点？MQ 有哪些常见问题？如何解决这些问题？什么是RabbitMQ？rabbitmq 的使用场景RabbitMQ基本概念RabbitMQ的工作模式如何保证RabbitMQ消息的顺序性？消息如何分发？消...

  

### [Java集合容器面试题](https://blog.csdn.net/ThinkWon/article/details/104588551)

  > 什么是集合集合的特点集合和数组的区别使用集合框架的好处常用的集合类有哪些？List，Set，Map三者的区别？List、Set、Map 是否继承自 Collection 接口？List、Map、Set 三个接口存取元素时，各有什么特点？集合框架底层数据结构哪些集合类是线程安全的？Java集合的快速失败机制 “fail-fast”？怎么确保一个集合不能被修改？Collection...

  

### [Redis面试题](https://blog.csdn.net/ThinkWon/article/details/103522351)

  > 什么是RedisRedis有哪些数据类型Redis有哪些优缺点Redis的应用场景为什么要用 Redis /为什么要用缓存为什么要用 Redis 而不用 map/guava 做缓存?Redis为什么这么快持久化什么是Redis持久化？Redis 的持久化机制是什么？各自的优缺点？如何选择合适的持久化方式Redis持久化数据和缓存怎么做扩容？过期键的删除策略Redis的过期键的删除策略R...



### [ZooKeeper面试题](https://blog.csdn.net/ThinkWon/article/details/104397719)

  >1.ZooKeeper 是什么？2. ZooKeeper 提供了什么？3. Zookeeper 文件系统4. Zookeeper 怎么保证主从节点的状态同步？5. 四种类型的数据节点 Znode6. Zookeeper Watcher 机制 -数据变更通知7. 客户端注册 Watcher 实现8. 服务端处理 Watcher 实现9. 客户端回调 Watcher10. ACL 权限控...

  

### [Tomcat面试题](https://blog.csdn.net/ThinkWon/article/details/104397665)

  > Tomcat是什么？Tomcat的缺省端口是多少，怎么修改tomcat 有哪几种Connector 运行模式(优化)？Tomcat有几种部署方式？tomcat容器是如何创建servlet类实例？用到了什么原理？Tomcat工作模式Tomcat顶层架构Tomcat顶层架构小结Connector和Container的微妙关系Container架构分析Container如何处理请求的总结Tom...

  

### [Spring面试题](https://blog.csdn.net/ThinkWon/article/details/104397516)

  > Spring概述（10）什么是spring?Spring框架的设计目标，设计理念，和核心是什么Spring的优缺点是什么？Spring有哪些应用场景Spring由哪些模块组成？Spring 框架中都用到了哪些设计模式？详细讲解一下核心容器（spring context应用上下文) 模块Spring框架中有哪些不同类型的事件Spring 应用程序有哪些不同组件？使用 Spring 有哪些方式...

  

### [Spring MVC面试题](https://blog.csdn.net/ThinkWon/article/details/104397427)

  > 什么是Spring MVC？简单介绍下你对Spring MVC的理解？Spring MVC的优点核心组件Spring MVC的主要组件？什么是DispatcherServlet什么是Spring MVC框架的控制器？Spring MVC的控制器是不是单例模式,如果是,有什么问题,怎么解决？工作原理请描述Spring MVC的工作流程？描述一下 DispatcherServlet 的工作...

  

### [Spring Cloud面试题](https://blog.csdn.net/ThinkWon/article/details/104397367)

  > 为什么需要学习Spring Cloud什么是Spring Cloud设计目标与优缺点设计目标优缺点Spring Cloud发展前景整体架构主要项目Spring Cloud ConfigSpring Cloud NetflixSpring Cloud BusSpring Cloud ConsulSpring Cloud SecuritySpring Cloud SleuthSpring Cl...

  

### [Spring Boot面试题](https://blog.csdn.net/ThinkWon/article/details/104397299)

  > 什么是 Spring Boot？Spring Boot 有哪些优点？Spring Boot 的核心注解是哪个？它主要由哪几个注解组成的？配置什么是 JavaConfig？Spring Boot 自动配置原理是什么？你如何理解 Spring Boot 配置加载顺序？什么是 YAML？YAML 配置的优势在哪里 ?Spring Boot 是否可以使用 XML 配置 ?spring boot...

  

### [Netty面试题](https://blog.csdn.net/ThinkWon/article/details/104391081)

  > 1.Netty 是什么？2.Netty 的特点是什么？3.Netty 的优势有哪些？4.Netty 的应用场景有哪些？5.Netty 高性能表现在哪些方面？6.BIO、NIO和AIO的区别？7.NIO的组成？8.Netty的线程模型？9.TCP 粘包/拆包的原因及解决方法？10.什么是 Netty 的零拷贝？11.Netty 中有哪种重要组件？12.Netty 发送消息有几种方式？13.默...

  

### [MyBatis面试题](https://blog.csdn.net/ThinkWon/article/details/101292950)

  > 整理好的MyBatis面试题库，史上最全的MyBatis面试题，MyBatis面试宝典，特此分享给大家MyBatis 介绍MyBatis 是一款优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射。MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。MyBatis 可以使用简单的 XML 或注解来配置和映射原生类型、接口和 Java 的 POJO

  

### [Java虚拟机(JVM)面试题](https://blog.csdn.net/ThinkWon/article/details/104390752)

  > Java内存区域说一下 JVM 的主要组成部分及其作用？说一下 JVM 运行时数据区深拷贝和浅拷贝说一下堆栈的区别？队列和栈是什么？有什么区别？HotSpot虚拟机对象探秘对象的创建为对象分配内存处理并发安全问题对象的访问定位句柄访问直接指针内存溢出异常Java会存在内存泄漏吗？请简单描述垃圾收集器简述Java垃圾回收机制GC是什么？为什么要GC垃圾回收的优点和原理。并考虑2种回收机制垃圾...

  

### [Java异常面试题](https://blog.csdn.net/ThinkWon/article/details/104390689)

  > 文章目录Java异常架构与异常关键字Java异常简介Java异常架构1. Throwable2. Error（错误）3. Exception（异常）运行时异常编译时异常4. 受检异常与非受检异常受检异常非受检异常Java异常关键字Java异常处理声明异常抛出异常捕获异常如何选择异常类型常见异常处理方式直接抛出异常封装异常再抛出捕获异常自定义异常try-catch-finallytry-with-r...

  

### [Java基础知识面试题](https://blog.csdn.net/ThinkWon/article/details/104390612)

  > 何为编程什么是Javajdk1.5之后的三大版本JVM、JRE和JDK的关系什么是跨平台性？原理是什么Java语言有哪些特点什么是字节码？采用字节码的最大好处是什么什么是Java程序的主类？应用程序和小程序的主类有何不同？Java应用程序与小程序之间有那些差别？Java和C++的区别Oracle JDK 和 OpenJDK 的对比基础语法数据类型Java有哪些数据类型switc...
