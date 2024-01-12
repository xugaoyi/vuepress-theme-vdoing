const isWin = process.platform === 'win32';

// 如果是 windows 平台
if (isWin) {
  const {dev: devScriptStr, build: buildScriptStr} = require('../package.json').scripts
  const args = process.argv.slice(2)
  const scriptType = args[0]
  const fRed = "\x1b[31m"

  const warnFn = (type) => {
    console.log(fRed,
      `\n[vdoing] 提示：由于您使用的是 windows 系统，请使用 ${type}:win 运行，否则运行失败。 \n`
    )
    process.exit(1)
  }

  // 当前运行的是dev脚本 且 脚本前端是'export'
  if (scriptType === 'dev' && devScriptStr.startsWith('export')) {
    warnFn('dev')
  }

  // 当前运行的是build脚本 且 脚本前端是'export'
  if (scriptType === 'build' && buildScriptStr.startsWith('export')) {
    warnFn('build')
  }
}