import {contextBridge} from "electron";

import newProcess from "./modules/process";

import * as BdApi from "./modules/api";


contextBridge.exposeInMainWorld("BetterDiscord", BdApi);
contextBridge.exposeInMainWorld("process", newProcess);

import("./modules/loadDiscord.js");

// TODO: Get rid of this, it's only for testing purposes.
window.require = __non_webpack_require__;
window.BetterDiscord = BdApi;