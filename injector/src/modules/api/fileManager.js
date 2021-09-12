import {ipcMain as IPC} from "electron";
import * as IPCEvents from "common/constants/ipcevents";
import * as fs from "fs";

IPC.on(IPCEvents.READ_FILE, createListener((path, options) => fs.readFileSync(path, options)));
IPC.on(IPCEvents.READ_DIR, createListener((path, options) => fs.readdirSync(path, options)));
IPC.on(IPCEvents.CREATE_DIR, createListener((path, options) => fs.mkdirSync(path, options)));
IPC.handle(IPCEvents.DELETE_DIR, createListener((path, options) => fs.rmdirSync(path, options), true));
IPC.on(IPCEvents.WRITE_FILE, createListener((path, content, options) => fs.writeFileSync(path, content, options)));
IPC.on(IPCEvents.EXISTS_FILE, createListener((path) => fs.existsSync(path)));
IPC.on(IPCEvents.GET_STATS, createListener((path, options) => ({ ...fs.statSync(path, options) })));
IPC.on(IPCEvents.RENAME, createListener((oldPath, newPath) => fs.renameSync(oldPath, newPath)));
IPC.on(IPCEvents.GET_REAL_PATH, createListener((path, options) => fs.realpathSync(path, options)));

function createListener(callback, promise = false) {
    return (event, ...args) => {
        const result = { error: null, value: null };

        try {
            result.value = callback(...args);
        }
        catch (err) {
            console.error(err);

            result.error = err;
        }

        event.returnValue = result;
        if (promise) return Promise.resolve();
    };
}
