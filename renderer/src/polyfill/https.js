import EventEmitter from "common/events";

export function get(url, options = {}, callback) {
    if (typeof (options) === "function") {
        callback = options;
        options = null;
    }

    const emitter = new EventEmitter();
    
    if (typeof (options) === "function") {
        callback = options;
        options = null;
    }

    callback(emitter);

    BetterDiscord.HttpManager.get(url, options, (error, res, body) => {
        if (error) return emitter.emit("error", error);
        emitter.emit("data", body);
        emitter.emit("end", res);
    });

    return emitter;
}

export default {get};