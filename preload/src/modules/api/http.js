import {ipcRenderer as IPC} from "electron";
import * as IPCEvents from "common/constants/ipcevents";

export async function get(url, callback) {
    IPC.invoke(IPCEvents.REQUEST, "get", url).then(([error, res, body]) => {
        callback(error, res, body);
    });
}