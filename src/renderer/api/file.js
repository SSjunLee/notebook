import {ipcRenderer} from 'electron'
import process from "process";
import store from '@/store'

const ipc = ipcRenderer;

export const readDir = async (dirname) => {
    return ipc.invoke("readdir", dirname);
};

export const mkdir = async (dirname) => {
    return ipc.invoke("mkdir", dirname);
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

export const exists = async (path) => {
    return await ipc.invoke("exists", path);
};


export const dialog = async (cfg) => {
    if (!cfg.hasOwnProperty('defaultPath')) {
        cfg.defaultPath = store.state.editor.workDir;
    }
    return await ipc.invoke("dialog", cfg);
};

export const saveDialog = async (cfg) => {
    if (!cfg.hasOwnProperty('defaultPath')) {
        cfg.defaultPath = store.state.editor.workDir;
    }
    if (!cfg.hasOwnProperty("filters")) {
        cfg.filters = [
            {name: 'markdown', extensions: ['md']}
        ];
    }
    return await ipc.invoke("saveDialog", cfg);
};

export const defaultWorkDir = () => {
    if(process.env.NODE_ENV === 'production')
        return process.cwd();
    else
        return process.env.TEST_PATH;
};
