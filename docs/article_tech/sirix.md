# sirix

## 运行环境

linux- centOS 7

安装 docker

安装 git

```
yum -y install git
```

docker-compose

```
yum -y install epel-release
yum -y install python-pip
pip install --upgrade pip
pip install docker-compose
```

## 后端服务开启

```
service docker restart
docker run -d --name keycloak -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -e KEYCLOAK_LOGLEVEL=DEBUG jboss/keycloak
```
