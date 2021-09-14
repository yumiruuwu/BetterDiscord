let request;

const req = function (url, options, callback) {
    if (!request) request = __non_webpack_require__("request");
    console.log("request.req");
    return request(url, options, (error, res, body) => {
        try {
            console.log("req", {error, res, body});
            Reflect.apply(callback, null, [error, res, body]);
        } catch (err) {
            console.error(err);
        }
    });
};

export const get = function (url, options, callback) {
    if (!request) request = __non_webpack_require__("request");
    console.log("request.get", request);
    return request.get(url, options, (error, res, body) => {
        try {
            console.log({error, res, body});
            Reflect.apply(callback, null, [error, res, body]);
        } catch (err) {
            console.error(err);
        }
    });
};

export const put = function (url, options, callback) {
    if (!request) request = __non_webpack_require__("request");

    return request.put(url, options, (error, res, body) => {
        try {
            Reflect.apply(callback, null, [error, res, body]);
        } catch (err) {
            console.error(err);
        }
    });
};

export const post = function (url, options, callback) {
    if (!request) request = __non_webpack_require__("request");

    return request.post(url, options, (error, res, body) => {
        try {
            Reflect.apply(callback, null, [error, res, body]);
        } catch (err) {
            console.error(err);
        }
    });
};

const del = function (url, options, callback) {
    if (!request) request = __non_webpack_require__("request");

    return request.delete(url, options, (error, res, body) => {
        try {
            Reflect.apply(callback, null, [error, res, body]);
        } catch (err) {
            console.error(err);
        }
    });
};

export default req;
export {del as delete};
    
Object.assign(req, {
    get,
    put,
    post,
    delete: del
});