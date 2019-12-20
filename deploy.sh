#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# deploy to coding
echo 'www.evanblogweb.com\nevanblogweb.com' > CNAME  # 自定义域名
if [ -z "$CODING_TOKEN" ]; then  # -z 字符串 长度为0则为true；$CODING_TOKEN来自于github仓库`Settings/Secrets`设置的私密环境变量
  msg='deploy'
  codingUrl=git@git.dev.tencent.com:xugaoyi/xugaoyi.git
else
  msg='来自github action的自动部署'
  codingUrl=https://xugaoyi:${CODING_TOKEN}@git.dev.tencent.com/xugaoyi/xugaoyi.git
  git config --global user.name "xugaoyi"
  git config --global user.email "894072666@qq.com"
fi
git init
git add -A
git commit -m "${msg}"
git push -f $codingUrl master # 推送到coding

# deploy to github
echo 'b.evanblogweb.com' > CNAME
if [ -z "$GITHUB_TOKEN" ]; then
  githubUrl=git@github.com:xugaoyi/blog.git
else
  githubUrl=https://xugaoyi:${GITHUB_TOKEN}@github.com/xugaoyi/blog.git
fi
git add -A
git commit -m "${msg}"
git push -f $githubUrl master:gh-pages # 推送到github


cd - # 退回开始所在目录
rm -rf docs/.vuepress/dist