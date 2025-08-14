import chalk from 'chalk'
import fs from 'node:fs'

// 获取 commit message 文件路径
const msgPath = process.argv[2]
const msg = fs.readFileSync(msgPath, 'utf-8').trim()

// 支持的类型（大小写均可）
const types = [
  'feat', 'fix', 'style', 'refactor', 'perf', 'chore', 'docs', 'test'
]

// 正则匹配规则
// 例:  ✨ Feat(user): [模块名] #描述内容
const commitRE = new RegExp(
  `^(?:\\p{Emoji_Presentation}\\s*)?(?:${types.join('|')})` + // 类型 (可带 emoji)
  `(\\(.+\\))?` +                                             // 可选作用域
  `[:：]\\s` +                                                // 冒号+空格
  `\\[.+\\]\\s#.{1,50}$`,                                     // [模块名] #描述
  'iu'                                                        // i=大小写不敏感, u=支持emoji
)

// 跳过的 commit
const ignoreRE = /^(Merge|Revert)/i

if (!ignoreRE.test(msg) && !commitRE.test(msg)) {
  console.error(
    `\n  ${chalk.bgRed.white(' ERROR ')} ${chalk.red('不合法的 commit 消息格式')}\n` +
    chalk.red('  请使用正确的提交格式，例如：\n\n') +
    `    ${chalk.green('Feat: [用户管理] #新增批量导入功能')}\n` +
    `    ${chalk.green('fix(login): [登录模块] #修复验证码不显示')}\n` +
    `    ${chalk.green('✨ feat(api): [接口模块] #优化响应速度')}\n`
  )
  process.exit(1)
}
