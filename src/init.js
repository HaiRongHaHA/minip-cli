import { downloadLocal } from "./utils/git";
import { TEMPLATENAME_DEFAULT } from "./utils/constants";
import ora from "ora";
import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";

const init = async projectName => {
    console.log(projectName, "projectName");

    if (!projectName) {
        //未输入项目名称
        console.log(chalk.red("Please enter your projectName!"));
        process.exit(0);
    }
    if (fs.existsSync(projectName)) {
        //项目已存在
        console.log(chalk.red(`The ${projectName} folder is already exists!`));
        process.exit(0);
    }
    //命令行交互
    inquirer
        .prompt([
            {
                name: "description",
                message: "Please enter the project description: "
            },
            {
                name: "author",
                message: "Please enter the author name: "
            }
        ])
        .then(async answer => {
            //下载模板 选择模板
            //通过配置文件，获取模板信息
            let loading = ora(chalk.blue("downloading template ..."));
            loading.start();
            downloadLocal(TEMPLATENAME_DEFAULT, projectName).then(
                () => {
                    afterdownloaded(projectName, answer);
                    loading.succeed(
                        chalk.green(
                            `Successfully created project ${projectName}\r\n`
                        )
                    );
                    console.log(
                        chalk.blue(
                            ` cd ${projectName} \r\n    npm install \r\n    npm run dev`
                        )
                    );
                },
                err => {
                    loading.fail(chalk.red("Template download failed!\n"));
                    loading.fail(chalk.red(`Failed reason is: ${err}`));
                }
            );
        });
};

const afterdownloaded = (projectName, answer) => {
    const needEditList = {
        packageJson: {
            file: `${projectName}/package.json`,
            bindfn: editPackageJson
        },
        README: {
            file: `${projectName}/README.md`,
            bindfn: editREADME
        }
    };
    for (const key in needEditList) {
        const item = needEditList[key];
        if (fs.existsSync(item.file)) {
            item.bindfn(item.file, projectName, answer);
        }
    }
};

// 修改package.json内的项目名称、项目作者、项目描述属性
const editPackageJson = (fileName, projectName, answer) => {
    const data = fs.readFileSync(fileName).toString();
    let json = JSON.parse(data);
    json.name = projectName;
    json.author = answer.author;
    json.description = answer.description;
    //修改项目文件夹中 package.json 文件
    fs.writeFileSync(fileName, JSON.stringify(json, null, "\t"), "utf-8");
};
// 修改README文件
const editREADME = (fileName, projectName, answer) => {
    let data = fs.readFileSync(fileName).toString();
    data = `# ${projectName}\r\n${answer.description}`;
    fs.writeFileSync(fileName, data, "utf-8");
};

export default init;
