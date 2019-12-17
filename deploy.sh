#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'b.evanblogweb.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# 发布到github
git push -f git@github.com:xugaoyi/evanblog.git master:gh-pages

# coding
echo 'evanblogweb.com\nwww.evanblogweb.com' > CNAME
git add -A
git commit -m 'deploy'
git push -f git@git.dev.tencent.com:xugaoyi/xugaoyi.git master # 发布到coding.net


cd - # 退回开始所在目录
rm -rf docs/.vuepress/dist