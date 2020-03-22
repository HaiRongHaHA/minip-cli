"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULTS = exports.RC = exports.TEMPLATENAME_DEFAULT = exports.UA = exports.VERSION = undefined;

var _package = require("./../../package.json");

// 本机的home目录
const HOME = process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];

const VERSION = exports.VERSION = _package.version;
const UA = exports.UA = _package.name;

const TEMPLATENAME_DEFAULT = exports.TEMPLATENAME_DEFAULT = "wep-template";
const RC = exports.RC = `${HOME}/.weprc`;

const DEFAULTS = exports.DEFAULTS = {
    registry: "HaiRongHaHA",
    type: "users"
};