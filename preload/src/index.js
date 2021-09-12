import {contextBridge} from "electron";
import * as BdApi from "./modules/api";
import path from "path";
import Module from "module";

Module.globalPaths.push(path.resolve(process.env.DISCORD_APP_PATH, "..", "app.asar", "node_modules"));

contextBridge.exposeInMainWorld("BetterDiscord", BdApi);

import("./modules/loadDiscord.js");

// TODO: Get rid of this, it's only for testing purposes.
window.require = __non_webpack_require__;
window.BetterDiscord = BdApi;