export const compileFunction = function (code, params = [], filename = "") {
    return eval(`(${params.join(", ")}) => {${code}//# sourceURL=${filename.replace(/\\/g, "\\")}}`);
};