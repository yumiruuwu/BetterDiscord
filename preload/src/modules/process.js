import NodeEvents from "events";

const originalProcess = process;

const cloneObject = function (target, newObject = {}, keys) {
    if (!Array.isArray(keys)) keys = Object.keys(Object.getOwnPropertyDescriptors(target));
    return keys.reduce((clone, key) => {
        if (typeof(target[key]) === "object" && !Array.isArray(target[key]) && target[key] !== null && !(target[key] instanceof NodeEvents)) clone[key] = cloneObject(target[key], {});
        else clone[key] = target[key];

        return clone;
    }, newObject);
};

process = new class process extends NodeEvents {
    // get __ORIGINAL_PROCESS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED__() {return originalProcess;}

    constructor() {
        super();

        Object.assign(this,
            cloneObject(originalProcess, {}, Object.keys(NodeEvents.prototype)),
            cloneObject(originalProcess, {})
        );
    }
};

export default process;