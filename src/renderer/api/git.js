import {ipcRenderer} from 'electron'



const ipc = ipcRenderer;
const decoder = new TextDecoder();


export const saveGit = async (path) => {
    await ipc.invoke("saveGit", path);
};

export const syncGithub = async (path,url)=>{
    await ipc.invoke('syncGithub',path,url);
    console.log('成功....')
};
