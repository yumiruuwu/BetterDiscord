import {ipcRenderer as IPC, shell} from "electron";
// import * as IPCEvents from "common/constants/ipcevents";

export const ipcRenderer = {
    send: IPC.send.bind(IPC),
    sendToHost: IPC.sendToHost.bind(IPC),
    sendTo: IPC.sendTo.bind(IPC),
    sendSync: IPC.sendSync.bind(IPC),
    invoke: IPC.invoke.bind(IPC),
    on: IPC.on.bind(IPC),
    off: IPC.off.bind(IPC)
};

export {shell};