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
        const parent = path.dirname(basePath);
        const files = BetterDiscord.FileManager.readDirectory(parent).value;
        if (!Array.isArray(files)) return null;

        for (const file of files) {
            const ext = path.extname(file);

            if (file === "package.json") {
                const pkg = require(path.resolve(parent, file));
                if (!Reflect.has(pkg, "main")) continue;

                return path.resolve(parent, pkg.main);
            }

            if (path.slice(0, -ext.length) == "index") {
                if (RequireExtensions[ext]) return mod;
            }
        }
    }

    static _load(mod, basePath) {
        // if (!path.isAbsolute(mod)) mod = path.resolve(basePath, mod);
        if (!BetterDiscord.FileManager.exists(mod)) throw new Error(`Cannot find module ${mod}`);
        if (window.require.cache[mod]) return window.require.cache[mod].exports;
        // const stats = BetterDiscord.FileManager.getStats(mod).value;
        // if (stats.isDirectory()) mod = this.resolveMainFile(mod, basePath);

        let loader = RequireExtensions[path.extname(mod)];

        if (!loader) throw new Error(`Cannot find module ${mod}`);
        const module = window.require.cache[mod] = new Module(mod, internalModule);
        loader(module, mod);
        return module.exports;
    }

    static get Module() {return Module;}

    static get createRequire() {Logger.warn("ContextModule", "Module.createRequire not implemented yet.");}

    static get _extensions() {return RequireExtensions;}

    constructor(id, parent) {
        this.id = id;
        this.path = BetterDiscord.PathModule.dirname(id);
        this.exports = {};
        this.parent = parent;
        this.filename = id;
        this.loaded = false;
        this.children = [];

        if (parent) parent.children.push(this);
    }

    _compile(code) {
        const wrapped = compileFunction(code, ["require", "module", "exports", "__filename", "__dirname", "global"], this.filename);
        wrapped(window.require.bind(this.path), this, this.exports, this.filename, this.path, window);
    }
};

const internalModule = new Module(".", null);