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
IPC.on(IPCEvents.WATCH_DIR, createListener((event, path, options = {}, watcherId) => {
    const id = IPCEvents.WATCH_DIR + "-" + watcherId;

    const callback = (...args) => {
        event.sender.webContents.send(id, ...args);
    };

    const handleClose = () => {
        watcher.close();
        IPC.off(id + "-close", handleClose);
    }

    const watcher = fs.watch(path, options, callback);

    IPC.on(id + "-close", handleClose);
}, false, true));

function createListener(callback, promise = false, includeEvent = false) {
    return (event, ...args) => {
        const result = { error: null, value: null };

        if (includeEvent) args.unshift(event);

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
