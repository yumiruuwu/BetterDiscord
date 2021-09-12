import {ipcRenderer as IPC} from "electron";
import * as IPCEvents from "common/constants/ipcevents";

export async function get(url, options, callback) {
    if (typeof (options) === "function") {
        callback = options;
        options = null;
    }

    IPC.invoke(IPCEvents.REQUEST, "get", url, options).then(([error, res, body]) => {
        callback(error, res, body);
    });
}