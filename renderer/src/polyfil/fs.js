export function readFile(path, options, callback) {
    try {
        const returnValue = BetterDiscord.FileManager.readFile(path, options);
        
        callback(null, returnValue);
    }
    catch (err) {
        callback(err);
    }
}

export function readFileSync(path, options) {
    return BetterDiscord.FileManager.readFile(path, options);
}

export function writeFile(path, content, options, callback) {
    try {
        const returnValue = BetterDiscord.FileManager.writeFile(path, content, options);
        
        callback(null, returnValue);
    }
    catch (err) {
        callback(err);
    }
}

export function writeFileSync(path, content, options) {
    return BetterDiscord.FileManager.writeFile(path, content, options);
}

export function readdir(path, options, callback) {
    try {
        const returnValue = BetterDiscord.FileManager.readDirectory(path, options);
        
        callback(null, returnValue);
    }
    catch (err) {
        callback(err);
    }
}

export function readdirSync(path, options) {
    return BetterDiscord.FileManager.readDirectory(path, options);
}

export function exists(path, callback) {
    try {
        const returnValue = BetterDiscord.FileManager.exists(path);
        
        callback(null, returnValue);
    }
    catch (err) {
        callback(err);
    }
}

export function existsSync(path) {
    return BetterDiscord.FileManager.exists(path);
}

export function stat(path, options, callback) {
    try {
        const returnValue = BetterDiscord.FileManager.getStats(path, options);
        
        callback(null, returnValue);
    }
    catch (err) {
        callback(err);
    }
}

export function statSync(path, options) {
    return BetterDiscord.FileManager.getStats(path, options);
}