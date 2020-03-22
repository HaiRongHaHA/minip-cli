"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAll = undefined;

var _constants = require("./constants");

var _fs = require("mz/fs");

var _ini = require("ini");

const createRc = async () => {
    const has = await (0, _fs.exists)(_constants.RC);
    if (!has) {
        await (0, _fs.writeFile)(_constants.RC, (0, _ini.encode)(_constants.DEFAULTS), "utf-8");
        return true;
    }
    return false;
};

const get = async () => {
    let opts;
    opts = await (0, _fs.readFile)(_constants.RC, "utf8");
    opts = (0, _ini.decode)(opts);
    return opts || {};
};

const getAll = exports.getAll = async () => {
    const exist = await (0, _fs.exists)(_constants.RC);
    if (exist) {
        return await get();
    } else {
        const Rc = await createRc();
        if (Rc) {
            return await get();
        }
    }
};