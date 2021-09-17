import Logger from "common/logger";
import {compileFunction} from "./vm";

const path = BetterDiscord.PathModule;

export const RequireExtensions = {
    ".js": (module, filename) => {
        const fileContent = BetterDiscord.FileManager.readFile(filename, "utf8").value;
        module.fileContent = fileContent;
        module._compile(fileContent);
        return module.exports;
    },
    ".json": (module, filename) => {
        const fileContent = BetterDiscord.FileManager.readFile(filename, "utf8").value;
        module.fileContent = fileContent;
        module.exports = JSON.parse(fileContent);

        return module.exports;
    }
};

export default class Module {
    static resolveMainFile(mod, basePath) {
        const parent = path.extname(basePath) ? path.dirname(basePath) : basePath;
        const files = BetterDiscord.FileManager.readDirectory(parent).value;
        if (!Array.isArray(files)) return null;

        for (const file of files) {
            const ext = path.extname(file);

            if (file === "package.json") {
                const pkg = require(path.resolve(parent, file));
                if (!Reflect.has(pkg, "main")) continue;

                return path.resolve(parent, pkg.main);
            }

            if (path.slice(0, -ext.length) == "index" && RequireExtensions[ext]) return mod;
        }
    }

    static getExtension(mod) {
        return path.extname(mod) || Reflect.ownKeys(RequireExtensions).find(e => BetterDiscord.FileManager.exists(mod + e).value);
    }

    static getFilePath(basePath, mod) {
        if (!path.isAbsolute(mod)) mod = path.resolve(basePath, mod);
        const defaultExtension = path.extname(mod);
        if (!defaultExtension) {
            const ext = Reflect.ownKeys(RequireExtensions).find(ext => BetterDiscord.FileManager.exists(mod + ext).value);
            if (ext) {
                mod = mod + ext;
            }
        }

        return mod;
    }

    static _load(mod, basePath, createRequire) {
        if (!path.isAbsolute(mod)) mod = path.resolve(basePath, mod);
        const filePath = this.getFilePath(basePath, mod);
        if (!BetterDiscord.FileManager.exists(filePath)) throw new Error(`Cannot find module ${mod}`);
        if (window.require.cache[filePath]) return window.require.cache[filePath].exports;
        const {value: stats, error} = BetterDiscord.FileManager.getStats(filePath);
        if (error) console.error({error, filePath});
        if (stats.isDirectory()) mod = this.resolveMainFile(mod, basePath);
        const ext = this.getExtension(filePath);
        let loader = RequireExtensions[ext];

        if (!loader) throw new Error(`Cannot find module ${filePath}`);
        const module = window.require.cache[mod] = new Module(filePath, internalModule, createRequire(mod));
        loader(module, filePath);
        return module.exports;
    }

    static get Module() {return Module;}

    static get createRequire() {Logger.warn("ContextModule", "Module.createRequire not implemented yet.");}

    static get _extensions() {return RequireExtensions;}

    constructor(id, parent, require) {
        this.id = id;
        this.path = BetterDiscord.PathModule.dirname(id);
        this.exports = {};
        this.parent = parent;
        this.filename = id;
        this.loaded = false;
        this.children = [];
        this.require = require;

        if (parent) parent.children.push(this);
    }

    _compile(code) {
        const wrapped = compileFunction(code, ["require", "module", "exports", "__filename", "__dirname", "global"], this.filename);
        wrapped(this.require, this, this.exports, this.filename, this.path, window);
    }
};

const internalModule = new Module(".", null);