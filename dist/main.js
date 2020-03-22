"use strict";

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

var _constants = require("./utils/constants");

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let actionMap = {
    init: {
        description: "init a new project",
        usages: ["wep init <project-name>"]
    },
    "*": {
        desc: "The command is not found",
        alias: "",
        usages: []
    }
};

function help() {
    console.log("\r\nhow to use:");
    Object.keys(actionMap).forEach(action => {
        actionMap[action].usages.forEach(usage => {
            console.log("  - " + usage);
        });
    });
    console.log("\r");
}

function registerAction(action, commander, actions) {
    commander.command(action).description(actions[action].desc).alias(actions[action].alias).action(async () => {
        const args = process.argv.slice(3);
        switch (action) {
            case "init":
                await (0, _index2.default)(action, ...args);
                break;
            default:
                break;
        }
    });
    return commander;
}

Object.keys(actionMap).map(action => registerAction(action, _commander2.default, actionMap), _commander2.default);

_commander2.default.usage("<command> [options]");
_commander2.default.on("-h", help);
_commander2.default.on("--help", help);
_commander2.default.version(_constants.VERSION, "-v, --version").parse(process.argv);

if (!process.argv.slice(2).length) {
    _commander2.default.outputHelp();
}