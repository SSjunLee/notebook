import {dialog} from "@/api/file";
import path from 'path'
import store from '@/store'
import {Github} from "@/core/github";

const fileCfg = {
    properties: ['openFile', 'promptToCreate'],
    filters: [
        {name: 'markdown', extensions: ['md']}
    ],
};

const DirCfg = {
    properties: ['openDirectory'],
};


const openFile = async () => {
    const {canceled, filePaths} = await dialog(fileCfg);
    if (canceled || filePaths.length === 0) return;
    const dirname = path.dirname(filePaths[0]);
    await store.commit("setWorkDir", dirname);
    await store.dispatch('openEditor', filePaths[0]);
};

const openWorkspace = async () => {
    const {canceled, filePaths} = await dialog(DirCfg);
    if (canceled || filePaths.length === 0) return;
    store.commit("setWorkDir", filePaths[0]);
};



const github = async ()=>{
    const l = new Github();
    await l.login(process.env.GITHUB);
    store.commit("setEnableConfigRemoteRepo",true);
};

const serviceMap = {
    "open-file": openFile,
    "open-workspace": openWorkspace,
    "github":github,
};

export default (name, ...args) => {
    serviceMap[name](...args).then(() => {
    });
}
