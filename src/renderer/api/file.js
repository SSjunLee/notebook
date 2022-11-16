import {ipcRenderer} from 'electron'


const ipc = ipcRenderer;

export const readDir = async (dirname) => {
    return ipc.invoke("readdir", dirname);
};

export const readFile = async (arg) => {
    const res = await ipc.invoke("readFile", arg, "utf8");
    return res.toString();
};


export const writeFile = async (arg, content) => {
    return await ipc.invoke("writeFile", arg, content);
};


export const open = async (filename, flag) => {
    return await ipc.invoke("open", filename, flag);
};

export const isDirectory = async (path) => {
    return await ipc.invoke("isDirectory", path);
};


export const dialog = async (cfg) => {
    return await ipc.invoke("dialog", cfg);
};
