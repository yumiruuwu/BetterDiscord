import {ipcRenderer as IPC} from "electron";
import * as IPCEvents from "common/constants/ipcevents";
// import NodeEvents from "events";

// const cloneObject = function (target, newObject = {}, keys) {
//     if (!Array.isArray(keys)) keys = Object.keys(Object.getOwnPropertyDescriptors(target));
//     return keys.reduce((clone, key) => {
//         if (typeof(target[key]) === "object" && !Array.isArray(target[key]) && target[key] !== null && !(target[key] instanceof NodeEvents)) clone[key] = cloneObject(target[key], {});
//         else clone[key] = target[key];

//         return clone;
//     }, newObject);
// };

// /* global window:false */
// window.require = __non_webpack_require__;
// // const context = electron.webFrame.top.context;
// Object.defineProperty(window, "webpackJsonp", {
//     get: () => electron.webFrame.top.context.webpackJsonp
// });

// electron.webFrame.top.context.global = electron.webFrame.top.context;
// electron.webFrame.top.context.require = require;
// electron.webFrame.top.context.Buffer = Buffer;

// if (process.platform === "darwin" && process.env.DISCORD_RELEASE_CHANNEL !== "canary") {
//     electron.webFrame.top.context.process = process;
// }
// else {
//     electron.webFrame.top.context.process = new class PatchedProcess extends NodeEvents {
//         get __ORIGINAL_PROCESS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED__() {return process;}

//         constructor() {
//             super();

//             Object.assign(this,
//                 cloneObject(process, {}, Object.keys(NodeEvents.prototype)),
//                 cloneObject(process, {})
//             );
//         }
//     };
// }

// Load Discord's original preload
const preload = process.env.DISCORD_PRELOAD;
if (preload) {

    // Restore original preload for future windows
    IPC.send(IPCEvents.REGISTER_PRELOAD, preload);
    // Run original preload
    try {
        const originalKill = process.kill;
        process.kill = function() {};
        __non_webpack_require__(preload);
        process.kill = originalKill;
    }
    catch (e) {
        // TODO bail out
    }
}