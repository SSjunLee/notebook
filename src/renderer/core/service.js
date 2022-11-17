import {dialog} from "@/api/file";
import path from 'path'
import store from '@/store'

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
    await store.commit("setWorkDir", filePaths[0]);
};

const serviceMap = {
    "open-file": openFile,
    "open-workspace": openWorkspace,
};


export default (name, ...args) => {
    serviceMap[name](...args).then(() => {
    });
}
