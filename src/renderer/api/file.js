import {ipcRenderer} from 'electron'
const ipc = ipcRenderer;

export const readDir = async (dirname) => {
    return ipc.invoke("readdir", dirname);
};

export const readFile = async (filename) => {
    const res = await ipc.invoke("readFile",filename,"utf8");
    console.log(res.toString());
    return res.toString();
};


