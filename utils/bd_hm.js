var fs = require('fs')
var baidu = `<script>
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?19a1f669e77c8a8c0bf92f95cca4c782";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      </script>`

function writeJson() {
  //现将json文件读出来
  fs.readFile('./docs/.vuepress/dist/index.html', function(err, data) {
    if (err) {
      return console.error(err)
    }
    var person = data.toString() //将二进制的数据转换为字符串
    var pos = person.indexOf('<meta charset="utf-8">')
    person = person.slice(0, pos) + baidu + person.slice(pos)
    fs.writeFile('./docs/.vuepress/dist/index.html', person, function(err) {
      if (err) {
        console.error(err)
      }
      console.log('----------新增成功-------------')
    })
  })
}
writeJson() //执行一下;
