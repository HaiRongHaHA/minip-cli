import program from "commander";
import { VERSION } from "./utils/constants";
import apply from "./index";

let actionMap = {
    init: {
        description: "init a new project",
        usages: ["wemp init <project-name>"]
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
    commander
        .command(action)
        .description(actions[action].desc)
        .alias(actions[action].alias)
        .action(async () => {
            const args = process.argv.slice(3);
            switch (action) {
                case "init":
                    await apply(action, ...args);
                    break;
                default:
                    break;
            }
        });
    return commander;
}

Object.keys(actionMap).map(
    action => registerAction(action, program, actionMap),
    program
);

program.usage("<command> [options]");
program.on("-h", help);
program.on("--help", help);
program.version(VERSION, "-v, --version").parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
