"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 为什么不用相对路径
 * 深目录下使用betterRequire，路径错了
 * @param {*} absolutePath 绝对路径
 */
const betterRequire = exports.betterRequire = absolutePath => {
    const module = require(absolutePath);
    if (module.default) {
        return module.default;
    }
    return module;
};