import { RC, DEFAULTS } from "./constants";
import { writeFile, readFile, exists } from "mz/fs";
import { decode, encode } from "ini";

const createRc = async () => {
    const has = await exists(RC);
    if (!has) {
        await writeFile(RC, encode(DEFAULTS), "utf-8");
        return true;
    }
    return false;
};

const get = async () => {
    let opts;
    opts = await readFile(RC, "utf8");
    opts = decode(opts);
    return opts || {};
};

export const getAll = async () => {
    const exist = await exists(RC);
    if (exist) {
        return await get();
    } else {
        const Rc = await createRc();
        if (Rc) {
            return await get();
        }
    }
};
