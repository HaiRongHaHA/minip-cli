"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require("path");

var _common = require("./utils/common");

// 中间模块协调
/**
 *
 * @param {*} action install操作
 * @param {*} args  传入的参数
 */
const apply = async (action, ...args) => {
    try {
        await (0, _common.betterRequire)((0, _path.resolve)(__dirname, `./${action}.js`))(...args);
    } catch (e) {
        console.log(e);
    }
};

exports.default = apply;