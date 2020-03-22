import { resolve } from "path";
import { betterRequire } from "./utils/common";
// 中间模块协调
/**
 *
 * @param {*} action install操作
 * @param {*} args  传入的参数
 */
const apply = async (action, ...args) => {
    try {
        await betterRequire(resolve(__dirname, `./${action}.js`))(...args);
    } catch (e) {
        console.log(e);
    }
};

export default apply;
