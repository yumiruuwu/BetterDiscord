import {ipcMain as IPC} from "electron";
import * as IPCEvents from "common/constants/ipcevents";
import * as https from "https";

IPC.handle(IPCEvents.REQUEST, (_, method, url, options = {}) => {
    console.log(typeof https.get);
    const makeRequest = {
        // TODO: Allow more methods
        get: https.get.bind(https),
    }[method.toLowerCase()];

    if (!makeRequest) throw new Error("Unknown HTTP method: " + method);

    return new Promise((resolve) => {
        makeRequest(url, options, (res) => {
            let body = "";
            let error = null;

            res.on("data", data => body += data);
            res.on("error", err => error = err);

            res.on("end", () => {
                resolve([error, {
                    headers: res.headers,
                    statusCode: res.statusCode,
                    ok: res.statusMessage === "OK",
                    body
                }, body]);
            });
        });
    });
});