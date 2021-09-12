import {ipcRenderer as IPC, shell} from "electron";
// import * as IPCEvents from "common/constants/ipcevents";

export const ipcRenderer = {
    send: IPC.send,
    sendToHost: IPC.sendToHost,
    sendTo: IPC.sendTo,
    sendSync: IPC.sendSync,
    on: IPC.on,
    off: IPC.off
};

export {shell};