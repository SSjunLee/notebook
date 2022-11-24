import {ipcRenderer} from 'electron'



const ipc = ipcRenderer;
const decoder = new TextDecoder();


export const apiSaveGit = async (path) => {
    await ipc.invoke("saveGit", path);
};

export const apiSyncGithub = async (path, url)=>{
    await ipc.invoke('syncGithub',path,url);
    console.log('成功....')
};
