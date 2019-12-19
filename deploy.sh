#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 自定义域名
echo 'b.evanblogweb.com' > CNAME

if [ !$GITHUB_TOKEN ]; then
  msg='deploy'
  githubUrl=git@github.com:xugaoyi/evanblog.git
else
  msg='GitHub Action deploy'
  githubUrl=https://xugaoyi:$GITHUB_TOKEN@github.com/xugaoyi/evanblog.git
  echo githubUrl
  git config --global user.name "xugaoyi"
  git config --global user.email "894072666@qq.com"
fi
git init
git add -A
git commit -m $msg
git push -f $githubUrl master:gh-pages # 发布到github

# coding
echo 'evanblogweb.com\nwww.evanblogweb.com' > CNAME
git add -A
if [ !$CODING_TOKEN ]; then
  codingUrl=git@git.dev.tencent.com:xugaoyi/xugaoyi.git
else
  codingUrl=https://xugaoyi:${CODING_TOKEN}@git.dev.tencent.com/xugaoyi/xugaoyi.git
fi
git commit -m $msg
git push -f $codingUrl master # 发布到coding


cd - # 退回开始所在目录
rm -rf docs/.vuepress/dist