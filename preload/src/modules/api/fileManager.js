import {ipcRenderer as IPC} from "electron";
import * as IPCEvents from "common/constants/ipcevents";

export function readFile(path, options) {
    return IPC.sendSync(IPCEvents.READ_FILE, path, options);
}

export function writeFile(path, content, options) {
    return IPC.send(IPCEvents.WRITE_FILE, path, content, options);
}

export function readDirectory(path, options) {
    return IPC.sendSync(IPCEvents.READ_DIR, path, options);
}

export function exists(path) {
    return IPC.sendSync(IPCEvents.EXISTS_FILE, path);
}