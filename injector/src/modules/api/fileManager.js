import {ipcMain as IPC} from "electron";
import * as IPCEvents from "common/constants/ipcevents";
import * as fs from "fs";

IPC.on(IPCEvents.READ_FILE, (event, path, options) => {
    event.returnValue = fs.readFileSync(path, options);
});

IPC.on(IPCEvents.READ_DIR, (event, path, options) => {
    event.returnValue = fs.readdirSync(path, options);
});

IPC.on(IPCEvents.WRITE_FILE, (_, path, content, options) => {
    fs.writeFileSync(path, content, options);
});

IPC.on(IPCEvents.EXISTS_FILE, (event, path) => {
    event.returnValue = fs.existsSync(path);
});