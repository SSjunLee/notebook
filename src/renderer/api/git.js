import {ipcRenderer} from 'electron'



const ipc = ipcRenderer;
const decoder = new TextDecoder();


export const saveGit = async (path) => {
    const res = await ipc.invoke("saveGit", path);
    console.log("成功...",res);
};

export const syncGithub = async (path,url)=>{
    await ipc.invoke('syncGithub',path,url);
    console.log('成功....')
};
