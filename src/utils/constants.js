import { name, version } from "./../../package.json";

// 本机的home目录
const HOME = process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];

export const VERSION = version;
export const UA = name;

export const TEMPLATENAME_DEFAULT = "wep-template";
export const RC = `${HOME}/.weprc`;

export const DEFAULTS = {
    registry: "HaiRongHaHA",
    type: "users"
};
