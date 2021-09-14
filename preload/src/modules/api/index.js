import path from "path";
import Module from "module";

Module.globalPaths.push(path.resolve(process.env.DISCORD_APP_PATH, "..", "app.asar", "node_modules"));

export * as FileManager from "./fileManager";
export * as HttpManager from "./http";
export * as ElectronModule from "./electron";

// We can expose that without any issues.
export const PathModule = __non_webpack_require__("path");
export const Buffer = __non_webpack_require__("buffer");