import Logger from "common/logger";
import {compileFunction} from "./vm";

export const RequireExtensions = {
    ".js": (module, filename) => {
        const fileContent = BetterDiscord.FileManager.readFile(filename, "utf8");
        const mod = new Module(filename, module);
        module.children.push(mod);
        window.require.cache[filename] = mod._compile(fileContent);
        return mod.exports;
    },
    ".json": (module, filename) => {
        const fileContent = BetterDiscord.FileManager.readFile(filename, "utf8");
        const mod = new Module(filename, module);
        module.children.push(mod);
        window.require.cache[filename] = mod;
        mod.exports = JSON.parse(fileContent);

        return mod;
    }
};

export default class Module {
    static _load(mod) {
        if (!BetterDiscord.FileManager.exists(mod)) throw new Error(`Cannot find module ${mod}`);

        const loader = RequireExtensions["." + BetterDiscord.PathModule.extname(mod)];
        if (!loader) throw new Error(`Cannot find module ${mod}`);

        return loader(internalModule, mod);
    }

    static get Module() {return Module;}

    static get createRequire() {Logger.warn("ContextModule", "Module.createRequire not implemented yet.");}

    static get extensions() {return RequireExtensions;}

    constructor(id, parent) {
        this.id = id;
        this.path = BetterDiscord.PathModule.dirname(id);
        this.exports = {};
        this.parent = parent;
        this.filename = id;
        this.loaded = false;
        this.children = [];
    }

    _compile(code) {
        const wrapped = compileFunction(code, ["require", "module", "exports", "__filename", "__dirname"], this.filename);
        
        return wrapped(window.require, this, this.exports, this.filename, this);
    }
};

const internalModule = new Module(".", null);