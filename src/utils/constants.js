import { name, version } from "./../../package.json";

// 本机的home目录
const HOME = process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];

export const VERSION = version;
export const UA = name;

export const TEMPLATENAME_DEFAULT = "wemp-template";
export const RC = `${HOME}/.wemprc`;

export const DEFAULTS = {
    registry: "HaiRongHaHA",
    type: "users"
};
