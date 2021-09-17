import Module from "./module";
import * as vm from "./vm";
import * as fs from "./fs";
import EventEmitter from "common/events";
import * as https from "./https";

export const createRequire = function (path) {
    return mod => {
        switch (mod) {
            case "request": return Object.assign((...args) => BetterDiscord.HttpManager.get(...args), {get: BetterDiscord.HttpManager.get});
            case "https": return https;
            case "original-fs":
            case "fs": return fs;
            case "path": return BetterDiscord.PathModule;
            case "events": return EventEmitter;
            case "electron": return BetterDiscord.ElectronModule;
            case "vm": return vm;
            case "module": return Module;
            case "crypto": return;
    
            default:
                return Module._load(mod, path, createRequire);
        }
    };
};

const require = window.require = createRequire(".");
require.cache = {};
require.resolve = (path) => {
    for (const key of Object.keys(require.cache)) {
        if (key.startsWith(path)) return require.cache[key];
    }
}

window.Buffer = BetterDiscord.Buffer;

export default require;