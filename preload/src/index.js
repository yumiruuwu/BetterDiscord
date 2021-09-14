import {contextBridge} from "electron";

console.log({
    Module,
    globalPaths: Module.globalPaths.length,
    request: import("request")
});
import newProcess from "./modules/process";
import Module from "module";

import * as BdApi from "./modules/api";


contextBridge.exposeInMainWorld("BetterDiscord", BdApi);
contextBridge.exposeInMainWorld("process", newProcess);

import("./modules/loadDiscord.js");

// TODO: Get rid of this, it's only for testing purposes.
window.require = __non_webpack_require__;
window.BetterDiscord = BdApi;