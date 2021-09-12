export const readFile = createListener("readFile");
export const readFileSync = createSyncListener("readFile");

export const writeFile = createListener("writeFile");
export const writeFileSync = createSyncListener("writeFile");

export const readdir = createListener("readDirectory");
export const readdirSync = createSyncListener("readDirectory");

export const mkdir = createListener("createDirectory");
export const mkdirSync = createSyncListener("createDirectory");

export const rmdir = createListener("deleteDirectory");
export const rmdirSync = createSyncListener("deleteDirectory");

export const exists = createListener("exists");
export const existsSync = createSyncListener("exists");

export const stat = createListener("getStats");
export const statSync = createSyncListener("getStats");
export const lstat = stat;
export const lstatSync = statSync;

export const rename = createListener("rename");
export const renameSync = createSyncListener("rename");

export const realpath = createListener("getRealPath");
export const realpathSync = createSyncListener("getRealPath");
export const watch = createSyncListener("watch");

function createListener(functionName) {
    return function(...args) {
        const callback = args.pop();
        const returnValue = BetterDiscord.FileManager[functionName](...args);

        if (returnValue.error)
            callback(returnValue.error);
        else
            callback(null, returnValue.value);
    };
}

function createSyncListener(functionName) {
    return function(...args) {
        const returnValue = BetterDiscord.FileManager[functionName](...args);
        
        if (returnValue?.error) throw new Error(returnValue.error);
        return returnValue?.value;
    };
}

export default {
    readFile,
    exists,
    existsSync,
    lstat,
    lstatSync,
    mkdir,
    mkdirSync,
    readFileSync,
    readdir,
    readdirSync,
    realpath,
    realpathSync,
    rename,
    renameSync,
    rmdir,
    rmdirSync,
    watch,
    writeFile,
    writeFileSync
};
