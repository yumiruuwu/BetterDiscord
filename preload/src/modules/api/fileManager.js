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

const FileStatProperties = {
    DEFAULT: 61440,
    DIRECTORY: 16384,
    FILE: 32768
};

export function getStats(path, options) {
    const stats = IPC.sendSync(IPCEvents.GET_STATS, path, options);
    
    function _checkModeProperty(property) {
        return (BigInt(stats.mode) & BigInt(FileStatProperties.DEFAULT)) === BigInt(property);
    }
    
    return {
        ...stats,
        _checkModeProperty,
        isDirectory() {
            return _checkModeProperty(FileStatProperties.DIRECTORY);
        },
        isFile() {
            return _checkModeProperty(FileStatProperties.FILE);
        }
    };
}