
const pkg = require("../../package.json");
const axios = require("axios");
// const getSysVersion = require('./setVersion.cjs');
// async function promptForVersion(inquirer,currentVersion) {
// 	const questions = [
// 		{
// 			type: "input",
// 			name: "version",
// 			message: `是否通过接口更改版本号请输入新的版本号 (当前版本是 ${currentVersion}):`,
// 		},
// 	];

// 	const answers = await inquirer.prompt(questions);
// 	return answers.version;
// }
const updateVersionApi = async (newVersion) => {
  console.log(newVersion,'version')
    let host = 'https://test-class-api-online.saasp.vdyoo.com'
    //   if(env === 'prod') host = 'https://classroom-api-online.saasp.vdyoo.com'
      try{
        const config = {
            headers: {
              'token': 'f47ac10b-58cc-4372-a567-0e02b2c3d479', // 示例：设置内容类型为 JSON
            }
          }
        const res = await axios.post(
            `${host}/classroom-slides/manage/system/version/save-or-update`,{
                systemName: 'SLIDE_EDITOR',
                currentVersion: newVersion
            },config)
            console.log(res.data)
            console.log('${host}/classroom-slides/manage/system/version/save-or-update', '%c 🍺 发布版本成功: ', 'font-size:20px;background-color: #465975;color:#fff;', newVersion)
      }catch(err) {
        console.log('%c 🍺 发布版本遇到错误: ', 'font-size:20px;background-color: #465975;color:#fff;', err)
      }
}
// const updateVersion = async (inquirer) => {
//     const currentVersion = await getSysVersion()
//     const promptVersion = await promptForVersion(inquirer,currentVersion)
//     const newVersion = promptVersion.trim()
//     if(newVersion){
//         updateVersionApi(newVersion)
//     }else {
//         const currentVersion = await getSysVersion()
//         console.log('不用更改版本号,当前版本号是',currentVersion)
//     }
// }
// 是否接口更新版本
updateVersionApi(pkg.version)