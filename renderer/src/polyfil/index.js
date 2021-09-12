import Module from "./module";
import * as vm from "./vm";
import EventEmitter from "./events";

const require = function (mod) {
    switch (mod) {
        case "request": return BetterDiscord.HttpManager;
        case "fs": return BetterDiscord.FileManager;
        case "path": return BetterDiscord.PathModule;
        case "events": return EventEmitter;
        case "electron": return BetterDiscord.ElectronModule;
        case "vm": return vm;
        case "module": return Module;

        default:
            console.log("Load:", mod);
            return Module._load(mod);
    }
};

require.cache = {};
require.resolve = () => {
    console.warn("Not implemented yet.");
}

window.require = require;

export default require;