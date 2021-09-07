---
title: ansible
date: 2021-09-06 14:37:14
permalink: /pages/b8e51d/
categories:
  - ansible
tags:
  - 
---
[TOC]

# 1.0 ansible安装

#### 1.1.0 centos 安装

```bash
yum install centos
```

#### 1.2.0 debian安装

```bash
apt-get install centos
```

#### 1.3.0 python安装

```bash
git clone https://github.com/ansible/ansible.git
pip install ansible
#此处注意有坑：pip是默认的python2的版本，如果要安装python3的版本，那么需要指定软连接
cd /usr/bin
rm -rf python
ll
ln -s /usr/bin/python3 python

pip install ansible

ansible --version
 ansible --version
ansible [core 2.11.1] 
  config file = none #没有ansible.cfg文件
  configured module search path = ['/root/.ansible/plugins/modules', '/usr/share/ansible/plugins/modules']
  ansible python module location = /usr/local/lib/python3.6/site-packages/ansible
  ansible collection location = /root/.ansible/collections:/usr/share/ansible/collections
  executable location = /usr/local/bin/ansible
  python version = 3.6.6 (default, Jun 13 2021, 22:15:16) [GCC 4.8.5 20150623 (Red Hat 4.8.5-44)]
  jinja version = 3.0.1
  libyaml = True

直接在在/etc文件下创建ansible文件夹，然后穿件ansible.cfg
然后配置如下：
[defaults]
inventory=/etc/ansible/hosts
deprecation_warnings=False

然后在/etc/ansible/创建hosts文件
hosts配置如下：

[test_web]
192.168.1.103
192.168.1.39
192.168.1.24

验证是否可以连接
ansible all -m ping
结果如下：
192.168.1.103 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    },
    "changed": false,
    "ping": "pong"
}
192.168.1.39 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    },
    "changed": false,
    "ping": "pong"
}
192.168.1.24 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    },
    "changed": false,
    "ping": "pong"
}

```

在执行上面ping之前需要做如下操作，此处需要注意的是要执行如下才可以进行ssh的秘钥通讯

- 在192.168.1.24的ansible中需要安装ssh，默认是创建的
- 执行ssh keygen 直接enter3次，生成了/root/.ssh文件，然后里面有

```bash
id_rsa      #私钥

id_rsa.pub  #这个是 公钥

ssh-copy-id -i /root/.ssh/id_rsa.pub root@192.168.1.24
输入密码
ssh-copy-id -i /root/.ssh/id_rsa.pub root@192.168.1.103
ssh-copy-id -i /root/.ssh/id_rsa.pub root@192.168.1.39
```

以上操作后再进行ansible all -m ping才可以ping通，这样证明ansible这台服务器可以连接本机，还可以连接103，39服务器进行脚本的编写配置了



# 2.0 ansible清单

```bash
[env_test]

192.168.1.39

[env_prod]

192.168.1.24

[env_:children]

env_test

env_prod
```



# 3.0 ansible模块

#### 1.ansible +tab键查看所有的模块

```
ansible             ansible-connection  ansible-doc         ansible-inventory   ansible-pull        ansible-vault       
ansible-config      ansible-console     ansible-galaxy      ansible-playbook    ansible-test  
```

#### 2.ansible相关命令

```bash
 ansible <host-pattern> [-m module_name][-a args]
--version 显示版本
-m module 指定模块，默认为command，可以通过修改/etc/ansible/ansible.cfg修改成 #module_name = shell
--list-host 显示主机列表
-k --ask-pass 提示输入ssh连接密码，默认Key验证
-K,--ask-become-pass 提示输入sudo时的口令
-C，-check 检查，并不执行
-T，--timeout=TIMEOUT 执行命令的超时时间，默认10s
-u, --user=REMOTE_USER 执行远程执行的用户
-b, --become 代替旧版本的sudo切换
```

#### 3.ansible-doc  查看模块文档

```shell
ansible-doc -a #列出所有的文档
ansible-doc -l ,--list #列出所有的帮助文档
ansible-doc 模块名 #查看模块的帮助文档
例子：
ansible-doc -s ping #查看ping模块
```

#### 4.ping 模块

```shell
ansible all -m ping #ping /etc/ansible/hosts中的所有主机
ansible "*" -m ping #ping /etc/ansible/hosts中的所有主机
ansible test-web -m ping #ping主机名为test-web的内容
ansible "192.168.1.24:192.168.1.36" #  ping ip为192.168.1.24:192.168.1.36的所有主机
```

#### 5.file模块

```bash
ansible test-web -m file 'path=/root/test/ansible.txt state=touch'  #创建文件
ansible test-web -m file 'path=/root/test/ansible.txt state=absent' #删除文件
ansible web-test -m file -a "path=/root/test/ansible.txt state=touch group=klxx mode=750 owner=klxx" #创建文件 group为组，mode是750权限，owner是文件所有者

ansible web-test -m file -a "path=/root/test/dir01 state=directory" #创建目录
ansible web-test -m file -a "src=/root/test-link dest=/root/test/dir01 state=link" #创建软连接。/root/test-link创建的内容，回在 /root/test/dir01也存在，这个属于软连接
```

![image-20210601130232824](D:\技术文档\ansible\image-20210601130232824.png)

<img src="D:\技术文档\ansible\image-20210601130607643.png" alt="image-20210601130607643" style="zoom:80%;" style=""/>

#### 6.achive 模块：压缩包

```bash
ansible test-web -m archive -a "path=/root/test/dir02 dest=/root/test-link/dir02.tar.gz format=gz copy=yes"

```

#### 7.unachive模块：解包

```bash
ansible test-web -m unarchive -a 'src=/root/test/dir02.tar.gz  dest=/root/test/ copy=yes' #把当前主机的/root/test/dir02.tar.gz 文件复制到test-web（192.168.1.39）并且对dir02.tar.gz进行解包

```

#### 8.copy模块

```bash
ansible test-web -m copy -a "src=/root/test/1.txt dest=/root/test owner=klxx mode=750 backup=yes group=klxx" #backup=yes先备份后覆盖,把ansible主机上的文件复制到远程主机上
```

#### 9.fetch模块

```bash
ansible test-web -m fetch -a "src=/root/test/2.txt dest=/root/test/" #把远程的文件拷贝到ansible主机上,只能提取文件，不支持目录。这个例子执行后会ansible 主机上在目录/root/test/192.168.1.39/root/test下有一个2.txt
```

#### 10.user模块

```bash
 ansible test-web -m user -a "name=joan  system=yes  groups=root,klxx shell=/bin/bash/ home=/home/joan/ state=present" #创建用户
 
 ansible test-web -a "cat /etc/shadow" #查看用户创建情况
 改变文件所属组，改变文件所属用户
 chown root joan #改变文件所有者
 chgrp root joan #改变文件的所属组
```

#### 11.group模块

```bash
ansible test-web -m group -a "name=joan gid=888"
```



#### 12.cron模块

```bash
ansible test-web -m cron -a "backup=yes name='excute job' state=present hour=1 minute=1 job=1.sh" #创建定时任务
#查看定时任务
ansible test-web -a "crontab -l" 
#结果：
    [root@ansible ~]# ansible test-web -a "crontab -l"
    [WARNING]: Invalid characters were found in group names but not replace	d, use -vvvv to see details
    192.168.1.39 | CHANGED | rc=0 >>
    #Ansible: ntpupdate
    */30 * * * * /usr/sbin/ntpdate -u ntp.aliyun.com
    #Ansible: None
    1 1 * * * echo test
    #Ansible: excute job
    1 1 * * * 1.sh
#删除
ansible test-web -m cron -a "name='excute delete' state=absent"
```

![image-20210607131528442](D:\技术文档\ansible\image-20210607131528442.png)

#### 13.yum模块

```bash
ansible test-web -m yum -a "name=httpd state=present" #安装,只能用于centos系列，不支持debian和unbunt
ansible test-web -m yum -a "name=httpd state=absent"  #卸载
```



#### 14.service模块

用于管理服务，包含启动，停止，查看服务状态等

```bash
ansible test-web -a "ss -ntl"
#结果：
    State     Recv-Q    Send-Q       Local Address:Port        Peer Address:Port    
    LISTEN    0         128                0.0.0.0:22               0.0.0.0:*       
    LISTEN    0         128              127.0.0.1:6010             0.0.0.0:*       
    LISTEN    0         32768                    *:8088                   *:*
    
ansible test-web -m service -a "name=httpd state=started" #启动httpd
ansible test-web -m service -a "name=httpd state=stopped" #停止httpd
```

#### 15.lineinfile模块

用于查找文本，替换文本操作，一般用于行操作，如果是具体找某个字符的话，需要使用replace，而不是使用lineinfile

```bash

ansible test-web -m lineinfile -a "name=/root/test/1.txt regexp='^password=' line='password=mima123'" #查找test-web远程主机下的1.txt中以password开头的字符，并且替换成‘password=mima123’

# backrefs=yes #没有匹配不做添加行数据，匹配到了就直接替换最后一个,no是指要累加到最后一行，把line中的值填充进去

```

![image-20210607200419665](D:\技术文档\ansible\image-20210607200419665.png)

#### 16.block模块

​      可以使用”block”关键字将多个任务整合成一个”块”，这个”块”将被当做一个整体，我们可以对这个”块”添加判断条件，当条件成立时，则执行这个块中的所有任务when与block齐平，when的条件成立，才执行block的内容

```yaml
---
- hosts: test-web
  remote_user: root
  tasks:
  - debug:
      msg: "task1 not in block"
  - block:
      - debug:
          msg: "task2 in block1"
      - debug:
          msg: "task3 in block1"
    when: 2 > 1
    
    
    #当rescue执行失败后执行的内容。
    ---
- hosts: test70
  remote_user: root
  tasks:
  - block:
      - shell: 'ls /ooo'
    rescue:
      - debug:
          msg: 'I caught an error'
          
    always:
       - debug：
          mgs: 'I always run this task'
```



# 4.0 playbook剧本

#### 4.1.0 playbook核心元素介绍

- Hosts执行的远程主机列表 --》/etc/ansible/hosts文件
- Tasks 任务集 -》这些主机要做什么，一个个task，而task中又用到了ansible的各种模块
- Variables 内转子变量或自动以变量在playbook中调用
- Handlers 和notify 结合使用，由特定条件触发的操作，满足特定条件才执行，否则不执行，类似于数据库的触发器。
- Templates模板，可以替换模板文件中的变量并实现一些简单的逻辑的文件
- tags 标签，给指定某条任务执行起标签，后续用于使用标签进行组合。



##### 4.1.1 host组件

```bash
one.example.com
one.example.com:two.example.com
192.168.1.50
192.168.1.50
192.168.1.*
websrvs:dbsrvs #或者，两个组的并集
websrvs:&dbsrvs #与，两个组的交集
websrvs:!phoenix #在websrves组，但不在dbservs组

```

案例：

```yaml
- hosts:
    websrvs:
      appsrvs
```

##### 4.1.2 remote_user组件

在远程主机上使用什么身份执行，可以通过remote_user组件进行配置，可以使用

```yaml
- hosts: websrvs
  remote_user: root
  tasks:
   - name: test connection
     ping:
     remote_user: joan
     sudo: yes
     sudo_user: joan
```

##### 4.1.3 task列表和action组件

 module: arguments 建议使用.command和shell命令例外，直接用命令，不是键值对的

例如：

```yaml
---
- hosts: websrvrs
  remote_user: root
  tasks:
    - name: install httpd
      yum: name=httpd
    - name: start httpd
      service: name=httd state=started enabled=yes
```

##### 4.1.4案例

将以下脚本保存成httpd.yml

```yaml
---
- hosts: websrvs
   remote_user: joan
   tasks:
     - name: install httpd
       yum: name=httpd state=present
     - name: copy /tmp/httpd.conf文件到/etc/httpd/conf/httpd.conf
       copy: src=/tmp/httpd.conf dest=/etc/httpd/conf/httpd.conf backup=yes group=joan user=joan
     - name: copy /tmp/vhost.conf file to /etc/httpd/conf.d/
       copy: src=/tmp/vhost.conf  dest=/etc/httpd/conf.d
     - name: use service module start httpd
       service: name=httpd state=started enabled=yes
```

![image-20210607232215833](D:\技术文档\ansible\image-20210607232215833.png)

#### 4.2. 0 playbook运行

```
ansible-playbook <filename.yml> ... [options]
```

常见的选项：

```bash
-c --check #只检测可能会发生的改变，但不会真正执行操作
--list-hosts #获取所有主机列表
--list-tags #获取所有标签列表
--list-tasks #获取所有的task列表
--limit 主机列表  #只针对主机列表中的进行执行
-v -vv -vvv #显示过程
```

范例：

```bash
ansible-playbook httpd.yml --check
ansible-playbook httpd.yml 
```

#### 4.3.0 playbook创建mysql用户

```yaml
---
- hosts: test-web
  remote_user: root

  tasks:
    - name: create mysql user
      group: name=mysql system=yes gid=306
    - name: create user
      user: name=mysql system=yes shell=/bin/bash group=mysql uid=306 home=/data/mysql create_home=no

```

查看远程主机上的结果

```bash
cat /etc/group  #查看用户组
# mysql:x:306:
cat /etc/passwd #查看用户
# mysql:x:306:306::/data/mysql:/sbin/nologin

```

### 4.4.0变量的来源

#### 4.4.1命令中执行

​     此方式后续用于获取从jenkins传入参数时可以使用

```bash
---
- hosts: local
  remote_user: root

  tasks:
    - name: test is shell
      shell: touch /data/ansible/{{filename}}.txt
#执行命令：ansible-playbook -e filename=vars.txt vars.yml

#多个参数用逗号隔开
```

![image-20210622124248582](D:\技术文档\ansible\image-20210622124248582.png)

### 4.4.2从单文件中传入参数

```bash
---
- hosts: local
  remote_user: root
  gather_facts: no
  vars:
    username: test3
    groupname: group3

  tasks:
    - name: add user {{username}}
      user: name={{username}}  state=present shell=/sbin/nologin system=yes comment='this is a test user'
    - name: add group {{groupname}}
      group: name={{groupname}} state=present system=yes non_unique=no
      notify:
        - remove user
        - remove group

  handlers:
     - name: remove user
       user: name={{username}} state=absent remove=yes
     - name: remove group
       group: name={{groupname}} state=absent
#此处要注意的是，如果已经创建的，那么脚本在触发notify的时候将不会被执行，因为group下面有这个用户名了，所以不会执行到notify，如果想每次执行，需要用另一个-name去验证，要注意，notify不是一个模块，所以一定要在某个模块下面去加notify才会被执行到
- name: remove user and group
      shell: echo "test"
      notify:
        - remove user
        - remove group


```

![image-20210622133825575](D:\技术文档\ansible\image-20210622133825575.png)



# 5.0 Roles角色

roles角色，一个基本中包含了各种各样的角色，只有把这些角色片段组合起来才能成为一个剧本。

5.1.0 实践

```
tree erp_e2e
├── defaults
├── files
│   └── requirements.txt
└── tasks
    ├── erp_e2e.yml
    ├── main.yml
    └── run.yml   
```

```bash
#erp_e2e.yml文件
- name: copy requriements to roles files 
  copy: src=/data/.jenkins/workspace/erp_e2e/requirements.txt dest=/data/ansible/roles/erp_e2e/files
#run.yml文件
- name: install requirement
  shell: pip install -r /data/ansible/roles/erp_e2e/files/requirements.txt

- name: run automation script
  shell: chdir=/data/.jenkins/workspace/erp_e2e python main.py erp {{env}}

- name: install requirements
  shell: pip install -r /data/ansible/roles/erp_e2e/files/requirements.txt
- name: verify python
  shell: python
- name: import flask
  shell: import flask
- name: install beauful report
  shell: git clone http://codechina.csdn.net/mirrors/TesterlifeRaymond/BeautifulReport.git
- name: clone beautiful report to env 
  shell: mv /root/BeautifulReport /data/env/python/erp_e2e_env/lib/python3.6/site-packages/
- name: run automation script
  shell: python /data/.jenkins/workspace/erp_e2e/main.py 
  
  #main文件
  - include: erp_e2e.yml
  
  
  
  #erp_e2e_main.yml  最终要执行的文件
  ---
    - hosts: local
      remote_user: root
      gather_facts: no

      roles: 
         - erp_e2e

```



# Typora常用快捷键

```shell
Typora快捷键整合
Ctrl+1  #一阶标题      
Ctrl+B  #字体加粗 
Ctrl+2  #二阶标题    
Ctrl+I  #字体倾斜 
Ctrl+3  #三阶标题    
Ctrl+U  #下划线 
Ctrl+4  #四阶标题    
Ctrl+Home   #返回Typora顶部 
Ctrl+5  #五阶标题    
Ctrl+End    #返回Typora底部 
Ctrl+6  #六阶标题    
Ctrl+T  #创建表格 
Ctrl+L  #选中某句话   
Ctrl+K  #创建超链接 
Ctrl+D  #选中某个单词  
Ctrl+F  #搜索 
Ctrl+E  #选中相同格式的文字   
Ctrl+H  #搜索并替换 
Alt+Shift+5 #删除线 
Ctrl+Shift+I    #插入图片 
Ctrl+Shift+M    #公式块
Ctrl+Shift+Q    #引用 注：一些实体符号需要在实体符号之前加”\”才能够显示 

```







i