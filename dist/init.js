"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _git = require("./utils/git");

var _constants = require("./utils/constants");

var _ora = require("ora");

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const init = async projectName => {
    console.log(projectName, "projectName");

    if (!projectName) {
        //未输入项目名称
        console.log(_chalk2.default.red("Please enter your projectName!"));
        process.exit(0);
    }
    if (_fs2.default.existsSync(projectName)) {
        //项目已存在
        console.log(_chalk2.default.red(`The ${projectName} folder is already exists!`));
        process.exit(0);
    }
    //命令行交互
    _inquirer2.default.prompt([{
        name: "description",
        message: "Please enter the project description: "
    }, {
        name: "author",
        message: "Please enter the author name: "
    }]).then(async answer => {
        //下载模板 选择模板
        //通过配置文件，获取模板信息
        let loading = (0, _ora2.default)(_chalk2.default.blue("downloading template ..."));
        loading.start();
        (0, _git.downloadLocal)(_constants.TEMPLATENAME_DEFAULT, projectName).then(() => {
            afterdownloaded(projectName, answer);
            loading.succeed(_chalk2.default.green(`Successfully created project ${projectName}\r\n`));
            console.log(_chalk2.default.blue(` cd ${projectName} \r\n    npm install \r\n    npm run dev`));
        }, err => {
            loading.fail(_chalk2.default.red("Template download failed!\n"));
            loading.fail(_chalk2.default.red(`Failed reason is: ${err}`));
        });
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
        if (_fs2.default.existsSync(item.file)) {
            item.bindfn(item.file, projectName, answer);
        }
    }
};

// 修改package.json内的项目名称、项目作者、项目描述属性
const editPackageJson = (fileName, projectName, answer) => {
    const data = _fs2.default.readFileSync(fileName).toString();
    let json = JSON.parse(data);
    json.name = projectName;
    json.author = answer.author;
    json.description = answer.description;
    //修改项目文件夹中 package.json 文件
    _fs2.default.writeFileSync(fileName, JSON.stringify(json, null, "\t"), "utf-8");
};
// 修改README文件
const editREADME = (fileName, projectName, answer) => {
    let data = _fs2.default.readFileSync(fileName).toString();
    data = `# ${projectName}\r\n${answer.description}`;
    _fs2.default.writeFileSync(fileName, data, "utf-8");
};

exports.default = init;