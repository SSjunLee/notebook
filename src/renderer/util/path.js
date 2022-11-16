import path from "path";

export const pathResolve = (...args) => {
    return path.resolve(...args);
};

export const pathJoin = (...args) => {
    return path.join(...args);
};

export const getNameFromPath = (arg) => {
    return arg.substring(arg.lastIndexOf(path.sep) + 1);
};
