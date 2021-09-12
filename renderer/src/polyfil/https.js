import EventEmitter from "common/events";

export function get(url, options = {}, callback) {
    const emitter = new EventEmitter();
    callback(emitter);
    if (typeof (options) === "function") {
        callback = options;
        options = null;
    }

    BetterDiscord.HttpManager.get(url, options, (error, res, body) => {
        if (error) return emitter.emit("error", error);
        emitter.emit("data", body);
        emitter.emit("end", res);
    });

    return emitter;
}