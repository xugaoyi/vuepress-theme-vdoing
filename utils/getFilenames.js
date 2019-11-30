const {readdir, readFile, writeFile} = require('fs')
// const {resolve} = require('path')

// const FOLDERPATH = './docs/article'
const PathsIn = [
  // './docs/web/',
  // './docs/article_self/',
  './docs/web/'
]

function pReadFile(filepath) {
  return new Promise((resolve, reject) => {
    readdir(filepath, (err, files) => {
      let filenames = []
      files.forEach(file => {
        if (file.toLowerCase() === 'readme.md') {
          file = ``
        } else {
          file = file.replace('.md', '')
          file = `${file}`
        }
        filenames.push(file)
      })

      filenames.sort() // 排序
      resolve(filenames)
    })
  })
}

Promise.all([
  pReadFile(PathsIn[0]),
  pReadFile(PathsIn[1]),
  pReadFile(PathsIn[2])
]).then(
  arr => {
    console.log(arr)
    var params = {
      '/web/': arr[0],
      // '/article_self/': arr[1],
      // '/article_tech/': arr[2]
    }
    writeJson(params)
  },
  err => console.log(err)
)

function writeJson(params) {
  //现将json文件读出来
  readFile('./docs/.vuepress/config/sidebar.json', function(err, data) {
    if (err) {
      return console.error(err)
    }
    var person = data.toString() //将二进制的数据转换为字符串

    person = JSON.parse(person) //将字符串转换为json对象
    // person['/article_child/'] = params['/article_child/']
    for (let key in params) {
      person[key] = params[key]
    }
    console.log(person)
    var str = JSON.stringify(person) //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    writeFile('./docs/.vuepress/config/sidebar.json', str, function(err) {
      if (err) {
        console.error(err)
      }
      console.log('----------新增成功-------------')
    })
  })
}
