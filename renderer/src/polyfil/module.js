import Logger from "common/logger";
import {compileFunction} from "./vm";

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
    static _load(mod) {
        if (!BetterDiscord.FileManager.exists(mod)) throw new Error(`Cannot find module ${mod}`);
        if (window.require.cache[mod]) return window.require.cache[mod].exports;
        
        const loader = RequireExtensions[BetterDiscord.PathModule.extname(mod)];
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
        wrapped(window.require, this, this.exports, this.filename, this.path, window);
    }
};

const internalModule = new Module(".", null);