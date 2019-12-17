#!/usr/bin/env sh
set -e

cd docs/.vuepress/dist

echo 'evanblogweb.com\nwww.evanblogweb.com' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f git@git.dev.tencent.com:xugaoyi/xugaoyi.git master
cd -