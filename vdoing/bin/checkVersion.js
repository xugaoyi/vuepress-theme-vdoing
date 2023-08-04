#!/usr/bin/env node

const semver = require('semver');
const chalk = require('chalk');
const requiredVersion = require('../package.json').engines.node;

// check version
if (!semver.satisfies(process.version, requiredVersion)) {
  console.log(chalk.red(
    `\n[vdoing] minimum Node version not met:`
    + `\nYou are using Node ${process.version}, but vdoing `
    + `requires Node ${requiredVersion}.\nPlease upgrade your Node version.\n`
    + `请升级你的 Node 版本到 ${requiredVersion}.\n`
  ))
  process.exit(1)
}
