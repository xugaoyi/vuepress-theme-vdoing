#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# deploy to github pages
echo 'https://github.com/lsq4590578/vuepress-theme-vdoing' > CNAME

if [ -z "$GITHUB_TOKEN" ]; then
  msg='deploy'
  githubUrl=git@github.com:lsq4590578/vuepress-theme-vdoing.git
else
  msg='来自github actions的自动部署'
  githubUrl=https://lsq4590578:${GITHUB_TOKEN}/lsq4590578/vuepress-theme-vdoing.git
  git config --global user.name "lsq4590578"
  git config --global user.email "lsq_4590578@126.com"
fi
git init
git add -A
git commit -m "${msg}"
git push -f $githubUrl master:lsqiong # 推送到github lsqiong分支

# deploy to coding pages
# echo 'www.xugaoyi.com\nxugaoyi.com' > CNAME  # 自定义域名
# echo 'google.com, pub-7828333725993554, DIRECT, f08c47fec0942fa0' > ads.txt # 谷歌广告相关文件

# if [ -z "$CODING_TOKEN" ]; then  # -z 字符串 长度为0则为true；$CODING_TOKEN来自于github仓库`Settings/Secrets`设置的私密环境变量
#   codingUrl=git@e.coding.net:xgy/xgy.git
# else
#   codingUrl=https://HmuzsGrGQX:${CODING_TOKEN}@e.coding.net/xgy/xgy.git
# fi
# git add -A
# git commit -m "${msg}"
# git push -f $codingUrl master # 推送到coding

cd -
#rm -rf docs/.vuepress/dist
