export const readFileSync = function (path, options = "utf8") {
    const result = BetterDiscord.FileManager.readFile(path, options);
    if (result.error) throw result.error;
    return result.value;
};

export const readFile = function (path, options = "utf8", callback) {
    const result = BetterDiscord.FileManager.readFile(path, options);
    callback(result.error, result.value);
};

export const writeFile = function (path, data, options = "utf8", callback) {
    const result = BetterDiscord.FileManager.writeFile(path, data, options);
    callback();
};

export const writeFileSync = function (path, data, options = "utf8") {
    BetterDiscord.FileManager.writeFile(path, data, options);
};

export const readdir = function (path, options, callback) {
    const result = BetterDiscord.FileManager.readDirectory(path, options);
    callback(result.error, result.value);
};

export const readdirSync = function (path, options) {
    const result = BetterDiscord.FileManager.readDirectory(path, options);
    if (result.error) throw result.error;
    return result.value;
};

export const mkdir = function (path, options, callback) {
    const result = BetterDiscord.FileManager.createDirectory(path, options);
    callback(result.error);
};

export const mkdirSync = function (path, options) {
    const result = BetterDiscord.FileManager.createDirectory(path, options);
    if (result.error) throw result.error;
};

export const rmdir = function (path, options, callback) {
    const result = BetterDiscord.FileManager.deleteDirectory(path, options);
    callback(result.error);
};

export const rmdirSync = function (path, options) {
    const result = BetterDiscord.FileManager.deleteDirectory(path, options);
    if (result.error) throw result.error;
};

export const exists = function (path, options, callback) {
    const result = BetterDiscord.FileManager.exists(path, options);
    callback(result.error, result.value);
};

export const existsSync = function (path, options) {
    const result = BetterDiscord.FileManager.exists(path, options);
    if (result.error) throw result.error;
    return result.value;
};

export const stat = function (path, options, callback) {
    const result = BetterDiscord.FileManager.getStats(path, options);
    callback(result.error, result.value);
};

export const statSync = function (path, options) {
    const result = BetterDiscord.FileManager.getStats(path, options);
    if (result.error) throw result.error;
    return result.value;
};

export const lstat = stat;
export const lstatSync = statSync;

export const rename = function (oldPath, newPath, options, callback) {
    const result = BetterDiscord.FileManager.rename(oldPath, newPath, options);
    callback(result.error, result.value);
};

export const renameSync = function (oldPath, newPath, options) {
    const result = BetterDiscord.FileManager.renameSync(oldPath, newPath, options);
    if (result.error) throw result.error;
    return result.value;
};

export const realpath = function (path, options, callback) {
    const result = BetterDiscord.FileManager.getStats(path, options);
    callback(result.error, result.value);
};

export const realpathSync = function (path, options) {
    const result = BetterDiscord.FileManager.getRealPath(path, options);
    if (result.error) throw result.error;
    return result.value; 
};


export const watch = createSyncListener("watch");

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
